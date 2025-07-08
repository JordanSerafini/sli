interface SecurityEvent {
  id: string;
  timestamp: number;
  type: 'rate_limit' | 'invalid_input' | 'spam_detected' | 'bot_detected' | 'suspicious_activity';
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  userAgent: string;
  endpoint?: string;
  data?: unknown;
  blocked: boolean;
}

interface AttackPattern {
  ip: string;
  events: SecurityEvent[];
  score: number;
  firstSeen: number;
  lastSeen: number;
  isBlocked: boolean;
}

// Store en mémoire pour le monitoring (en production, utiliser une base de données)
const securityEvents: SecurityEvent[] = [];
const attackPatterns: Map<string, AttackPattern> = new Map();

/**
 * Générer un ID unique pour l'événement
 */
function generateEventId(): string {
  return `evt_${Date.now()}_${Math.random().toString(36).substring(2)}`;
}

/**
 * Calculer le score de menace basé sur les événements
 */
function calculateThreatScore(events: SecurityEvent[]): number {
  let score = 0;
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  for (const event of events) {
    // Donner plus de poids aux événements récents
    const ageMultiplier = Math.max(0.1, 1 - (now - event.timestamp) / oneHour);
    
    switch (event.type) {
      case 'rate_limit':
        score += 2 * ageMultiplier;
        break;
      case 'spam_detected':
        score += 5 * ageMultiplier;
        break;
      case 'bot_detected':
        score += 3 * ageMultiplier;
        break;
      case 'invalid_input':
        score += 1 * ageMultiplier;
        break;
      case 'suspicious_activity':
        score += 4 * ageMultiplier;
        break;
    }

    // Bonus pour les événements critiques
    if (event.severity === 'critical') score *= 2;
    if (event.severity === 'high') score *= 1.5;
  }

  return Math.round(score * 100) / 100;
}

/**
 * Déterminer la sévérité d'un événement
 */
function determineSeverity(
  type: SecurityEvent['type']
): SecurityEvent['severity'] {
  switch (type) {
    case 'spam_detected':
      return 'high';
    case 'bot_detected':
      return 'medium';
    case 'rate_limit':
      return 'medium';
    case 'invalid_input':
      return 'low';
    case 'suspicious_activity':
      return 'high';
    default:
      return 'low';
  }
}

/**
 * Enregistrer un événement de sécurité
 */
export function logSecurityEvent(
  type: SecurityEvent['type'],
  details: {
    ip: string;
    userAgent?: string;
    endpoint?: string;
    data?: unknown;
    blocked?: boolean;
  }
): SecurityEvent {
  const event: SecurityEvent = {
    id: generateEventId(),
    timestamp: Date.now(),
    type,
    severity: determineSeverity(type),
    ip: details.ip,
    userAgent: details.userAgent || 'unknown',
    endpoint: details.endpoint,
    data: details.data,
    blocked: details.blocked || false,
  };

  // Ajouter l'événement à la liste
  securityEvents.push(event);

  // Limiter le nombre d'événements en mémoire (garder les 1000 derniers)
  if (securityEvents.length > 1000) {
    securityEvents.splice(0, securityEvents.length - 1000);
  }

  // Mettre à jour ou créer le pattern d'attaque pour cette IP
  updateAttackPattern(event);

  // Log dans la console (en production, envoyer vers un service de logging)
  const logLevel = event.severity === 'critical' || event.severity === 'high' ? 'error' : 'warn';
  console[logLevel]('[SECURITY]', {
    id: event.id,
    type: event.type,
    severity: event.severity,
    ip: event.ip,
    endpoint: event.endpoint,
    userAgent: event.userAgent,
    data: event.data,
    timestamp: new Date(event.timestamp).toISOString(),
  });

  // Vérifier si des alertes doivent être déclenchées
  checkForAlerts(event);

  return event;
}

/**
 * Mettre à jour le pattern d'attaque pour une IP
 */
function updateAttackPattern(event: SecurityEvent): void {
  const existing = attackPatterns.get(event.ip);
  const now = Date.now();

  if (existing) {
    existing.events.push(event);
    existing.lastSeen = now;
    existing.score = calculateThreatScore(existing.events);
    
    // Nettoyer les anciens événements (garder seulement les 24 dernières heures)
    const twentyFourHours = 24 * 60 * 60 * 1000;
    existing.events = existing.events.filter(
      e => now - e.timestamp < twentyFourHours
    );
  } else {
    attackPatterns.set(event.ip, {
      ip: event.ip,
      events: [event],
      score: calculateThreatScore([event]),
      firstSeen: now,
      lastSeen: now,
      isBlocked: false,
    });
  }
}

/**
 * Vérifier s'il faut déclencher des alertes
 */
function checkForAlerts(event: SecurityEvent): void {
  const pattern = attackPatterns.get(event.ip);
  if (!pattern) return;

  // Seuil d'alerte basé sur le score
  const alertThreshold = 10;
  const criticalThreshold = 20;

  if (pattern.score >= criticalThreshold && !pattern.isBlocked) {
    pattern.isBlocked = true;
    console.error(`[SECURITY ALERT] IP ${event.ip} blocked - Critical threat score: ${pattern.score}`);
    
    // En production, envoyer une notification par email/Slack/etc.
    sendSecurityAlert('critical', event, pattern);
  } else if (pattern.score >= alertThreshold) {
    console.warn(`[SECURITY ALERT] IP ${event.ip} suspicious - Threat score: ${pattern.score}`);
    
    sendSecurityAlert('warning', event, pattern);
  }
}

/**
 * Envoyer une alerte de sécurité
 */
function sendSecurityAlert(
  level: 'warning' | 'critical',
  event: SecurityEvent,
  pattern: AttackPattern
): void {
  const alertData = {
    level,
    timestamp: new Date().toISOString(),
    ip: event.ip,
    threatScore: pattern.score,
    eventCount: pattern.events.length,
    timeWindow: `${Math.round((pattern.lastSeen - pattern.firstSeen) / 60000)} minutes`,
    lastEvent: {
      type: event.type,
      severity: event.severity,
      endpoint: event.endpoint,
    },
    recentEvents: pattern.events.slice(-5).map(e => ({
      type: e.type,
      severity: e.severity,
      timestamp: new Date(e.timestamp).toISOString(),
    })),
  };

  // En production, intégrer avec votre système d'alertes
  console.warn(`[SECURITY ALERT ${level.toUpperCase()}]`, JSON.stringify(alertData, null, 2));
}

/**
 * Obtenir le statut de sécurité d'une IP
 */
export function getIPSecurityStatus(ip: string): {
  isBlocked: boolean;
  threatScore: number;
  eventCount: number;
  lastActivity?: number;
} {
  const pattern = attackPatterns.get(ip);
  
  if (!pattern) {
    return {
      isBlocked: false,
      threatScore: 0,
      eventCount: 0,
    };
  }

  return {
    isBlocked: pattern.isBlocked,
    threatScore: pattern.score,
    eventCount: pattern.events.length,
    lastActivity: pattern.lastSeen,
  };
}

/**
 * Obtenir les statistiques de sécurité générales
 */
export function getSecurityStats(): {
  totalEvents: number;
  eventsByType: Record<string, number>;
  topThreats: Array<{ ip: string; score: number; events: number }>;
  recentAlerts: SecurityEvent[];
} {
  const eventsByType: Record<string, number> = {};
  const recentAlerts: SecurityEvent[] = [];
  const now = Date.now();
  const oneHour = 60 * 60 * 1000;

  // Compter les événements par type et identifier les alertes récentes
  for (const event of securityEvents) {
    eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    
    if (now - event.timestamp < oneHour && 
        (event.severity === 'high' || event.severity === 'critical')) {
      recentAlerts.push(event);
    }
  }

  // Obtenir les top menaces
  const topThreats = Array.from(attackPatterns.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map(pattern => ({
      ip: pattern.ip,
      score: pattern.score,
      events: pattern.events.length,
    }));

  return {
    totalEvents: securityEvents.length,
    eventsByType,
    topThreats,
    recentAlerts: recentAlerts.slice(-20), // 20 alertes les plus récentes
  };
}

/**
 * Nettoyer les anciens événements et patterns
 */
export function cleanupOldData(): void {
  const now = Date.now();
  const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours

  // Nettoyer les anciens événements
  const cutoff = now - maxAge;
  const initialLength = securityEvents.length;
  securityEvents.splice(0, securityEvents.findIndex(e => e.timestamp > cutoff));
  
  // Nettoyer les anciens patterns
  for (const [ip, pattern] of attackPatterns.entries()) {
    if (pattern.lastSeen < cutoff) {
      attackPatterns.delete(ip);
    }
  }

  console.log(`[SECURITY] Cleaned up ${initialLength - securityEvents.length} old events`);
}

// Nettoyer automatiquement les anciennes données toutes les heures
setInterval(cleanupOldData, 60 * 60 * 1000); 
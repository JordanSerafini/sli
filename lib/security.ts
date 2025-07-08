interface RateLimitStore {
  [key: string]: {
    count: number;
    lastReset: number;
  };
}

// Store en mémoire pour le rate limiting (en production, utiliser Redis)
const rateLimitStore: RateLimitStore = {};

interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
  blockDurationMs?: number;
}

interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetTime: number;
  isBlocked?: boolean;
}

/**
 * Système de rate limiting par IP
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = {
    maxRequests: 5, // 5 requêtes max
    windowMs: 15 * 60 * 1000, // par tranche de 15 minutes
    blockDurationMs: 60 * 60 * 1000, // blocage 1h si dépassé
  }
): RateLimitResult {
  const now = Date.now();
  const key = `ratelimit:${identifier}`;
  
  // Récupérer ou initialiser les données pour cette IP
  if (!rateLimitStore[key]) {
    rateLimitStore[key] = {
      count: 0,
      lastReset: now,
    };
  }

  const data = rateLimitStore[key];
  
  // Vérifier si la fenêtre de temps est expirée
  if (now - data.lastReset > config.windowMs) {
    data.count = 0;
    data.lastReset = now;
  }

  // Vérifier si l'IP est bloquée
  if (data.count >= config.maxRequests && config.blockDurationMs) {
    const blockEndTime = data.lastReset + config.blockDurationMs;
    if (now < blockEndTime) {
      return {
        success: false,
        remaining: 0,
        resetTime: blockEndTime,
        isBlocked: true,
      };
    } else {
      // Le blocage est expiré, réinitialiser
      data.count = 0;
      data.lastReset = now;
    }
  }

  // Incrémenter le compteur
  data.count++;

  const remaining = Math.max(0, config.maxRequests - data.count);
  const resetTime = data.lastReset + config.windowMs;

  return {
    success: data.count <= config.maxRequests,
    remaining,
    resetTime,
    isBlocked: false,
  };
}

/**
 * Extraction de l'IP depuis la requête
 */
export function getClientIP(request: Request): string {
  // Récupérer l'IP depuis les headers de proxy (Cloudflare, nginx, etc.)
  const headers = request.headers;
  
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIP = headers.get('x-real-ip');
  if (realIP) {
    return realIP.trim();
  }
  
  const cfConnectingIP = headers.get('cf-connecting-ip');
  if (cfConnectingIP) {
    return cfConnectingIP.trim();
  }
  
  // Fallback pour le développement local
  return 'unknown';
}

/**
 * Validation et sanitisation des inputs
 */
export interface SanitizedContactData {
  name: string;
  email: string;
  message: string;
  phone?: string;
}

export function sanitizeAndValidateContactData(data: unknown): {
  isValid: boolean;
  errors: string[];
  sanitizedData?: SanitizedContactData;
} {
  const errors: string[] = [];
  
  // Vérification de la structure de base
  if (typeof data !== 'object' || data === null) {
    return { isValid: false, errors: ['Données invalides'] };
  }

  const typedData = data as Record<string, unknown>;
  const { name, email, message, phone } = typedData;

  // Validation et sanitisation du nom
  let sanitizedName = '';
  if (typeof name === 'string') {
    sanitizedName = name.trim()
      .replace(/[<>]/g, '') // Supprimer les balises HTML de base
      .substring(0, 100); // Limiter la longueur
  }
  
  if (!sanitizedName || sanitizedName.length < 2) {
    errors.push('Le nom doit contenir au moins 2 caractères');
  }

  // Validation de l'email
  let sanitizedEmail = '';
  if (typeof email === 'string') {
    sanitizedEmail = email.trim().toLowerCase().substring(0, 254);
  }
  
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(sanitizedEmail)) {
    errors.push('Adresse email invalide');
  }

  // Validation et sanitisation du message
  let sanitizedMessage = '';
  if (typeof message === 'string') {
    sanitizedMessage = message.trim()
      .replace(/[<>]/g, '') // Supprimer les balises HTML de base
      .substring(0, 2000); // Limiter la longueur
  }
  
  if (!sanitizedMessage || sanitizedMessage.length < 10) {
    errors.push('Le message doit contenir au moins 10 caractères');
  }

  // Validation du téléphone (optionnel)
  let sanitizedPhone: string | undefined;
  if (phone && typeof phone === 'string') {
    sanitizedPhone = phone.trim()
      .replace(/[^\d\s\+\-\.\(\)]/g, '') // Garder seulement les caractères valides
      .substring(0, 20);
    
    // Validation basique du format
    const phoneRegex = /^[\+]?[\d\s\-\.\(\)]{8,20}$/;
    if (sanitizedPhone && !phoneRegex.test(sanitizedPhone)) {
      errors.push('Format de téléphone invalide');
    }
  }

  // Vérifications anti-spam
  const suspiciousPatterns = [
    /https?:\/\//i, // URLs
    /\b(viagra|casino|loan|money|investment|crypto|bitcoin)\b/i, // Mots-clés spam
    /(.)\1{4,}/i, // Répétition de caractères
  ];

  const fullText = `${sanitizedName} ${sanitizedMessage}`.toLowerCase();
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(fullText)) {
      errors.push('Contenu suspect détecté');
      break;
    }
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  return {
    isValid: true,
    errors: [],
    sanitizedData: {
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
      phone: sanitizedPhone,
    },
  };
}

/**
 * Validation du numéro de téléphone pour l'API callback
 */
export function sanitizeAndValidatePhone(phone: unknown): {
  isValid: boolean;
  error?: string;
  sanitizedPhone?: string;
} {
  if (!phone || typeof phone !== 'string') {
    return { isValid: false, error: 'Numéro de téléphone requis' };
  }

  const sanitizedPhone = phone.trim()
    .replace(/[^\d\s\+\-\.\(\)]/g, '')
    .substring(0, 20);

  if (sanitizedPhone.length < 8) {
    return { isValid: false, error: 'Numéro de téléphone trop court' };
  }

  const phoneRegex = /^[\+]?[\d\s\-\.\(\)]{8,20}$/;
  if (!phoneRegex.test(sanitizedPhone)) {
    return { isValid: false, error: 'Format de téléphone invalide' };
  }

  return { isValid: true, sanitizedPhone };
}

// Import du système de monitoring avancé
export { logSecurityEvent, getIPSecurityStatus } from './monitoring'; 
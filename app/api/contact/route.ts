

import { Resend } from 'resend';
import { ContactEmailTemplate } from '../../../components/email-template';
import { 
  checkRateLimit, 
  getClientIP, 
  sanitizeAndValidateContactData, 
  logSecurityEvent 
} from '../../../lib/security';

// Configuration CORS pour permettre les appels depuis d'autres domaines
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export async function OPTIONS() {
  return new Response(null, { 
    status: 200, 
    headers: corsHeaders 
  });
}

// Fonction helper pour ajouter les headers CORS à toutes les réponses
function createCORSResponse(data: Record<string, unknown>, status: number = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      ...corsHeaders,
    },
  });
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const clientIP = getClientIP(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';

  try {
    // 🛡️ ÉTAPE 1: Vérification du rate limiting
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 3, // 3 messages max
      windowMs: 15 * 60 * 1000, // par tranche de 15 minutes
      blockDurationMs: 60 * 60 * 1000, // blocage 1h si dépassé
    });

    if (!rateLimitResult.success) {
      logSecurityEvent('rate_limit', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/contact',
        data: { remaining: rateLimitResult.remaining, isBlocked: rateLimitResult.isBlocked },
      });

      if (rateLimitResult.isBlocked) {
        return createCORSResponse(
          { 
            message: 'Trop de tentatives. Votre IP est temporairement bloquée.',
            resetTime: rateLimitResult.resetTime 
          },
          429
        );
      } else {
        return createCORSResponse(
          { 
            message: `Limite atteinte. Attendez avant de renvoyer un message. (${rateLimitResult.remaining} restantes)`,
            resetTime: rateLimitResult.resetTime 
          },
          429
        );
      }
    }

    // 🛡️ ÉTAPE 2: Parsing et validation sécurisée des données
    const body = await req.json();
    
    // 🛡️ ÉTAPE 2.1: Vérification honeypot côté serveur
    if (body.website && body.website.trim().length > 0) {
      logSecurityEvent('spam_detected', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/contact',
        data: { honeypot: body.website, type: 'honeypot_filled' },
      });

      return createCORSResponse(
        { message: 'Erreur de validation du formulaire.' },
        400
      );
    }
    
    const validation = sanitizeAndValidateContactData(body);
    
    if (!validation.isValid) {
      logSecurityEvent('invalid_input', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/contact',
        data: { errors: validation.errors, originalData: body },
      });

      return createCORSResponse(
        { message: `Données invalides: ${validation.errors.join(', ')}` },
        400
      );
    }

    const { name, email, message, phone } = validation.sanitizedData!;

    if (!process.env.RESEND_API_KEY) {
      console.error('Clé API Resend non configurée');
      return createCORSResponse(
        { message: 'Service de messagerie non configuré. Veuillez contacter l\'administrateur.' },
        500
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Solution Logique <site@solution-logique.fr>',
      to: ['site@solution-logique.fr'],
      subject: `Nouveau message de contact - ${name}`,
      react: ContactEmailTemplate({ 
        name, 
        email, 
        phone, 
        message 
      }),
      replyTo: email,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return createCORSResponse(
        { message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
        500
      );
    }

    console.log('Email envoyé avec succès:', data);

    return createCORSResponse(
      { message: 'Message envoyé avec succès !' },
      200
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return createCORSResponse(
      { message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      500
    );
  }
} 
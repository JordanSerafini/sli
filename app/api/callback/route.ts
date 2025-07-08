import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';
import { 
  checkRateLimit, 
  getClientIP, 
  sanitizeAndValidatePhone, 
  logSecurityEvent 
} from '../../../lib/security';




// Configuration Resend
const resend = new Resend(process.env.RESEND_API_KEY);

function CallbackEmailTemplate({ phone }: { phone: string }): React.ReactElement {
  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' } },
    React.createElement(
      'div',
      { style: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' } },
      React.createElement(
        'h2',
        { style: { color: '#333', margin: '0 0 20px 0' } },
        '🔔 Demande de rappel depuis le site web'
      )
    ),
    React.createElement(
      'div',
      { style: { backgroundColor: '#ffffff', padding: '20px', border: '1px solid #e9ecef', borderRadius: '8px' } },
      React.createElement(
        'p',
        { style: { marginBottom: '15px', color: '#212529' } },
        'Un client demande à être rappelé au numéro suivant :'
      ),
      React.createElement(
        'div',
        { 
          style: { 
            padding: '15px', 
            backgroundColor: '#e3f2fd', 
            borderRadius: '4px',
            borderLeft: '4px solid #2196f3',
            marginBottom: '20px'
          }
        },
        React.createElement(
          'strong',
          { style: { fontSize: '18px', color: '#1565c0' } },
          `📱 ${phone}`
        )
      ),
      React.createElement(
        'p',
        { 
          style: { 
            color: '#6c757d', 
            fontSize: '14px', 
            fontStyle: 'italic',
            marginBottom: '0'
          }
        },
        `Demande reçue le ${new Date().toLocaleString('fr-FR')}`
      )
    )
  );
}

export async function POST(req: Request) {
  const clientIP = getClientIP(req);
  const userAgent = req.headers.get('user-agent') || 'unknown';

  if (!process.env.RESEND_API_KEY) {
    console.error('Clé API Resend non configurée');
    return NextResponse.json(
      { message: 'Configuration du serveur de messagerie manquante.' },
      { status: 500 }
    );
  }

  try {
    // 🛡️ ÉTAPE 1: Vérification du rate limiting
    const rateLimitResult = checkRateLimit(clientIP, {
      maxRequests: 5, // 5 demandes de rappel max
      windowMs: 15 * 60 * 1000, // par tranche de 15 minutes
      blockDurationMs: 30 * 60 * 1000, // blocage 30min si dépassé
    });

    if (!rateLimitResult.success) {
      logSecurityEvent('rate_limit', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/callback',
        data: { remaining: rateLimitResult.remaining, isBlocked: rateLimitResult.isBlocked },
      });

      return NextResponse.json(
        { message: rateLimitResult.isBlocked 
          ? 'Trop de demandes de rappel. Votre IP est temporairement bloquée.' 
          : `Limite atteinte. Attendez avant de demander un nouveau rappel. (${rateLimitResult.remaining} restantes)` 
        },
        { status: 429 }
      );
    }

    // 🛡️ ÉTAPE 2: Validation sécurisée du numéro
    const body = await req.json();
    const { phone } = body;
    
    // 🛡️ ÉTAPE 2.1: Vérification honeypot côté serveur
    if (body.company && body.company.trim().length > 0) {
      logSecurityEvent('spam_detected', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/callback',
        data: { honeypot: body.company, type: 'honeypot_filled' },
      });

      return NextResponse.json(
        { message: 'Erreur de validation du formulaire.' },
        { status: 400 }
      );
    }
    
    const phoneValidation = sanitizeAndValidatePhone(phone);
    
    if (!phoneValidation.isValid) {
      logSecurityEvent('invalid_input', {
        ip: clientIP,
        userAgent,
        endpoint: '/api/callback',
        data: { error: phoneValidation.error, originalPhone: phone },
      });

      return NextResponse.json(
        { message: phoneValidation.error || 'Numéro de téléphone invalide.' },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Solution Logique <site@solution-logique.fr>',
      to: ['site@solution-logique.fr'],
      subject: 'Demande de rappel depuis le site web',
      react: CallbackEmailTemplate({ phone: phoneValidation.sanitizedPhone! }),
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { message: 'Erreur lors de l\'envoi de la demande.' },
        { status: 500 }
      );
    }

    console.log('Email de rappel envoyé avec succès:', data);

    return NextResponse.json(
      { message: 'Demande de rappel envoyée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de rappel :", error);
    
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de la demande.' },
      { status: 500 }
    );
  }
} 

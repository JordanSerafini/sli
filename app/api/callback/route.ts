import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

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
  // Vérification que la clé API Resend est configurée
  if (!process.env.RESEND_API_KEY) {
    console.error('Clé API Resend non configurée');
    return NextResponse.json(
      { message: 'Configuration du serveur de messagerie manquante.' },
      { status: 500 }
    );
  }
    
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json(
      { message: 'Le numéro de téléphone est obligatoire.' },
      { status: 400 }
    );
  }

  try {
    // Envoi de l'email via Resend
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['jordanserafini.74@gmail.com'],
      subject: 'Demande de rappel depuis le site web',
      react: CallbackEmailTemplate({ phone }),
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
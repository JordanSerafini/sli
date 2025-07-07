import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import * as React from 'react';

const resend = new Resend(process.env.RESEND_API_KEY);

// Template de test pour l'email de rappel
function TestCallbackEmailTemplate({ phone }: { phone: string }): React.ReactElement {
  return React.createElement(
    'div',
    { style: { fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto', padding: '20px' } },
    React.createElement(
      'div',
      { style: { backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' } },
      React.createElement(
        'h2',
        { style: { color: '#333', margin: '0 0 20px 0' } },
        '🔔 TEST - Demande de rappel depuis le site web'
      )
    ),
    React.createElement(
      'div',
      { style: { backgroundColor: '#ffffff', padding: '20px', border: '1px solid #e9ecef', borderRadius: '8px' } },
      React.createElement(
        'p',
        { style: { marginBottom: '15px', color: '#212529' } },
        'Ceci est un test de demande de rappel. Numéro de téléphone :'
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
        `Test envoyé le ${new Date().toLocaleString('fr-FR')}`
      )
    )
  );
}

export async function GET() {
  try {
    // Vérification que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY non configurée dans les variables d\'environnement' },
        { status: 500 }
      );
    }

    // Test d'envoi d'email de rappel
    const { data, error } = await resend.emails.send({
      from: 'Solution Logique <site@solution-logique.fr>',
      to: ['site@solution-logique.fr'],
      subject: 'TEST - Demande de rappel depuis le site web',
      react: TestCallbackEmailTemplate({ 
        phone: '01 23 45 67 89'
      })
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { error: 'Erreur lors de l\'envoi:', details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Email de test pour la fonction callback envoyé avec succès !',
      data: data
    });

  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { error: 'Erreur inattendue', details: error },
      { status: 500 }
    );
  }
} 
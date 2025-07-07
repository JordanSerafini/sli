import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';

// Configuration Mailjet
const mailjetClient = mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC || '',
  process.env.MJ_APIKEY_PRIVATE || ''
);

export async function POST(req: Request) {
  // Vérification que les clés API sont configurées
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    console.error('Clés API Mailjet non configurées');
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
    // Envoi de l'email via Mailjet
    const request = mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'jordanserafini74370@gmail.com',
              Name: 'Site Web Solution Logique'
            },
            To: [
              {
                Email: 'jordan@solution-logique.fr',
                Name: 'Jordan'
              }
            ],
            Subject: 'Demande de rappel depuis le site web',
            TextPart: `Un client demande à être rappelé au numéro suivant : ${phone}`,
            HTMLPart: `
              <h2>🔔 Demande de rappel</h2>
              <p>Un client demande à être rappelé au numéro suivant :</p>
              <p><strong>📱 ${phone}</strong></p>
              <p><em>Demande reçue le ${new Date().toLocaleString('fr-FR')}</em></p>
            `
          }
        ]
      });

    await request;

    return NextResponse.json(
      { message: 'Demande de rappel envoyée avec succès' },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de rappel :", error);
    
    // Gestion des erreurs Mailjet
    if (error && typeof error === 'object' && 'response' in error) {
      const mjError = error as { response?: { status?: number; data?: unknown } };
      console.error('Erreur Mailjet:', mjError.response?.data);
      
      if (mjError.response?.status === 401) {
        return NextResponse.json(
          { message: 'Erreur d\'authentification du service de messagerie.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi de la demande.' },
      { status: 500 }
    );
  }
} 
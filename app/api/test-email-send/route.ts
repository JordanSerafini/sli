import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';

export async function POST() {
  try {
    console.log('🔍 Test envoi email Mailjet...');
    
    if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
      console.log('❌ Clés API manquantes');
      return NextResponse.json({ error: 'Clés API manquantes' }, { status: 500 });
    }

    console.log('✅ Clés API présentes');
    console.log('📧 Initialisation client Mailjet...');

    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    console.log('📤 Préparation du message...');

    const emailData = {
      Messages: [
        {
          From: {
            Email: 'jordanserafini74370@gmail.com',
            Name: 'Test Site Web'
          },
          To: [
            {
              Email: 'jordanserafini74370@gmail.com',
              Name: 'Jordan Test'
            }
          ],
          Subject: 'Test Mailjet depuis Next.js',
          TextPart: 'Ceci est un test d\'envoi depuis l\'API Next.js',
          HTMLPart: '<h2>Test réussi !</h2><p>L\'envoi d\'email via Mailjet fonctionne.</p>'
        }
      ]
    };

    console.log('🚀 Envoi en cours...');
    console.log('Data:', JSON.stringify(emailData, null, 2));

    const response = await mailjetClient
      .post('send', { version: 'v3.1' })
      .request(emailData);

    console.log('✅ Réponse Mailjet:', response.body);

    return NextResponse.json({
      success: true,
      message: 'Email de test envoyé avec succès !',
      mailjetResponse: response.body
    });

  } catch (error) {
    console.error('❌ Erreur détaillée:', error);
    
    if (error && typeof error === 'object' && 'response' in error) {
      const mjError = error as { response?: { status?: number; data?: unknown; text?: string } };
      console.error('📋 Détails erreur Mailjet:');
      console.error('Status:', mjError.response?.status);
      console.error('Data:', mjError.response?.data);
      console.error('Text:', mjError.response?.text);
      
      return NextResponse.json({
        success: false,
        error: 'Erreur Mailjet',
        details: {
          status: mjError.response?.status,
          data: mjError.response?.data,
          text: mjError.response?.text
        }
      }, { status: 500 });
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Erreur inconnue'
    }, { status: 500 });
  }
} 
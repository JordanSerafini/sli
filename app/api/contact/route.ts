import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configuration SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    // Validation des données
    if (!name || !email || !message) {
      return NextResponse.json(
        { message: 'Nom, email et message sont requis.' },
        { status: 400 }
      );
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    // Construction du message email
    const emailContent = `
      Nouveau message de contact depuis le site web:
      
      Nom: ${name}
      Email: ${email}
      ${phone ? `Téléphone: ${phone}` : ''}
      
      Message:
      ${message}
      
      ---
      Envoyé depuis le formulaire de contact du site Solution Logique
    `;

    const msg = {
      to: 'accueil@solution-logique.com', // Email de destination
      from: 'noreply@solution-logique.com', // Email expéditeur (doit être vérifié dans SendGrid)
      subject: `Nouveau message de contact - ${name}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
      replyTo: email, // Permet de répondre directement au client
    };

    // Vérification que la clé API est configurée
    if (!process.env.SENDGRID_API_KEY) {
      console.error('SENDGRID_API_KEY non configurée');
      return NextResponse.json(
        { message: 'Service de messagerie non configuré. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    // Envoi de l'email
    await sgMail.send(msg);

    return NextResponse.json(
      { message: 'Message envoyé avec succès !' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    // Gestion des erreurs SendGrid
    if (error && typeof error === 'object' && 'response' in error) {
      const sgError = error as any;
      console.error('Erreur SendGrid:', sgError.response?.body);
      
      if (sgError.code === 401) {
        return NextResponse.json(
          { message: 'Erreur d\'authentification du service de messagerie.' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
} 
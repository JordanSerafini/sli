import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
} else {
    console.warn('SENDGRID_API_KEY is not set. Email functionality will not work.');
}

export async function POST(req: Request) {
  if (!process.env.SENDGRID_API_KEY) {
    return NextResponse.json({ message: 'Configuration du serveur de messagerie manquante.' }, { status: 500 });
  }
    
  const { phone } = await req.json();

  if (!phone) {
    return NextResponse.json({ message: 'Le numéro de téléphone est obligatoire.' }, { status: 400 });
  }

  const msg = {
    to: 'jordan@solution-logique.fr',
    from: 'site@solution-logique.fr',
    subject: `Demande de rappel`,
    text: `Un client demande à être rappelé au numéro suivant : ${phone}`,
    html: `<p>Un client demande à être rappelé au numéro suivant : <strong>${phone}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    return NextResponse.json({ message: 'Demande de rappel envoyée avec succès' }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'e-mail de rappel :", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de la demande.', error: errorMessage }, { status: 500 });
  }
} 
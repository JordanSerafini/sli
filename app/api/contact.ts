import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

// Configurer la clé d'API
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('La clé SENDGRID_API_KEY est manquante dans le fichier .env');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {

  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    console.log("Champs manquants :", { name, email, message });
    return NextResponse.json({ message: 'Tous les champs sont obligatoires.' }, { status: 400 });
  }

  const msg = {
    to: 'jordan@solution-logique.fr',
    from: 'site@solution-logique.fr',
    subject: `Nouveau message de ${name}`,
    text: `Message : ${message}\nDe : ${name} (${email})`,
    html: `<p><strong>Message :</strong> ${message}</p><p><strong>De :</strong> ${name} (${email})</p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("E-mail envoyé !");
    return NextResponse.json({ message: 'E-mail envoyé avec succès' }, { status: 200 });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Erreur lors de l\'envoi de l\'e-mail.', error: errorMessage }, { status: 500 });
  }
}

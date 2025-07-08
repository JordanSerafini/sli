
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '../../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, message, phone } = body;

    // Trimmer les champs pour éviter les espaces vides
    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return NextResponse.json(
        { message: 'Nom, email et message sont requis.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return NextResponse.json(
        { message: 'Adresse email invalide.' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      console.error('Clé API Resend non configurée');
      return NextResponse.json(
        { message: 'Service de messagerie non configuré. Veuillez contacter l\'administrateur.' },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: 'Solution Logique <site@solution-logique.fr>',
      to: ['site@solution-logique.fr'],
      subject: `Nouveau message de contact - ${trimmedName}`,
      react: ContactEmailTemplate({ 
        name: trimmedName, 
        email: trimmedEmail, 
        phone, 
        message: trimmedMessage 
      }),
      replyTo: trimmedEmail,
    });

    if (error) {
      console.error('Erreur Resend:', error);
      return NextResponse.json(
        { message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
        { status: 500 }
      );
    }

    console.log('Email envoyé avec succès:', data);

    return NextResponse.json(
      { message: 'Message envoyé avec succès !' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    
    return NextResponse.json(
      { message: 'Erreur lors de l\'envoi du message. Veuillez réessayer plus tard.' },
      { status: 500 }
    );
  }
} 
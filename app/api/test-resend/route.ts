import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { ContactEmailTemplate } from '../../../components/email-template';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
  try {
    // Vérification que la clé API est configurée
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY non configurée dans les variables d\'environnement' },
        { status: 500 }
      );
    }

    // Test d'envoi d'email
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: ['jordan@solution-logique.fr'],
      subject: 'Test Resend - Configuration réussie',
      react: ContactEmailTemplate({
        name: 'Test Utilisateur',
        email: 'test@example.com',
        phone: '01 23 45 67 89',
        message: 'Ceci est un message de test pour vérifier que Resend fonctionne correctement avec votre application Next.js.'
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
      message: 'Email de test envoyé avec succès !',
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
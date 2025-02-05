import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

// Configurer la clé d'API
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('La clé SENDGRID_API_KEY est manquante dans le fichier .env');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    console.log("Méthode non autorisée");
    return res.status(405).json({ message: 'Méthode non autorisée' });
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log("Champs manquants :", { name, email, message });
    return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
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
    return res.status(200).json({ message: 'E-mail envoyé avec succès' });
  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);
    return res.status(500).json({ message: 'Erreur lors de l\'envoi de l\'e-mail.' });
  }
}

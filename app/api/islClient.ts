import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Le code est requis.' }, { status: 400 });
  }

  try {
    // Remplace l'URL par celle fournie par ISL pour générer le fichier
    const islUrl = `https://www.islonline.com/fr/fr/join/#${code}`;

    // Télécharge le fichier depuis l'API ISL
    const response = await axios.get(islUrl, { responseType: "stream" });

    // Crée une réponse en streaming directement depuis la source
    return new NextResponse(response.data, {
      headers: {
        "Content-Disposition": `attachment; filename="isl-client-${code}.exe"`,
        "Content-Type": "application/octet-stream",
      },
    });

  } catch (error) {
    console.error("Erreur avec l'API ISL :");
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: "Impossible de récupérer le fichier.", details: errorMessage }, { status: 500 });
  }
}

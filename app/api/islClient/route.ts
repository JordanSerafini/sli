import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Le code est requis.' }, { status: 400 });
  }

  try {
    const islClientUrl = 'https://www.islonline.com/start/isllight/client.exe';

    const response = await fetch(islClientUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();

    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Disposition": `attachment; filename="isl-light-client-${code}.exe"`,
        "Content-Type": "application/octet-stream",
        "Content-Length": arrayBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error("Erreur avec le téléchargement ISL :");
    console.error(error);
    
    const islJoinUrl = `https://www.islonline.com/fr/fr/join/#${code}`;
    return NextResponse.redirect(islJoinUrl);
  }
} 
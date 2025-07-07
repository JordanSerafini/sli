import { NextResponse } from 'next/server';
import mailjet from 'node-mailjet';

export async function GET() {
  const diagnostics = {
    hasPublicKey: !!process.env.MJ_APIKEY_PUBLIC,
    hasPrivateKey: !!process.env.MJ_APIKEY_PRIVATE,
    publicKeyPrefix: process.env.MJ_APIKEY_PUBLIC ? process.env.MJ_APIKEY_PUBLIC.substring(0, 8) + '...' : 'Non définie',
    privateKeyPrefix: process.env.MJ_APIKEY_PRIVATE ? process.env.MJ_APIKEY_PRIVATE.substring(0, 8) + '...' : 'Non définie',
    nodeEnv: process.env.NODE_ENV,
  };

  // Si pas de clés API
  if (!process.env.MJ_APIKEY_PUBLIC || !process.env.MJ_APIKEY_PRIVATE) {
    return NextResponse.json({
      success: false,
      error: 'Clés API Mailjet non configurées',
      diagnostics,
      instructions: 'Ajoutez MJ_APIKEY_PUBLIC et MJ_APIKEY_PRIVATE dans votre fichier .env.local'
    }, { status: 500 });
  }

  try {
    const mailjetClient = mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );
    
    // Test 1: Vérification du profil utilisateur
    let userInfo = {};
    try {
      const userResponse = await mailjetClient.get('user').request();
      const userData = userResponse.body as any;
      userInfo = {
        email: userData?.Data?.[0]?.Email || 'N/A',
        username: userData?.Data?.[0]?.Username || 'N/A'
      };
    } catch (userError) {
      userInfo = { error: 'Impossible de récupérer les infos utilisateur' };
    }

    // Test 2: Vérification des statistiques récentes
    let stats = {};
    try {
      const statsResponse = await mailjetClient.get('statcounters').request();
      stats = { success: true, message: 'Statistiques accessibles' };
    } catch (statsError) {
      stats = { error: 'Impossible d\'accéder aux statistiques' };
    }

    // Test 3: Test d'envoi d'email simple
    let sendTest = {};
    try {
      const sendResponse = await mailjetClient
        .post('send', { version: 'v3.1' })
        .request({
          Messages: [
            {
              From: {
                Email: 'site@solution-logique.fr',
                Name: 'Test Diagnostic'
              },
              To: [
                {
                  Email: 'jordan@solution-logique.fr',
                  Name: 'Test'
                }
              ],
              Subject: 'Test diagnostic Mailjet - Ne pas répondre',
              TextPart: 'Ceci est un test automatique pour vérifier la configuration Mailjet.',
              HTMLPart: '<p>Ceci est un test automatique pour vérifier la configuration Mailjet.</p>'
            }
          ]
        });
      
      sendTest = { 
        success: true, 
        message: 'Test d\'envoi réussi ✅',
        messageId: (sendResponse.body as any)?.Messages?.[0]?.To?.[0]?.MessageID || 'ID non disponible'
      };
    } catch (sendError: any) {
      sendTest = { 
        success: false,
        error: sendError.message || 'Erreur inconnue',
        statusCode: sendError.statusCode || 'N/A',
        errorCode: sendError.ErrorCode || 'N/A',
        errorIdentifier: sendError.ErrorIdentifier || 'N/A'
      };
    }
    
    return NextResponse.json({
      success: userInfo && !('error' in userInfo),
      message: 'Diagnostic complet Mailjet',
      diagnostics,
      tests: {
        userConnection: userInfo,
        statisticsAccess: stats,
        emailSending: sendTest
      }
    });

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
    
    // Plus de détails sur l'erreur Mailjet
    let mailjetError = 'Erreur de connexion';
    if (error && typeof error === 'object' && 'response' in error) {
      const mjError = error as { response?: { status?: number; data?: any } };
      mailjetError = `Status: ${mjError.response?.status}, Data: ${JSON.stringify(mjError.response?.data)}`;
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      mailjetError,
      diagnostics
    }, { status: 500 });
  }
} 
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getClientIP } from './lib/security';

// Configuration des routes protégées
const PROTECTED_API_ROUTES = ['/api/contact', '/api/callback'];
const ALLOWED_ORIGINS = [
  'https://solution-logique.fr',
  'https://www.solution-logique.fr',
  // Ajouter localhost pour le développement
  'http://localhost:3000',
  'http://localhost:9988',
];

/**
 * Génération d'un token CSRF simple
 */
function generateCSRFToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Validation de l'origine de la requête
 */
function validateOrigin(request: NextRequest): boolean {
  const origin = request.headers.get('origin');
  const referer = request.headers.get('referer');
  
  // Pour les requêtes API, vérifier l'origine
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // En développement, autoriser les requêtes sans origine
    if (process.env.NODE_ENV === 'development' && !origin) {
      return true;
    }
    
    // Vérifier que l'origine est autorisée
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      return true;
    }
    
    // Fallback: vérifier le referer
    if (referer) {
      return ALLOWED_ORIGINS.some(allowedOrigin => 
        referer.startsWith(allowedOrigin)
      );
    }
    
    return false;
  }
  
  return true;
}

/**
 * Validation basique anti-bot
 */
function detectBot(request: NextRequest): boolean {
  const userAgent = request.headers.get('user-agent') || '';
  
  // Bots légitimes à autoriser
  const legitimateBots = [
    /googlebot/i,
    /bingbot/i,
    /slurp/i,
    /duckduckbot/i,
    /facebookexternalhit/i,
    /twitterbot/i,
  ];
  
  // Vérifier si c'est un bot légitime
  for (const pattern of legitimateBots) {
    if (pattern.test(userAgent)) {
      return false; // Autoriser les bots légitimes
    }
  }
  
  // Patterns de bots malveillants à bloquer
  const suspiciousBotPatterns = [
    /curl/i,
    /wget/i,
    /python-requests/i,
    /scrapy/i,
    /spider/i,
    /crawler/i,
  ];
  
  // Si pas d'user agent, c'est suspect
  if (!userAgent || userAgent.length < 10) {
    return true;
  }
  
  // Vérifier les patterns suspects
  for (const pattern of suspiciousBotPatterns) {
    if (pattern.test(userAgent)) {
      return true;
    }
  }
  
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 🛡️ GESTION SPÉCIALE DES REQUÊTES OPTIONS (CORS Preflight)
  if (request.method === 'OPTIONS' && pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    
    // Autoriser les requêtes OPTIONS depuis les origines autorisées
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
          'Access-Control-Allow-Credentials': 'false',
          'Access-Control-Max-Age': '86400',
        },
      });
    }
  }
  
  // 🛡️ ÉTAPE 1: Validation de l'origine pour les APIs (sauf OPTIONS)
  if (pathname.startsWith('/api/') && request.method !== 'OPTIONS' && !validateOrigin(request)) {
    console.warn('[SECURITY] Origine non autorisée:', {
      origin: request.headers.get('origin'),
      referer: request.headers.get('referer'),
      path: pathname,
      ip: getClientIP(request)
    });
    
    return NextResponse.json(
      { message: 'Origine non autorisée' },
      { status: 403 }
    );
  }
  
  // 🛡️ ÉTAPE 2: Détection de bots pour les APIs sensibles
  if (PROTECTED_API_ROUTES.includes(pathname) && detectBot(request)) {
    console.warn('[SECURITY] Bot détecté:', {
      userAgent: request.headers.get('user-agent'),
      path: pathname,
      ip: getClientIP(request)
    });
    
    return NextResponse.json(
      { message: 'Accès non autorisé' },
      { status: 403 }
    );
  }
  
  // 🛡️ ÉTAPE 3: Validation des méthodes HTTP
  if (pathname.startsWith('/api/')) {
    const allowedMethods = ['POST', 'GET', 'OPTIONS'];
    if (!allowedMethods.includes(request.method)) {
      return NextResponse.json(
        { message: 'Méthode non autorisée' },
        { status: 405 }
      );
    }
  }
  
  // 🛡️ ÉTAPE 4: Headers de sécurité additionnels
  const response = NextResponse.next();
  
  // 🛡️ CORS: Ajouter les en-têtes CORS pour les APIs
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin');
    
    if (origin && ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      response.headers.set('Access-Control-Allow-Credentials', 'false');
      response.headers.set('Access-Control-Max-Age', '86400');
    }
  }
  
  // Ajouter un token CSRF pour les pages avec formulaires
  if (pathname === '/contact' || pathname.includes('contact')) {
    const csrfToken = generateCSRFToken();
    response.cookies.set('csrf-token', csrfToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600, // 1 heure
    });
    
    // Ajouter le token dans un header custom pour le frontend
    response.headers.set('X-CSRF-Token', csrfToken);
  }
  
  // Headers de sécurité pour toutes les réponses
  response.headers.set('X-Powered-By', 'Solution-Logique-Security');
  response.headers.set('Server', 'SLI-Secure');
  
  // Protection contre les attaques de timing
  if (pathname.startsWith('/api/')) {
    response.headers.set('X-Response-Time', Date.now().toString());
  }
  
  return response;
}

// Configuration du matcher pour définir sur quelles routes le middleware s'applique
export const config = {
  matcher: [
    // Exclure les fichiers statiques
    '/((?!_next/static|_next/image|favicon.ico|assets/).*)',
    // Inclure toutes les routes API
    '/api/:path*',
  ],
}; 
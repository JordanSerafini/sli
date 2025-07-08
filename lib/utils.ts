import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Obtient l'URL de base pour les appels API
 * Utilise l'URL Vercel pour les APIs quand le site n'est pas sur Vercel
 */
export function getApiBaseUrl(): string {
  // Si on est côté client et que l'URL actuelle n'est pas Vercel
  if (typeof window !== 'undefined') {
    const currentHost = window.location.hostname;
    
    // Si on n'est pas sur Vercel, utiliser l'URL Vercel pour les APIs
    if (!currentHost.includes('vercel.app') && !currentHost.includes('localhost')) {
      return 'https://solutionlogique.vercel.app';
    }
  }
  
  // Sinon utiliser l'URL relative (comportement par défaut)
  return '';
}

/**
 * Construit l'URL complète pour un endpoint API
 */
export function getApiUrl(endpoint: string): string {
  const baseUrl = getApiBaseUrl();
  return `${baseUrl}${endpoint}`;
} 
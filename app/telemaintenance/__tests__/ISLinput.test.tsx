/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock des composants UI avant l'import
jest.mock('@/components/ui/modernCard', () => ({
  ModernCard: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="modern-card" {...props}>{children}</div>
  ),
}));

jest.mock('@/components/ui/modernButton', () => ({
  ModernButton: ({ children, loading, disabled, onClick, type, ...props }: { 
    children: React.ReactNode; 
    loading?: boolean; 
    disabled?: boolean; 
    onClick?: () => void;
    type?: string;
    [key: string]: unknown;
  }) => (
    <button 
      type={type as 'button' | 'submit' | 'reset'}
      onClick={onClick} 
      disabled={disabled || loading}
      data-loading={loading}
      data-testid="modern-button"
      {...props}
    >
      {loading ? 'Chargement...' : children}
    </button>
  ),
}));

jest.mock('@/components/ui/Input', () => ({
  Input: (props: Record<string, unknown>) => <input data-testid="input" {...props} />,
}));

jest.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon">Download</span>,
  Shield: () => <span data-testid="shield-icon">Shield</span>,
  Monitor: () => <span data-testid="monitor-icon">Monitor</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">CheckCircle</span>,
  ExternalLink: () => <span data-testid="external-link-icon">ExternalLink</span>,
}));

// Import après les mocks
import IslClient from '../ISLinput';

// Configuration personnalisée du rendu
const customRender = (ui: React.ReactElement) => {
  // Créer un conteneur personnalisé
  const container = document.createElement('div');
  container.setAttribute('id', 'test-container');
  document.body.appendChild(container);
  
  const result = render(ui, { container });
  
  // Nettoyer après le test
  const cleanup = () => {
    if (container.parentNode) {
      container.parentNode.removeChild(container);
    }
  };
  
  return { ...result, cleanup };
};

describe('IslClient Component', () => {
  let cleanup: (() => void) | undefined;

  beforeEach(() => {
    // Nettoyer le DOM
    document.body.innerHTML = '';
    jest.clearAllMocks();
    
    // Setup DOM minimal
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (cleanup) {
      cleanup();
      cleanup = undefined;
    }
    // Nettoyer le DOM
    document.body.innerHTML = '';
  });

  describe('Rendu de base', () => {
    test('devrait se rendre sans crash', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      expect(result.container).toBeInTheDocument();
      expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
    });

    test('devrait afficher le formulaire principal', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
      expect(screen.getByLabelText('Code de connexion')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Entrez le code ISL (ex: 123456789)')).toBeInTheDocument();
      expect(screen.getByText('Se connecter via ISL Online')).toBeInTheDocument();
    });

    test('devrait afficher les instructions', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      expect(screen.getByText('Instructions')).toBeInTheDocument();
      expect(screen.getByText('Entrez votre code de connexion ci-dessus')).toBeInTheDocument();
      expect(screen.getByText('Connexion sécurisée')).toBeInTheDocument();
    });
  });

  describe('Interactions utilisateur', () => {
    test('devrait permettre la saisie dans le champ code', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const codeInput = screen.getByLabelText('Code de connexion') as HTMLInputElement;
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(codeInput.value).toBe('123456789');
    });

    test('devrait désactiver le bouton quand le code est vide', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const downloadButton = screen.getByText('Se connecter via ISL Online');
      expect(downloadButton).toBeDisabled();
    });

    test('devrait activer le bouton quand un code est saisi', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Se connecter via ISL Online');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(downloadButton).not.toBeDisabled();
    });
  });

  describe('Validation et erreurs', () => {
    test('devrait afficher une erreur pour un code vide', async () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const downloadButton = screen.getByText('Se connecter via ISL Online');
      
      // Simuler un clic sur un bouton désactivé en forçant l'événement submit
      const form = downloadButton.closest('form');
      if (form) {
        fireEvent.submit(form);
      }
      
      await waitFor(() => {
        expect(screen.getByText('Veuillez entrer un code valide.')).toBeInTheDocument();
      });
    });
  });

  describe('Fonctionnalité de téléchargement', () => {
    test('devrait afficher le bouton de téléchargement', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const downloadButton = screen.getByText('Se connecter via ISL Online');
      expect(downloadButton).toBeInTheDocument();
      expect(downloadButton).toHaveAttribute('type', 'submit');
    });

    test('devrait permettre de saisir un code pour activer le téléchargement', () => {
      const result = customRender(<IslClient />);
      cleanup = result.cleanup;
      
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Se connecter via ISL Online');
      
      // Initialement désactivé
      expect(downloadButton).toBeDisabled();
      
      // Activé après saisie d'un code
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(downloadButton).not.toBeDisabled();
    });
  });
}); 
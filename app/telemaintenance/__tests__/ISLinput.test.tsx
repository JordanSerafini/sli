import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import IslClient from '../ISLinput';

// Configuration de l'environnement DOM pour les tests
global.document = document;
global.window = window;

// Configuration globale des mocks
const mockClick = jest.fn();
const mockCreateElement = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();

// Mock simple et minimal des composants UI
jest.mock('@/components/ui/modernCard', () => {
  const ModernCard = ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="modern-card" {...props}>{children}</div>
  );
  ModernCard.displayName = 'ModernCard';
  return { ModernCard };
});

jest.mock('@/components/ui/modernButton', () => {
  const ModernButton = ({ children, loading, disabled, onClick, type, ...props }: { 
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
  );
  ModernButton.displayName = 'ModernButton';
  return { ModernButton };
});

jest.mock('@/components/ui/Input', () => {
  const Input = (props: Record<string, unknown>) => <input data-testid="input" {...props} />;
  Input.displayName = 'Input';
  return { Input };
});

// Mock des icônes lucide-react
jest.mock('lucide-react', () => ({
  Download: () => <span data-testid="download-icon">Download</span>,
  Shield: () => <span data-testid="shield-icon">Shield</span>,
  Monitor: () => <span data-testid="monitor-icon">Monitor</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">CheckCircle</span>,
}));

describe('IslClient Component', () => {
  // Setup global des mocks DOM
  beforeAll(() => {
    // S'assurer que document et body existent
    if (!document.body) {
      document.body = document.createElement('body');
    }
    
    // Mock createElement
    Object.defineProperty(document, 'createElement', {
      value: mockCreateElement,
      writable: true,
      configurable: true,
    });

    // Mock appendChild
    Object.defineProperty(document.body, 'appendChild', {
      value: mockAppendChild,
      writable: true,
      configurable: true,
    });

    // Mock removeChild
    Object.defineProperty(document.body, 'removeChild', {
      value: mockRemoveChild,
      writable: true,
      configurable: true,
    });
  });

  beforeEach(() => {
    // Reset tous les mocks
    jest.clearAllMocks();
    jest.useFakeTimers();
    
    // Configuration par défaut du mock createElement
    mockCreateElement.mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    });
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendu de base', () => {
    test('devrait se rendre sans crash', () => {
      const { container } = render(<IslClient />);
      expect(container).toBeInTheDocument();
      expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
    });

    test('devrait afficher le formulaire principal', () => {
      render(<IslClient />);
      
      // Vérifier les éléments principaux
      expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
      expect(screen.getByLabelText('Code de connexion')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Entrez le code ISL (ex: 123456789)')).toBeInTheDocument();
      expect(screen.getByText('Télécharger ISL Light Client')).toBeInTheDocument();
    });

    test('devrait afficher les instructions', () => {
      render(<IslClient />);
      
      expect(screen.getByText('Instructions')).toBeInTheDocument();
      expect(screen.getByText('Entrez votre code de connexion ci-dessus')).toBeInTheDocument();
      expect(screen.getByText('Téléchargement sécurisé')).toBeInTheDocument();
    });
  });

  describe('Interactions utilisateur', () => {
    test('devrait permettre la saisie dans le champ code', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion') as HTMLInputElement;
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(codeInput.value).toBe('123456789');
    });

    test('devrait désactiver le bouton quand le code est vide', () => {
      render(<IslClient />);
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      expect(downloadButton).toBeDisabled();
    });

    test('devrait activer le bouton quand un code est saisi', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(downloadButton).not.toBeDisabled();
    });
  });

  describe('Validation et erreurs', () => {
    test('devrait afficher une erreur pour un code vide', async () => {
      render(<IslClient />);
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      // Forcer le clic même si désactivé
      Object.defineProperty(downloadButton, 'disabled', { value: false, writable: true });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText('Veuillez entrer un code valide.')).toBeInTheDocument();
      });
    });

    test('devrait gérer les erreurs de téléchargement', async () => {
      // Simuler une erreur lors de createElement
      mockCreateElement.mockImplementationOnce(() => {
        throw new Error('Erreur simulée');
      });

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors du téléchargement. Veuillez réessayer.')).toBeInTheDocument();
      });
    });
  });

  describe('Fonctionnalité de téléchargement', () => {
    test('devrait déclencher le téléchargement avec un code valide', async () => {
      const mockElement = {
        href: '',
        download: '',
        click: mockClick,
      };
      mockCreateElement.mockReturnValue(mockElement);

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(mockCreateElement).toHaveBeenCalledWith('a');
        expect(mockAppendChild).toHaveBeenCalled();
        expect(mockClick).toHaveBeenCalled();
        expect(mockRemoveChild).toHaveBeenCalled();
      });
    });

    test('devrait configurer correctement le lien de téléchargement', async () => {
      const mockElement = {
        href: '',
        download: '',
        click: mockClick,
      };
      mockCreateElement.mockReturnValue(mockElement);

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(mockElement.href).toBe('/api/islClient?code=123456789');
        expect(mockElement.download).toBe('isl-light-client-123456789.exe');
      });
    });

    test('devrait afficher un message de succès', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Téléchargement initié !/)).toBeInTheDocument();
      });
    });

    test('devrait masquer le message de succès après 5 secondes', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      await waitFor(() => {
        expect(screen.getByText(/Téléchargement initié !/)).toBeInTheDocument();
      });
      
      // Avancer les timers de 5 secondes
      await act(async () => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        expect(screen.queryByText(/Téléchargement initié !/)).not.toBeInTheDocument();
      });
    });
  });

  describe('États de l\'interface', () => {
    test('devrait afficher l\'état de chargement', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      // Vérifier que le bouton est en état de chargement
      expect(downloadButton).toHaveAttribute('data-loading', 'true');
    });

    test('ne devrait pas permettre de cliquer pendant le chargement', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      // Le bouton devrait être désactivé pendant le chargement
      expect(downloadButton).toBeDisabled();
      
      // Tentative de second clic
      await act(async () => {
        fireEvent.click(downloadButton);
      });
      
      // createElement ne devrait être appelé qu'une seule fois
      expect(mockCreateElement).toHaveBeenCalledTimes(1);
    });
  });
}); 
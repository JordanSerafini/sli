import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import IslClient from '../ISLinput';

// Mock des modules
jest.mock('@/components/ui/modernCard', () => ({
  ModernCard: ({ children, className }: { children: React.ReactNode; className?: string }) => 
    <div className={className}>{children}</div>
}));

jest.mock('@/components/ui/modernButton', () => ({
  ModernButton: ({ children, loading, disabled, onClick, ...props }: { 
    children: React.ReactNode; 
    loading?: boolean; 
    disabled?: boolean; 
    onClick?: () => void;
    [key: string]: unknown;
  }) => (
    <button 
      onClick={onClick} 
      disabled={disabled || loading}
      className={loading ? 'loading' : ''}
      {...props}
    >
      {loading ? 'Chargement...' : children}
    </button>
  )
}));

jest.mock('@/components/ui/Input', () => ({
  Input: (props: Record<string, unknown>) => <input {...props} />
}));

// Mock fetch pour l'API
global.fetch = jest.fn();

// Mock pour createElement et appendChild/removeChild
const mockCreateElement = jest.fn();
const mockAppendChild = jest.fn();
const mockRemoveChild = jest.fn();
const mockClick = jest.fn();

Object.defineProperty(document, 'createElement', {
  value: mockCreateElement,
  writable: true,
});

Object.defineProperty(document.body, 'appendChild', {
  value: mockAppendChild,
  writable: true,
});

Object.defineProperty(document.body, 'removeChild', {
  value: mockRemoveChild,
  writable: true,
});

describe('IslClient Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    // Mock pour createElement qui retourne un élément avec click
    mockCreateElement.mockReturnValue({
      href: '',
      download: '',
      click: mockClick,
    });
  });

  test('devrait se rendre sans crash', () => {
    render(<IslClient />);
    expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
    expect(screen.getByLabelText('Code de connexion')).toBeInTheDocument();
    expect(screen.getByText('Télécharger ISL Light Client')).toBeInTheDocument();
  });

  describe('Interface utilisateur', () => {
    test('devrait afficher tous les éléments principaux', () => {
      render(<IslClient />);
      
      // Titre principal
      expect(screen.getByText('Connexion à la télémaintenance')).toBeInTheDocument();
      
      // Champ de saisie
      expect(screen.getByLabelText('Code de connexion')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Entrez le code ISL (ex: 123456789)')).toBeInTheDocument();
      
      // Bouton de téléchargement
      expect(screen.getByText('Télécharger ISL Light Client')).toBeInTheDocument();
      
      // Instructions
      expect(screen.getByText('Instructions')).toBeInTheDocument();
      expect(screen.getByText('Entrez votre code de connexion ci-dessus')).toBeInTheDocument();
      
      // Information sécurité
      expect(screen.getByText('Téléchargement sécurisé')).toBeInTheDocument();
    });

    test('devrait avoir le champ de code requis', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      expect(codeInput).toBeRequired();
    });

    test('devrait désactiver le bouton quand le code est vide', () => {
      render(<IslClient />);
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      expect(downloadButton).toBeDisabled();
    });
  });

  describe('Saisie du code', () => {
    test('devrait permettre la saisie du code', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(codeInput).toHaveValue('123456789');
    });

    test('devrait activer le bouton quand un code est saisi', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      expect(downloadButton).not.toBeDisabled();
    });

    test('devrait désactiver le bouton avec un code vide ou espaces', () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '   ' } });
      expect(downloadButton).toBeDisabled();
    });
  });

  describe('Validation du formulaire', () => {
    test('devrait afficher une erreur pour un code vide', async () => {
      render(<IslClient />);
      const form = screen.getByRole('form') || screen.getByText('Télécharger ISL Light Client').closest('form');
      
      fireEvent.submit(form!);
      
      await waitFor(() => {
        expect(screen.getByText('Veuillez entrer un code valide.')).toBeInTheDocument();
      });
    });

    test('ne devrait pas afficher d\'erreur avec un code valide', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      // Attendre que l'erreur n'apparaisse pas
      await waitFor(() => {
        expect(screen.queryByText('Veuillez entrer un code valide.')).not.toBeInTheDocument();
      });
    });
  });

  describe('Téléchargement', () => {
    test('devrait déclencher le téléchargement avec un code valide', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
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
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(mockElement.href).toBe('/api/islClient?code=123456789');
        expect(mockElement.download).toBe('isl-light-client-123456789.exe');
      });
    });

    test('devrait afficher un état de chargement', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      // Vérifier que le bouton montre l'état de chargement
      await waitFor(() => {
        expect(downloadButton).toHaveClass('loading');
      });
    });

    test('devrait afficher un message de succès après téléchargement', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Téléchargement initié ! Vérifiez vos téléchargements/)).toBeInTheDocument();
      });
    });

    test('devrait masquer le message de succès après 5 secondes', async () => {
      jest.useFakeTimers();
      
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Téléchargement initié !/)).toBeInTheDocument();
      });
      
      // Avancer le temps de 5 secondes
      jest.advanceTimersByTime(5000);
      
      await waitFor(() => {
        expect(screen.queryByText(/Téléchargement initié !/)).not.toBeInTheDocument();
      });
      
      jest.useRealTimers();
    });
  });

  describe('Gestion des erreurs', () => {
    test('devrait afficher une erreur en cas d\'exception', async () => {
      // Mock pour simuler une erreur
      mockCreateElement.mockImplementation(() => {
        throw new Error('Erreur simulée');
      });

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors du téléchargement. Veuillez réessayer.')).toBeInTheDocument();
      });
    });

    test('devrait réactiver le bouton après une erreur', async () => {
      mockCreateElement.mockImplementation(() => {
        throw new Error('Erreur simulée');
      });

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(downloadButton).not.toHaveClass('loading');
        expect(downloadButton).not.toBeDisabled();
      });
    });
  });

  describe('États multiples', () => {
    test('ne devrait pas pouvoir télécharger pendant un téléchargement en cours', async () => {
      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      // Le bouton devrait être désactivé pendant le chargement
      expect(downloadButton).toBeDisabled();
    });

    test('devrait effacer les erreurs précédentes lors d\'un nouveau téléchargement', async () => {
      // Première tentative avec erreur
      mockCreateElement.mockImplementationOnce(() => {
        throw new Error('Erreur simulée');
      });

      render(<IslClient />);
      const codeInput = screen.getByLabelText('Code de connexion');
      const downloadButton = screen.getByText('Télécharger ISL Light Client');
      
      fireEvent.change(codeInput, { target: { value: '123456789' } });
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors du téléchargement. Veuillez réessayer.')).toBeInTheDocument();
      });
      
      // Deuxième tentative réussie
      mockCreateElement.mockReturnValue({
        href: '',
        download: '',
        click: mockClick,
      });
      
      fireEvent.click(downloadButton);
      
      await waitFor(() => {
        expect(screen.queryByText('Erreur lors du téléchargement. Veuillez réessayer.')).not.toBeInTheDocument();
      });
    });
  });
}); 
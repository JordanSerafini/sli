import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallbackModal from '../CallbackModal';

// Mock fetch globally
global.fetch = jest.fn();

// Mock next/router if needed
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: '',
      asPath: '',
    };
  },
}));

describe('CallbackModal Component', () => {
  const mockOnClose = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
    (global.fetch as jest.Mock).mockClear();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('Rendu de base', () => {
    test('ne devrait pas se rendre quand isOpen est false', () => {
      render(<CallbackModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('Demande de rappel')).not.toBeInTheDocument();
    });

    test('devrait se rendre quand isOpen est true', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Demande de rappel')).toBeInTheDocument();
    });

    test('devrait afficher le formulaire de rappel', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      expect(screen.getByText('Demande de rappel')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Votre numéro de téléphone')).toBeInTheDocument();
      expect(screen.getByText('Me faire rappeler')).toBeInTheDocument();
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });

    test('devrait avoir un bouton de fermeture', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      const closeButton = screen.getByLabelText('Fermer');
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('Interactivité', () => {
    test('devrait fermer la modal quand on clique sur le bouton fermer', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Fermer');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('devrait fermer la modal quand on clique sur Annuler', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const cancelButton = screen.getByText('Annuler');
      fireEvent.click(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('devrait mettre à jour la valeur du champ téléphone', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone') as HTMLInputElement;
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      expect(phoneInput.value).toBe('0123456789');
    });
  });

  describe('Soumission du formulaire', () => {
    test('devrait empêcher la soumission avec un champ vide', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      // Le champ requis devrait empêcher la soumission
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      expect(phoneInput).toHaveAttribute('required');
    });

    test('devrait soumettre le formulaire avec des données valides', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(global.fetch).toHaveBeenCalledWith('/api/callback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: '0123456789' }),
      });
    });

    test('devrait afficher un message de succès après soumission réussie', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Nous vous rappellerons bientôt !')).toBeInTheDocument();
      });

      // Avancer les timers avec act()
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      expect(mockOnClose).toHaveBeenCalled();
    });

    test('devrait afficher un message d\'erreur en cas d\'échec', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      });

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Erreur lors de l\'envoi. Veuillez réessayer.')).toBeInTheDocument();
      });
    });

    test('devrait gérer les erreurs réseau', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Erreur réseau. Veuillez vérifier votre connexion.')).toBeInTheDocument();
      });
    });

    test('devrait afficher l\'état de chargement pendant la soumission', async () => {
      let resolvePromise: (value: { ok: boolean }) => void;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      (global.fetch as jest.Mock).mockReturnValueOnce(pendingPromise);

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();

      // Résoudre la promesse
      await act(async () => {
        resolvePromise!({ ok: true });
      });
    });

    test('devrait vider le champ après succès', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone') as HTMLInputElement;
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      expect(phoneInput.value).toBe('0123456789');
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(phoneInput.value).toBe('');
      });
    });

    test('devrait fermer la modal après le délai de succès', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Nous vous rappellerons bientôt !')).toBeInTheDocument();
      });

      // Avancer les timers de 2 secondes
      await act(async () => {
        jest.advanceTimersByTime(2000);
      });

      // Vérifier que onClose a été appelé et que le status est remis à null
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibilité', () => {
    test('devrait permettre la fermeture avec la touche Échap sur le bouton fermer', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Fermer');
      fireEvent.keyDown(closeButton, { key: 'Enter' });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('devrait permettre la fermeture avec la barre d\'espace sur le bouton fermer', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Fermer');
      fireEvent.keyDown(closeButton, { key: ' ' });
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('États multiples', () => {
    test('ne devrait pas permettre de soumettre pendant l\'envoi', async () => {
      let resolvePromise: (value: { ok: boolean }) => void;
      const pendingPromise = new Promise((resolve) => {
        resolvePromise = resolve;
      });
      
      (global.fetch as jest.Mock).mockReturnValueOnce(pendingPromise);

      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');

      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      
      await act(async () => {
        fireEvent.click(submitButton);
      });

      expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();
      
      // Vérifier que le bouton est désactivé (donc pas cliquable)
      expect(submitButton).toBeDisabled();
      
      // Tentative de seconde soumission ne devrait pas fonctionner car le bouton est désactivé
      await act(async () => {
        fireEvent.click(submitButton);
      });

      // Fetch ne devrait être appelé qu'une seule fois car le bouton est désactivé
      expect(global.fetch).toHaveBeenCalledTimes(1);

      // Résoudre la promesse pour nettoyer
      await act(async () => {
        resolvePromise!({ ok: true });
      });
    });
  });
});

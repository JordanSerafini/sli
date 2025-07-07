import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CallbackModal from '../CallbackModal';

// Mock fetch
global.fetch = jest.fn();

describe('CallbackModal Component', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (fetch as jest.Mock).mockClear();
  });

  describe('Rendu conditionnel', () => {
    test('ne devrait pas se rendre quand isOpen=false', () => {
      render(<CallbackModal isOpen={false} onClose={mockOnClose} />);
      expect(screen.queryByText('Demande de rappel')).not.toBeInTheDocument();
    });

    test('devrait se rendre quand isOpen=true', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      expect(screen.getByText('Demande de rappel')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Votre numéro de téléphone')).toBeInTheDocument();
      expect(screen.getByText('Me faire rappeler')).toBeInTheDocument();
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });
  });

  describe('Interface utilisateur', () => {
    beforeEach(() => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
    });

    test('devrait afficher le titre correct', () => {
      expect(screen.getByText('Demande de rappel')).toBeInTheDocument();
    });

    test('devrait avoir un bouton de fermeture', () => {
      const closeButton = screen.getByLabelText('Fermer');
      expect(closeButton).toBeInTheDocument();
    });

    test('devrait avoir un champ de téléphone requis', () => {
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      expect(phoneInput).toBeRequired();
      expect(phoneInput).toHaveAttribute('type', 'tel');
    });

    test('devrait avoir les boutons d\'action', () => {
      expect(screen.getByText('Me faire rappeler')).toBeInTheDocument();
      expect(screen.getByText('Annuler')).toBeInTheDocument();
    });
  });

  describe('Fermeture du modal', () => {
    test('devrait fermer quand on clique sur le bouton X', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Fermer');
      fireEvent.click(closeButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    test('devrait fermer quand on clique sur Annuler', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const cancelButton = screen.getByText('Annuler');
      fireEvent.click(cancelButton);
      
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Saisie et validation', () => {
    beforeEach(() => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
    });

    test('devrait permettre la saisie du numéro de téléphone', () => {
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      expect(phoneInput).toHaveValue('0123456789');
    });

    test('devrait vider le champ après soumission réussie', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(phoneInput).toHaveValue('');
      });
    });
  });

  describe('Soumission du formulaire', () => {
    beforeEach(() => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
    });

    test('devrait empêcher la soumission avec un champ vide', () => {
      const form = screen.getByRole('form') || screen.getByText('Me faire rappeler').closest('form');
      expect(form).toBeInTheDocument();
      
      // Le champ requis devrait empêcher la soumission
      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      expect(phoneInput).toBeRequired();
    });

    test('devrait appeler l\'API avec les bonnes données', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(fetch).toHaveBeenCalledWith('/api/callback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone: '0123456789' }),
        });
      });
    });

    test('devrait afficher un message de chargement', async () => {
      (fetch as jest.Mock).mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      expect(screen.getByText('Envoi en cours...')).toBeInTheDocument();
    });

    test('devrait afficher un message de succès', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nous vous rappellerons bientôt !')).toBeInTheDocument();
      });
    });

    test('devrait fermer automatiquement après succès', async () => {
      jest.useFakeTimers();
      
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Nous vous rappellerons bientôt !')).toBeInTheDocument();
      });
      
      // Avancer le temps de 2 secondes
      jest.advanceTimersByTime(2000);
      
      await waitFor(() => {
        expect(mockOnClose).toHaveBeenCalledTimes(1);
      });
      
      jest.useRealTimers();
    });
  });

  describe('Gestion des erreurs', () => {
    beforeEach(() => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
    });

    test('devrait afficher une erreur quand l\'API retourne une erreur', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur lors de l\'envoi. Veuillez réessayer.')).toBeInTheDocument();
      });
    });

    test('devrait afficher une erreur réseau', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      const phoneInput = screen.getByPlaceholderText('Votre numéro de téléphone');
      const submitButton = screen.getByText('Me faire rappeler');
      
      fireEvent.change(phoneInput, { target: { value: '0123456789' } });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(screen.getByText('Erreur réseau. Veuillez vérifier votre connexion.')).toBeInTheDocument();
      });
    });
  });

  describe('Accessibilité', () => {
    test('devrait avoir les labels appropriés', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const phoneInput = screen.getByLabelText('Votre numéro de téléphone');
      expect(phoneInput).toBeInTheDocument();
    });

    test('devrait pouvoir être utilisé au clavier', () => {
      render(<CallbackModal isOpen={true} onClose={mockOnClose} />);
      
      const closeButton = screen.getByLabelText('Fermer');
      closeButton.focus();
      expect(closeButton).toHaveFocus();
      
      fireEvent.keyDown(closeButton, { key: 'Enter' });
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });
}); 
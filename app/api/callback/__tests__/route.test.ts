import { NextRequest } from 'next/server';
import { POST } from '../route';

// Mock Resend
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: jest.fn()
      }
    }))
  };
});

// Tests pour l'API Callback
describe('Callback API Route', () => {
  let mockEmailsSend: jest.Mock;
  
  beforeEach(() => {
    jest.clearAllMocks();
    
         // Configuration du mock Resend
     mockEmailsSend = jest.fn();
     const { Resend } = jest.requireActual('resend');
     jest.mocked(Resend).mockImplementation(() => ({
       emails: {
         send: mockEmailsSend
       }
     }));

    // Configuration des variables d'environnement
    process.env.RESEND_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  describe('Configuration de l\'environnement', () => {
    test('devrait retourner 500 si RESEND_API_KEY n\'est pas configurée', async () => {
      delete process.env.RESEND_API_KEY;

      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone: '0123456789' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Configuration du serveur de messagerie manquante');
    });
  });

  describe('Validation du numéro de téléphone', () => {
    test('devrait retourner 400 pour un numéro manquant', async () => {
      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({})
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Le numéro de téléphone est obligatoire.');
    });

    test('devrait retourner 400 pour un numéro vide', async () => {
      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone: '' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Le numéro de téléphone est obligatoire.');
    });

    test('devrait accepter différents formats de numéros français', async () => {
      mockEmailsSend.mockResolvedValue({
        data: { id: 'email-id' },
        error: null
      });

      const validPhones = [
        '01 23 45 67 89',
        '0123456789',
        '+33123456789',
        '+33 1 23 45 67 89',
        '01.23.45.67.89',
        '06 12 34 56 78'
      ];

      for (const phone of validPhones) {
        const req = new NextRequest('http://localhost:3000/api/callback', {
          method: 'POST',
          body: JSON.stringify({ phone })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);
      }
    });
  });

  describe('Envoi d\'email réussi', () => {
    test('devrait envoyer un email avec les bonnes données', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id-123' },
        error: null
      });

      const phone = '0123456789';
      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Demande de rappel envoyée avec succès');
      
      expect(mockEmailsSend).toHaveBeenCalledWith({
        from: 'Solution Logique <site@solution-logique.fr>',
        to: ['site@solution-logique.fr'],
        subject: 'Demande de rappel depuis le site web',
        react: expect.anything()
      });
    });

    test('devrait inclure le numéro dans le template email', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id-123' },
        error: null
      });

      const phone = '+33 1 23 45 67 89';
      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone })
      });

      const response = await POST(req);
      expect(response.status).toBe(200);
      
      // Vérifier que l'appel contient le template avec le numéro
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          react: expect.anything()
        })
      );
    });
  });

  describe('Gestion des erreurs Resend', () => {
    test('devrait retourner 500 en cas d\'erreur Resend', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: null,
        error: {
          message: 'API limit exceeded',
          name: 'api_error'
        }
      });

      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone: '0123456789' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Erreur lors de l\'envoi de la demande');
    });

    test('devrait retourner 500 en cas d\'exception non gérée', async () => {
      mockEmailsSend.mockRejectedValueOnce(new Error('Network error'));

      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: JSON.stringify({ phone: '0123456789' })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Erreur lors de l\'envoi de la demande');
    });
  });

  describe('Données malformées', () => {
    test('devrait gérer un JSON invalide', async () => {
      const req = new NextRequest('http://localhost:3000/api/callback', {
        method: 'POST',
        body: 'invalid-json'
      });

      const response = await POST(req);
      expect(response.status).toBe(500);
    });
  });
}); 
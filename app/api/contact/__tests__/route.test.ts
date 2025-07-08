import { NextRequest } from 'next/server';
import { POST } from '../route';

// Mock de Resend
const mockEmailsSend = jest.fn();
jest.mock('resend', () => {
  return {
    Resend: jest.fn().mockImplementation(() => ({
      emails: {
        send: mockEmailsSend
      }
    }))
  };
});

// Mock du composant email-template
jest.mock('../../../components/email-template', () => ({
  ContactEmailTemplate: jest.fn(({ name, email, phone, message }) => 
    `ContactEmailTemplate: ${name}, ${email}, ${phone || 'no phone'}, ${message}`
  )
}));

describe('Contact API Route', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockEmailsSend.mockClear();
    
    // Configuration des variables d'environnement
    process.env.RESEND_API_KEY = 'test-api-key';
  });

  afterEach(() => {
    delete process.env.RESEND_API_KEY;
  });

  describe('Validation des données', () => {
    test('devrait retourner 400 pour des champs manquants', async () => {
      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name: 'John' }) // email et message manquants
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Nom, email et message sont requis.');
    });

    test('devrait retourner 400 pour un email invalide', async () => {
      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'email-invalide',
          message: 'Test message'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Adresse email invalide.');
    });

    test('devrait accepter un email valide', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id' },
        error: null
      });

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        })
      });

      const response = await POST(req);
      expect(response.status).toBe(200);
    });

    test('devrait accepter des emails avec différents formats', async () => {
      mockEmailsSend.mockResolvedValue({
        data: { id: 'email-id' },
        error: null
      });

      const validEmails = [
        'test@example.com',
        'user+tag@domain.co.uk',
        'firstname.lastname@subdomain.example.org',
        'test123@test-domain.fr'
      ];

      for (const email of validEmails) {
        const req = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            name: 'Test User',
            email,
            message: 'Test message'
          })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);
      }
    });
  });

  describe('Configuration de l\'environnement', () => {
    test('devrait retourner 500 si RESEND_API_KEY n\'est pas configurée', async () => {
      delete process.env.RESEND_API_KEY;

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Service de messagerie non configuré');
    });
  });

  describe('Envoi d\'email réussi', () => {
    test('devrait envoyer un email avec les bonnes données', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id-123' },
        error: null
      });

      const contactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '0123456789',
        message: 'Message de test'
      };

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData)
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.message).toBe('Message envoyé avec succès !');
      
      expect(mockEmailsSend).toHaveBeenCalledWith({
        from: 'Solution Logique <site@solution-logique.fr>',
        to: ['site@solution-logique.fr'],
        subject: 'Nouveau message de contact - John Doe',
        react: expect.anything(),
        replyTo: 'john@example.com'
      });
    });

    test('devrait envoyer un email sans numéro de téléphone', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id-123' },
        error: null
      });

      const contactData = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        message: 'Message sans téléphone'
      };

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify(contactData)
      });

      const response = await POST(req);
      expect(response.status).toBe(200);
      
      expect(mockEmailsSend).toHaveBeenCalledWith(
        expect.objectContaining({
          subject: 'Nouveau message de contact - Jane Doe',
          replyTo: 'jane@example.com'
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

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Erreur lors de l\'envoi du message');
    });

    test('devrait retourner 500 en cas d\'exception non gérée', async () => {
      mockEmailsSend.mockRejectedValueOnce(new Error('Network error'));

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message'
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.message).toContain('Erreur lors de l\'envoi du message');
    });
  });

  describe('Données malformées', () => {
    test('devrait gérer un JSON invalide', async () => {
      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: 'invalid-json'
      });

      const response = await POST(req);
      expect(response.status).toBe(500);
    });

    test('devrait gérer des champs avec des espaces uniquement', async () => {
      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: '   ',
          email: '  test@example.com  ',
          message: '   '
        })
      });

      const response = await POST(req);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.message).toBe('Nom, email et message sont requis.');
    });
  });

  describe('Caractères spéciaux et sécurité', () => {
    test('devrait gérer les caractères spéciaux dans le nom', async () => {
      mockEmailsSend.mockResolvedValueOnce({
        data: { id: 'email-id' },
        error: null
      });

      const req = new NextRequest('http://localhost:3000/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: 'Jean-François O\'Connor',
          email: 'jean@example.com',
          message: 'Message avec accents éèàçù'
        })
      });

      const response = await POST(req);
      expect(response.status).toBe(200);
    });

    test('devrait gérer les numéros de téléphone avec différents formats', async () => {
      mockEmailsSend.mockResolvedValue({
        data: { id: 'email-id' },
        error: null
      });

      const phoneFormats = [
        '01 23 45 67 89',
        '01.23.45.67.89',
        '0123456789',
        '+33 1 23 45 67 89',
        '+33123456789'
      ];

      for (const phone of phoneFormats) {
        const req = new NextRequest('http://localhost:3000/api/contact', {
          method: 'POST',
          body: JSON.stringify({
            name: 'Test User',
            email: 'test@example.com',
            phone,
            message: 'Test message'
          })
        });

        const response = await POST(req);
        expect(response.status).toBe(200);
      }
    });
  });
}); 
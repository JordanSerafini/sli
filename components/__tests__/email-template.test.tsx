import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContactEmailTemplate } from '../email-template';

describe('ContactEmailTemplate', () => {
  const defaultProps = {
    name: 'John Doe',
    email: 'john@example.com',
    message: 'Message de test'
  };

  test('devrait se rendre sans crash', () => {
    const { container } = render(<ContactEmailTemplate {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('devrait afficher toutes les informations de contact', () => {
    const { container } = render(
      <ContactEmailTemplate 
        name="Jean Dupont"
        email="jean.dupont@example.com"
        phone="0123456789"
        message="Demande d'information sur vos services"
      />
    );

    const content = container.textContent;
    expect(content).toContain('Jean Dupont');
    expect(content).toContain('jean.dupont@example.com');
    expect(content).toContain('0123456789');
    expect(content).toContain('Demande d\'information sur vos services');
  });

  test('devrait fonctionner sans numéro de téléphone', () => {
    const { container } = render(<ContactEmailTemplate {...defaultProps} />);
    
    const content = container.textContent;
    expect(content).toContain('John Doe');
    expect(content).toContain('john@example.com');
    expect(content).toContain('Message de test');
  });

  test('devrait gérer les caractères spéciaux dans le nom', () => {
    const { container } = render(
      <ContactEmailTemplate 
        {...defaultProps}
        name="Jean-François O'Connor"
      />
    );

    expect(container.textContent).toContain('Jean-François O\'Connor');
  });

  test('devrait gérer les accents dans le message', () => {
    const { container } = render(
      <ContactEmailTemplate 
        {...defaultProps}
        message="Message avec des accents éèàçù et caractères spéciaux !@#$%"
      />
    );

    expect(container.textContent).toContain('Message avec des accents éèàçù et caractères spéciaux !@#$%');
  });

  test('devrait gérer les emails avec différents formats', () => {
    const emails = [
      'test@example.com',
      'user+tag@domain.co.uk',
      'firstname.lastname@subdomain.example.org'
    ];

    emails.forEach(email => {
      const { container } = render(
        <ContactEmailTemplate {...defaultProps} email={email} />
      );
      expect(container.textContent).toContain(email);
    });
  });

  test('devrait gérer les numéros de téléphone avec différents formats', () => {
    const phones = [
      '01 23 45 67 89',
      '01.23.45.67.89',
      '0123456789',
      '+33 1 23 45 67 89',
      '+33123456789'
    ];

    phones.forEach(phone => {
      const { container } = render(
        <ContactEmailTemplate {...defaultProps} phone={phone} />
      );
      expect(container.textContent).toContain(phone);
    });
  });

  test('devrait gérer les messages longs', () => {
    const longMessage = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. '.repeat(20);
    
    const { container } = render(
      <ContactEmailTemplate {...defaultProps} message={longMessage} />
    );

    expect(container.textContent).toContain(longMessage);
  });

  test('devrait gérer les messages avec des sauts de ligne', () => {
    const messageWithBreaks = 'Première ligne\nDeuxième ligne\n\nTroisième ligne après ligne vide';
    
    const { container } = render(
      <ContactEmailTemplate {...defaultProps} message={messageWithBreaks} />
    );

    expect(container.textContent).toContain('Première ligne');
    expect(container.textContent).toContain('Deuxième ligne');
    expect(container.textContent).toContain('Troisième ligne après ligne vide');
  });

  describe('Structure HTML', () => {
    test('devrait avoir une structure de table pour email', () => {
      const { container } = render(<ContactEmailTemplate {...defaultProps} />);
      
      // Vérifier qu'il y a une structure de table (typique pour les emails)
      const tables = container.querySelectorAll('table');
      expect(tables.length).toBeGreaterThan(0);
    });

    test('devrait avoir des styles inline pour la compatibilité email', () => {
      const { container } = render(<ContactEmailTemplate {...defaultProps} />);
      
      // Vérifier qu'il y a des styles inline
      const elementsWithStyle = container.querySelectorAll('[style]');
      expect(elementsWithStyle.length).toBeGreaterThan(0);
    });
  });

  describe('Valeurs vides ou undefined', () => {
    test('devrait gérer les propriétés undefined', () => {
      const { container } = render(
        <ContactEmailTemplate 
          name="Test User"
          email="test@example.com"
          message="Test message"
          phone={undefined}
        />
      );

      expect(container.textContent).toContain('Test User');
      expect(container.textContent).toContain('test@example.com');
      expect(container.textContent).toContain('Test message');
    });

    test('devrait gérer les chaînes vides', () => {
      const { container } = render(
        <ContactEmailTemplate 
          name=""
          email="test@example.com"
          message=""
          phone=""
        />
      );

      // Le template devrait quand même se rendre même avec des valeurs vides
      expect(container.firstChild).toBeInTheDocument();
    });
  });
}); 
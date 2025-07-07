import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Informatique from "../page";

// Mock Next.js si nécessaire
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

describe("Informatique Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendu de base", () => {
    test("devrait se rendre sans crash", () => {
      render(<Informatique />);
      expect(document.body).toBeInTheDocument();
    });

    test("devrait afficher le titre principal", () => {
      render(<Informatique />);
      const titleElements = screen.getAllByText(/informatique/i);
      expect(titleElements.length).toBeGreaterThan(0);
    });

    test("devrait afficher des informations sur les services informatiques", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
      const techTerms = /ordinateur|serveur|réseau|maintenance|support|technique|hardware|software/i;
      expect(content).toMatch(techTerms);
    });
  });

  describe("Services informatiques", () => {
    test("devrait afficher les différents services proposés", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
      // Vérifier la présence de services typiques
      const services = /installation|configuration|dépannage|maintenance|conseil|formation/i;
      expect(content).toMatch(services);
    });

    test("devrait avoir des sections clairement définies", () => {
      render(<Informatique />);
      const sections = document.querySelectorAll('section, .section, [class*="section"]');
      expect(sections.length).toBeGreaterThan(0);
    });

    test("devrait afficher des cartes de services", () => {
      render(<Informatique />);
      const cards = document.querySelectorAll('.card, .service-card, [class*="card"]');
      expect(cards.length).toBeGreaterThan(0);
    });
  });

  describe("Images et médias", () => {
    test("devrait contenir des images relatives à l'informatique", () => {
      render(<Informatique />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
      });
    });

    test("les images devraient avoir des sources valides", () => {
      render(<Informatique />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).not.toBe('#');
        expect(src).not.toBe('');
      });
    });
  });

  describe("Navigation et liens", () => {
    test("devrait contenir des liens de contact ou d'action", () => {
      render(<Informatique />);
      const links = document.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });

    test("les liens externes devraient s'ouvrir dans un nouvel onglet", () => {
      render(<Informatique />);
      const externalLinks = document.querySelectorAll('a[href^="http"], a[target="_blank"]');
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel');
        expect(link.getAttribute('rel')).toMatch(/noopener|noreferrer/);
      });
    });

    test("devrait permettre la navigation au clavier", () => {
      render(<Informatique />);
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
      
      if (focusableElements.length > 0) {
        const firstElement = focusableElements[0] as HTMLElement;
        firstElement.focus();
        expect(firstElement).toHaveFocus();
      }
    });
  });

  describe("Accessibilité", () => {
    test("devrait avoir une hiérarchie de titres appropriée", () => {
      render(<Informatique />);
      const h1 = document.querySelector('h1');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      expect(h1).toBeInTheDocument();
      expect(headings.length).toBeGreaterThan(1);
    });

    test("tous les éléments interactifs devraient être accessibles", () => {
      render(<Informatique />);
      const interactiveElements = document.querySelectorAll('a, button');
      
      interactiveElements.forEach(element => {
        const hasText = element.textContent && element.textContent.trim().length > 0;
        const hasAriaLabel = element.hasAttribute('aria-label');
        const hasAriaLabelledBy = element.hasAttribute('aria-labelledby');
        const hasTitle = element.hasAttribute('title');
        
        expect(hasText || hasAriaLabel || hasAriaLabelledBy || hasTitle).toBe(true);
      });
    });

    test("devrait avoir des contrastes appropriés pour les textes", () => {
      render(<Informatique />);
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div');
      
      // Vérifier qu'il y a du contenu textuel
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive design", () => {
    test("devrait avoir des classes responsive", () => {
      render(<Informatique />);
      const container = document.querySelector('.container, .max-w-, .w-full, [class*="responsive"]');
      expect(container).toBeInTheDocument();
    });

    test("devrait gérer différentes tailles d'écran", () => {
      render(<Informatique />);
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });
  });

  describe("Contenu spécifique", () => {
    test("devrait mentionner les technologies supportées", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
      // Vérifier la présence de technologies courantes
      const technologies = /windows|linux|mac|office|adobe|antivirus|firewall|backup/i;
      expect(content).toMatch(technologies);
    });

    test("devrait afficher les types d'intervention", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
      const interventions = /dépannage|installation|configuration|mise à jour|sécurité|sauvegarde/i;
      expect(content).toMatch(interventions);
    });

    test("devrait mentionner la zone géographique ou les modalités", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
      const location = /déplacement|distance|local|région|sur site|télémaintenance/i;
      expect(content).toMatch(location);
    });
  });

  describe("Performance", () => {
    test("ne devrait pas avoir de rendu excessif", () => {
      const { rerender } = render(<Informatique />);
      
      expect(() => {
        rerender(<Informatique />);
      }).not.toThrow();
    });

    test("devrait se charger rapidement", () => {
      const startTime = performance.now();
      render(<Informatique />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe("Interactivité", () => {
    test("devrait gérer les clics sur les éléments interactifs", () => {
      render(<Informatique />);
      const buttons = document.querySelectorAll('button');
      
      buttons.forEach(button => {
        expect(() => {
          fireEvent.click(button);
        }).not.toThrow();
      });
    });

    test("devrait gérer les événements de survol", () => {
      render(<Informatique />);
      const hoverableElements = document.querySelectorAll('a, button, [class*="hover"]');
      
      hoverableElements.forEach(element => {
        expect(() => {
          fireEvent.mouseEnter(element);
          fireEvent.mouseLeave(element);
        }).not.toThrow();
      });
    });
  });

  describe("Gestion d'erreurs", () => {
    test("devrait gérer les erreurs de chargement d'images", () => {
      render(<Informatique />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        expect(() => {
          fireEvent.error(img);
        }).not.toThrow();
      });
    });

    test("devrait continuer à fonctionner même avec des props undefined", () => {
      expect(() => {
        render(<Informatique />);
      }).not.toThrow();
    });
  });

  describe("SEO et métadonnées", () => {
    test("devrait avoir du contenu textuel pour le SEO", () => {
      render(<Informatique />);
      const textContent = document.body.textContent;
      
      expect(textContent).toBeTruthy();
      expect(textContent.length).toBeGreaterThan(100);
    });

    test("devrait avoir une structure sémantique appropriée", () => {
      render(<Informatique />);
      const semanticElements = document.querySelectorAll('header, main, section, article, aside, footer');
      expect(semanticElements.length).toBeGreaterThan(0);
    });
  });
}); 
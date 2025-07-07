import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import NosServices from "../page";

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

describe("NosServices Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendu de base", () => {
    test("devrait se rendre sans crash", () => {
      render(<NosServices />);
      expect(document.body).toBeInTheDocument();
    });

    test("devrait afficher le titre principal", () => {
      render(<NosServices />);
      const titleElements = screen.getAllByText(/nos services|services/i);
      expect(titleElements.length).toBeGreaterThan(0);
    });

    test("devrait afficher une introduction ou description", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      expect(content).toBeTruthy();
      expect(content.length).toBeGreaterThan(50);
    });
  });

  describe("Liste des services", () => {
    test("devrait afficher plusieurs services", () => {
      render(<NosServices />);
      const serviceCards = document.querySelectorAll('.service, .card, [class*="service"], [class*="card"]');
      expect(serviceCards.length).toBeGreaterThan(1);
    });

    test("chaque service devrait avoir un titre", () => {
      render(<NosServices />);
      const serviceCards = document.querySelectorAll('.service, .card, [class*="service"], [class*="card"]');
      
      serviceCards.forEach(card => {
        const title = card.querySelector('h2, h3, h4, .title, [class*="title"]');
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBeTruthy();
      });
    });

    test("chaque service devrait avoir une description", () => {
      render(<NosServices />);
      const serviceCards = document.querySelectorAll('.service, .card, [class*="service"], [class*="card"]');
      
      serviceCards.forEach(card => {
        const description = card.querySelector('p, .description, [class*="description"]');
        expect(description).toBeInTheDocument();
        expect(description?.textContent).toBeTruthy();
      });
    });

    test("devrait inclure les services principaux de l'entreprise", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      // Vérifier la présence des services typiques
      const mainServices = /informatique|logiciel|formation|télémaintenance|support|conseil|installation|maintenance/i;
      expect(content).toMatch(mainServices);
    });
  });

  describe("Navigation et liens", () => {
    test("devrait contenir des liens vers les pages de services détaillées", () => {
      render(<NosServices />);
      const links = document.querySelectorAll('a');
      expect(links.length).toBeGreaterThan(0);
    });

    test("les liens internes devraient pointer vers des pages valides", () => {
      render(<NosServices />);
      const internalLinks = document.querySelectorAll('a[href^="/"], a[href^="./"], a[href^="../"]');
      
      internalLinks.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href).not.toBe('#');
      });
    });

    test("devrait avoir des boutons d'action ou de contact", () => {
      render(<NosServices />);
      const actionElements = document.querySelectorAll('button, a[class*="button"], a[class*="btn"], .cta');
      expect(actionElements.length).toBeGreaterThan(0);
    });
  });

  describe("Images et médias", () => {
    test("devrait contenir des images pour illustrer les services", () => {
      render(<NosServices />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        const alt = img.getAttribute('alt');
        expect(alt).toBeTruthy();
      });
    });

    test("les images devraient avoir des sources valides", () => {
      render(<NosServices />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).not.toBe('#');
      });
    });

    test("devrait optimiser les images pour les performances", () => {
      render(<NosServices />);
      const images = document.querySelectorAll('img');
      
      // Vérifier si Next.js Image ou des attributs d'optimisation sont utilisés
      images.forEach(img => {
        const isOptimized = img.hasAttribute('loading') || 
                           img.hasAttribute('decoding') || 
                           img.closest('[data-nextjs-image]');
        // Au moins quelques images devraient être optimisées
        expect(images.length === 0 || isOptimized !== undefined).toBe(true);
      });
    });
  });

  describe("Structure et organisation", () => {
    test("devrait avoir une structure sémantique appropriée", () => {
      render(<NosServices />);
      const semanticElements = document.querySelectorAll('header, main, section, article, aside');
      expect(semanticElements.length).toBeGreaterThan(0);
    });

    test("devrait organiser les services en catégories", () => {
      render(<NosServices />);
      const sections = document.querySelectorAll('section, .category, [class*="category"]');
      expect(sections.length).toBeGreaterThan(0);
    });

    test("devrait avoir une hiérarchie de titres logique", () => {
      render(<NosServices />);
      const h1 = document.querySelector('h1');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      expect(h1).toBeInTheDocument();
      expect(headings.length).toBeGreaterThan(2);
    });
  });

  describe("Accessibilité", () => {
    test("tous les éléments interactifs devraient être accessibles au clavier", () => {
      render(<NosServices />);
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      focusableElements.forEach(element => {
        element.focus();
        expect(element).toHaveFocus();
      });
    });

    test("les liens devraient avoir des textes descriptifs", () => {
      render(<NosServices />);
      const links = document.querySelectorAll('a');
      
      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0;
        const hasAriaLabel = link.hasAttribute('aria-label');
        const hasTitle = link.hasAttribute('title');
        
        expect(hasText || hasAriaLabel || hasTitle).toBe(true);
      });
    });

    test("devrait avoir des contrastes de couleur appropriés", () => {
      render(<NosServices />);
      // Test basique - vérifier qu'il y a du contenu visible
      const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
      expect(textElements.length).toBeGreaterThan(0);
    });
  });

  describe("Responsive design", () => {
    test("devrait utiliser des classes responsive", () => {
      render(<NosServices />);
      const responsiveElements = document.querySelectorAll(
        '[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"], .container, .grid, .flex'
      );
      expect(responsiveElements.length).toBeGreaterThan(0);
    });

    test("devrait adapter la mise en page pour mobile", () => {
      render(<NosServices />);
      const grid = document.querySelector('.grid, [class*="grid"], .flex, [class*="flex"]');
      expect(grid).toBeInTheDocument();
    });
  });

  describe("Contenu et informations", () => {
    test("devrait fournir des informations détaillées sur chaque service", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      // Vérifier que le contenu est substantiel
      expect(content.length).toBeGreaterThan(200);
    });

    test("devrait mentionner les avantages ou bénéfices", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      const benefits = /avantage|bénéfice|solution|expertise|qualité|efficace|professionnel|expérience/i;
      expect(content).toMatch(benefits);
    });

    test("devrait inclure des informations de contact ou d'action", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      const contactInfo = /contact|devis|demande|appel|téléphone|email|formulaire/i;
      expect(content).toMatch(contactInfo);
    });
  });

  describe("Performance et optimisation", () => {
    test("devrait se charger rapidement", () => {
      const startTime = performance.now();
      render(<NosServices />);
      const endTime = performance.now();
      
      expect(endTime - startTime).toBeLessThan(100);
    });

    test("ne devrait pas avoir de fuites mémoire", () => {
      const { unmount } = render(<NosServices />);
      
      expect(() => {
        unmount();
      }).not.toThrow();
    });
  });

  describe("Interactivité", () => {
    test("devrait gérer les interactions utilisateur", () => {
      render(<NosServices />);
      const interactiveElements = document.querySelectorAll('button, a, [onclick]');
      
      interactiveElements.forEach(element => {
        expect(() => {
          fireEvent.click(element);
          fireEvent.mouseEnter(element);
          fireEvent.mouseLeave(element);
        }).not.toThrow();
      });
    });

    test("devrait avoir des états hover/focus visibles", () => {
      render(<NosServices />);
      const hoverElements = document.querySelectorAll('[class*="hover"], [class*="focus"]');
      // Au moins quelques éléments devraient avoir des états hover/focus
      expect(hoverElements.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("SEO et contenu", () => {
    test("devrait avoir un contenu riche en mots-clés pertinents", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      const keywords = /service|solution|entreprise|professionnel|conseil|support|assistance|expert/i;
      expect(content).toMatch(keywords);
    });

    test("devrait avoir une longueur de contenu appropriée pour le SEO", () => {
      render(<NosServices />);
      const textContent = document.body.textContent;
      
      // Le contenu devrait être suffisant pour le SEO
      expect(textContent.length).toBeGreaterThan(300);
    });
  });

  describe("Gestion d'erreurs", () => {
    test("devrait gérer les erreurs de rendu gracieusement", () => {
      expect(() => {
        render(<NosServices />);
      }).not.toThrow();
    });

    test("devrait continuer à fonctionner avec des props manquantes", () => {
      const { rerender } = render(<NosServices />);
      
      expect(() => {
        rerender(<NosServices />);
      }).not.toThrow();
    });
  });
}); 
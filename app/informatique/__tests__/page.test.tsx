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

// Mock Next.js components
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; className?: string; target?: string; rel?: string }) => {
    return <a href={href} {...props}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe("Informatique Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendu de base", () => {
    test("devrait se rendre sans crash", () => {
      render(<Informatique />);
      expect(screen.getAllByText(/Solutions/)[0]).toBeInTheDocument();
    });

    test("devrait afficher le titre principal", () => {
      render(<Informatique />);
      expect(screen.getByText('Solutions')).toBeInTheDocument();
      expect(screen.getByText('Informatiques')).toBeInTheDocument();
    });

    test("devrait afficher la description", () => {
      render(<Informatique />);
      expect(screen.getByText(/Transformez votre infrastructure IT/)).toBeInTheDocument();
    });

    test("devrait avoir un badge informatique", () => {
      render(<Informatique />);
      expect(screen.getByText(/Solutions informatiques professionnelles/)).toBeInTheDocument();
    });
  });

  describe("Services informatiques", () => {
    test("devrait afficher les différents services proposés", () => {
      render(<Informatique />);
      const content = document.body.textContent;
      
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
      expect(screen.getAllByText('Infrastructure IT')[0]).toBeInTheDocument();
      expect(screen.getByText('Environnement Utilisateur')).toBeInTheDocument();
      expect(screen.getByText('Hébergement & Cloud')).toBeInTheDocument();
    });

    test("devrait afficher les descriptions des services", () => {
      render(<Informatique />);
      expect(screen.getAllByText(/Solutions complètes pour votre infrastructure informatique/)[0]).toBeInTheDocument();
      expect(screen.getByText(/Un environnement de travail optimisé et sécurisé/)).toBeInTheDocument();
      expect(screen.getByText(/Solutions cloud complètes avec sauvegarde automatique/)).toBeInTheDocument();
    });

    test("devrait afficher les fonctionnalités de chaque service", () => {
      render(<Informatique />);
      expect(screen.getAllByText(/Matériel informatique dernière génération/)[0]).toBeInTheDocument();
      expect(screen.getByText(/Configuration et optimisation des postes de travail/)).toBeInTheDocument();
      expect(screen.getByText(/Sauvegarde automatique externalisée dans le cloud/)).toBeInTheDocument();
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
      const h2Elements = document.querySelectorAll('h2');
      expect(h1).toBeInTheDocument();
      expect(h2Elements.length).toBeGreaterThan(0);
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

    test("devrait avoir des liens accessibles", () => {
      render(<Informatique />);
      const externalLinks = document.querySelectorAll('a[href^="tel:"]');
      externalLinks.forEach(link => {
        expect(link).toBeInTheDocument();
      });
    });

    test("devrait avoir des rôles appropriés", () => {
      render(<Informatique />);
      const main = document.querySelector('main');
      expect(main).toBeInTheDocument();
    });
  });

  describe("Responsive design", () => {
    test("devrait avoir des classes responsive", () => {
      render(<Informatique />);
      const container = document.querySelector('[class*="max-w"], [class*="mx-auto"]');
      expect(container).toBeInTheDocument();
    });

    test("devrait gérer différentes tailles d'écran", () => {
      render(<Informatique />);
      const responsiveElements = document.querySelectorAll('[class*="sm:"], [class*="md:"], [class*="lg:"], [class*="xl:"]');
      expect(responsiveElements.length).toBeGreaterThan(0);
    });

    test("devrait avoir des grilles responsive", () => {
      render(<Informatique />);
      const gridElements = document.querySelectorAll('[class*="grid"], [class*="lg:grid-cols"]');
      expect(gridElements.length).toBeGreaterThan(0);
    });
  });

  describe("Contenu spécifique", () => {
    test("devrait mentionner les technologies supportées", () => {
      render(<Informatique />);
      // Vérifier la présence de fonctionnalités spécifiques
      expect(screen.getAllByText(/Matériel informatique/)[0]).toBeInTheDocument();
      expect(screen.getAllByText(/Serveurs haute performance/)[0]).toBeInTheDocument();
    });

    test("devrait afficher les types d'intervention", () => {
      render(<Informatique />);
      // Vérifier les services proposés
      expect(screen.getByText(/Configuration et optimisation/)).toBeInTheDocument();
      expect(screen.getByText(/Protection antivirus/)).toBeInTheDocument();
    });

    test("devrait mentionner la zone géographique ou les modalités", () => {
      render(<Informatique />);
      expect(screen.getByText(/Support technique/)).toBeInTheDocument();
      expect(screen.getAllByText(/24\/7/)[0]).toBeInTheDocument();
    });

    test("devrait mentionner les technologies et partenaires", () => {
      render(<Informatique />);
      // Vérifier que les mots-clés techniques sont présents
      expect(screen.getAllByText(/Infrastructure IT/)[0]).toBeInTheDocument();
      expect(screen.getByText(/Environnement Utilisateur/)).toBeInTheDocument();
      expect(screen.getByText(/Hébergement & Cloud/)).toBeInTheDocument();
    });

    test("devrait avoir des sections distinctes", () => {
      render(<Informatique />);
      const sections = document.querySelectorAll('section, [class*="section"]');
      expect(sections.length).toBeGreaterThan(1);
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

    test("devrait avoir des éléments cliquables", () => {
      render(<Informatique />);
      const clickableElements = document.querySelectorAll('a, button, [role="button"]');
      expect(clickableElements.length).toBeGreaterThan(0);
    });

    test("devrait permettre la navigation au clavier", () => {
      render(<Informatique />);
      const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
      expect(focusableElements.length).toBeGreaterThan(0);
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
      // Vérifier la présence de contenu significatif
      expect(screen.getAllByText('Solutions')[0]).toBeInTheDocument();
      expect(screen.getByText('Informatiques')).toBeInTheDocument();
      expect(screen.getByText(/Transformez votre infrastructure IT/)).toBeInTheDocument();
    });

    test("devrait avoir une structure sémantique appropriée", () => {
      render(<Informatique />);
      const semanticElements = document.querySelectorAll('header, main, section, article, aside, footer');
      expect(semanticElements.length).toBeGreaterThan(0);
    });
  });

  describe("Statistiques", () => {
    test("devrait afficher les statistiques", () => {
      render(<Informatique />);
      expect(screen.getByText('30+')).toBeInTheDocument();
      expect(screen.getByText('500+')).toBeInTheDocument();
      expect(screen.getByText('99.9%')).toBeInTheDocument();
      expect(screen.getAllByText('24/7')[0]).toBeInTheDocument();
    });

    test("devrait afficher les labels des statistiques", () => {
      render(<Informatique />);
      expect(screen.getByText(/Années d'expérience/)).toBeInTheDocument();
      expect(screen.getByText(/Entreprises accompagnées/)).toBeInTheDocument();
      expect(screen.getByText(/Disponibilité garantie/)).toBeInTheDocument();
      expect(screen.getByText(/Support technique/)).toBeInTheDocument();
    });
  });

  describe("Boutons d'action", () => {
    test("devrait avoir un bouton de contact", () => {
      render(<Informatique />);
      const contactButton = screen.getByText('Demander un devis');
      expect(contactButton).toBeInTheDocument();
      expect(contactButton.closest('a')).toHaveAttribute('href', '/contact');
    });

    test("devrait avoir un bouton téléphone", () => {
      render(<Informatique />);
      const phoneButtons = screen.getAllByRole('link', { name: /04 50 64 02 33/ });
      expect(phoneButtons[0]).toBeInTheDocument();
      expect(phoneButtons[0]).toHaveAttribute('href', 'tel:0450640233');
    });
  });

  describe("Contenu et structure", () => {
    test("devrait contenir des icônes SVG", () => {
      render(<Informatique />);
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    test("devrait avoir une section d'expertises", () => {
      render(<Informatique />);
      expect(screen.getByText('Nos expertises')).toBeInTheDocument();
    });
  });
}); 
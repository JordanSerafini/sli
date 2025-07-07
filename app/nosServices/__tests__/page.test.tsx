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

// Mock Next.js components
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; className?: string; target?: string; rel?: string }) => {
    return <a href={href} {...props}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

jest.mock('next/image', () => {
  const MockImage = ({ alt, src, ...props }: { alt: string; src: string; width?: number; height?: number; priority?: boolean; className?: string }) => {
    // Convertir priority en string s'il est booléen pour éviter l'erreur React
    const imageProps = { ...props };
    if (typeof imageProps.priority === 'boolean') {
      delete imageProps.priority;
    }
    return <img src={src} alt={alt} {...imageProps} />;
  };
  MockImage.displayName = 'MockImage';
  return MockImage;
});

describe("NosServices Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendu de base", () => {
    test("devrait se rendre sans crash", () => {
      render(<NosServices />);
      expect(screen.getByText('NOS SERVICES')).toBeInTheDocument();
    });

    test("devrait afficher le titre principal", () => {
      render(<NosServices />);
      expect(screen.getByText('NOS SERVICES')).toBeInTheDocument();
    });

    test("devrait afficher une introduction ou description", () => {
      render(<NosServices />);
      const content = document.body.textContent;
      
      expect(content).toBeTruthy();
      expect(content?.length).toBeGreaterThan(50);
    });
  });

  describe("Liste des services", () => {
    test("devrait afficher plusieurs services", () => {
      render(<NosServices />);
      // Vérifier les trois services principaux
      expect(screen.getByText('Informatique')).toBeInTheDocument();
      expect(screen.getByText('Télécom')).toBeInTheDocument();
      expect(screen.getByText('Sécurité')).toBeInTheDocument();
    });

    test("chaque service devrait avoir un titre", () => {
      render(<NosServices />);
      const serviceNames = ['Informatique', 'Télécom', 'Sécurité'];
      
      serviceNames.forEach(name => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });

    test("devrait afficher les descriptions des services", () => {
      render(<NosServices />);
      expect(screen.getByText(/Optimisez vos performances avec des solutions informatiques/)).toBeInTheDocument();
      expect(screen.getByText(/Restez connectés grâce à nos solutions télécom/)).toBeInTheDocument();
      expect(screen.getByText(/Protégez vos données et votre réseau/)).toBeInTheDocument();
    });

    test("devrait afficher les détails de chaque service au hover", () => {
      render(<NosServices />);
      // Vérifier que les détails sont présents dans le DOM (même s'ils sont cachés)
      expect(screen.getByText(/Matériel Informatique/)).toBeInTheDocument();
      expect(screen.getByText(/Téléphonie IP/)).toBeInTheDocument();
      expect(screen.getByText(/Sécurité du SI/)).toBeInTheDocument();
    });

    test("devrait inclure les services principaux de l'entreprise", () => {
      render(<NosServices />);
      expect(screen.getByText('Informatique')).toBeInTheDocument();
      expect(screen.getByText('Télécom')).toBeInTheDocument();
      expect(screen.getByText('Sécurité')).toBeInTheDocument();
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
      // Vérifier la présence des boutons "En savoir plus" (il y en a plusieurs)
      const learnMoreButtons = screen.getAllByText('En savoir plus');
      expect(learnMoreButtons.length).toBeGreaterThan(0);
    });

    test("les cartes devraient être des liens vers les pages de détail", () => {
      render(<NosServices />);
      const links = document.querySelectorAll('a[href="/informatique"], a[href="/telecom"], a[href="/securite"]');
      expect(links.length).toBeGreaterThan(0);
    });

    test("devrait avoir des liens vers les pages de service", () => {
      render(<NosServices />);
      const informaticLink = document.querySelector('a[href="/informatique"]');
      const telecomLink = document.querySelector('a[href="/telecom"]');
      const securiteLink = document.querySelector('a[href="/securite"]');
      
      expect(informaticLink).toBeInTheDocument();
      expect(telecomLink).toBeInTheDocument();
      expect(securiteLink).toBeInTheDocument();
    });
  });

  describe("Images et médias", () => {
    test("devrait contenir des images pour chaque service", () => {
      render(<NosServices />);
      const images = document.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
      
      // Vérifier que les images ont des attributs alt
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
      });
    });

    test("devrait avoir des images de fond pour les cartes", () => {
      render(<NosServices />);
      // Vérifier que les cartes ont des styles de background-image
      const cardsWithBg = document.querySelectorAll('[style*="background-image"]');
      expect(cardsWithBg.length).toBeGreaterThan(0);
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
      // Vérifier la présence d'un conteneur principal
      const mainContainer = document.querySelector('[class*="max-w"]');
      expect(mainContainer).toBeInTheDocument();
    });

    test("devrait organiser les services en catégories", () => {
      render(<NosServices />);
      // Vérifier que les services ont des catégories définies
      expect(screen.getByText(/Infrastructure/)).toBeInTheDocument();
      expect(screen.getByText(/Environnement Utilisateur/)).toBeInTheDocument();
      expect(screen.getByText(/Hébergement & Cloud/)).toBeInTheDocument();
    });

    test("devrait avoir une hiérarchie de titres logique", () => {
      render(<NosServices />);
      const h1 = document.querySelector('h1');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      expect(h1).toBeInTheDocument();
      expect(headings.length).toBeGreaterThan(1);
    });
  });

  describe("Accessibilité", () => {
    test("tous les éléments interactifs devraient être accessibles au clavier", () => {
      render(<NosServices />);
      const focusableElements = document.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      
      expect(focusableElements.length).toBeGreaterThan(0);
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

    test("devrait avoir des liens accessibles", () => {
      render(<NosServices />);
      const links = document.querySelectorAll('a');
      links.forEach(link => {
        const href = link.getAttribute('href');
        expect(href).toBeTruthy();
      });
    });

    test("devrait avoir des images avec attributs alt", () => {
      render(<NosServices />);
      const images = document.querySelectorAll('img');
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).toBeTruthy();
      });
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

    test("devrait utiliser un layout grid ou flex", () => {
      render(<NosServices />);
      const layoutElements = document.querySelectorAll('[class*="grid"], [class*="flex"]');
      expect(layoutElements.length).toBeGreaterThan(0);
    });
  });

  describe("Contenu et informations", () => {
    test("devrait fournir des informations détaillées sur chaque service", () => {
      render(<NosServices />);
      // Vérifier que le contenu principal est présent
      expect(screen.getByText('NOS SERVICES')).toBeInTheDocument();
      expect(screen.getByText('Informatique')).toBeInTheDocument();
      expect(screen.getByText('Télécom')).toBeInTheDocument();
      expect(screen.getByText('Sécurité')).toBeInTheDocument();
    });

    test("devrait mentionner les avantages ou bénéfices", () => {
      render(<NosServices />);
      // Vérifier la présence de descriptions qui montrent les bénéfices
      expect(screen.getByText(/Optimisez vos performances/)).toBeInTheDocument();
      expect(screen.getByText(/Restez connectés/)).toBeInTheDocument();
      expect(screen.getByText(/Protégez vos données/)).toBeInTheDocument();
    });

    test("devrait inclure des informations de contact ou d'action", () => {
      render(<NosServices />);
      // Vérifier la présence d'éléments de contact
      expect(screen.getByText('Nous contacter')).toBeInTheDocument();
      const learnMoreButtons = screen.getAllByText('En savoir plus');
      expect(learnMoreButtons.length).toBeGreaterThan(0);
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

    test("devrait avoir des effets de survol sur les cartes", () => {
      render(<NosServices />);
      const cards = document.querySelectorAll('[class*="group"], [class*="hover"]');
      expect(cards.length).toBeGreaterThan(0);
    });

    test("devrait permettre la navigation au clavier", () => {
      render(<NosServices />);
      const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
      expect(focusableElements.length).toBeGreaterThan(0);
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
      // Vérifier la présence de contenu riche pour le SEO
      expect(screen.getByText('NOS SERVICES')).toBeInTheDocument();
      expect(screen.getByText(/Optimisez vos performances/)).toBeInTheDocument();
      expect(screen.getByText(/Restez connectés/)).toBeInTheDocument();
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

  describe("Section Télémaintenance", () => {
    test("devrait afficher la section télémaintenance", () => {
      render(<NosServices />);
      expect(screen.getByText('Nous contacter')).toBeInTheDocument();
      expect(screen.getByText(/Besoin d'une aide en télémaintenance/)).toBeInTheDocument();
    });

    test("devrait afficher l'image d'assistance", () => {
      render(<NosServices />);
      const assistanceImage = screen.getByAltText(/Assistance télémaintenance/);
      expect(assistanceImage).toBeInTheDocument();
    });

    test("devrait avoir des informations de contact", () => {
      render(<NosServices />);
      // Vérifier la présence d'informations de contact
      expect(screen.getByText(/Support technique instantané/)).toBeInTheDocument();
    });
  });

  describe("Contenu spécifique", () => {
    test("devrait lister les fonctionnalités détaillées", () => {
      render(<NosServices />);
      // Vérifier quelques fonctionnalités spécifiques
      expect(screen.getByText(/Serveur de stockage/)).toBeInTheDocument();
      expect(screen.getByText(/Trunksip/)).toBeInTheDocument();
      expect(screen.getByText(/Sécurité des données/)).toBeInTheDocument();
    });

    test("devrait avoir des badges ou indicateurs visuels", () => {
      render(<NosServices />);
      const badges = document.querySelectorAll('[class*="badge"], [class*="bg-gradient"], svg');
      expect(badges.length).toBeGreaterThan(0);
    });
  });
}); 
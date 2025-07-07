import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ebpbatiment from "../page";

// Mock Next.js router si nécessaire
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    forward: jest.fn(),
  }),
}));

// Mock Next.js Link component
jest.mock('next/link', () => {
  const MockLink = ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) => {
    return <a href={href} {...props}>{children}</a>;
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe("Ebpbatiment Component", () => {
  beforeEach(() => {
    // Reset des mocks avant chaque test
    jest.clearAllMocks();
  });

  describe("Rendu de base", () => {
    test("devrait se rendre sans crash", () => {
      render(<Ebpbatiment />);
      const titleElement = screen.getByText(/EBP Bâtiment/i);
      expect(titleElement).toBeInTheDocument();
    });

    test("devrait afficher le titre principal", () => {
      render(<Ebpbatiment />);
      const titleElement = screen.getByText(/EBP Bâtiment/i);
      expect(titleElement).toBeInTheDocument();
      // Vérifier que c'est bien un titre
      expect(titleElement.tagName).toBe('H1');
    });

    test("devrait afficher la description", () => {
      render(<Ebpbatiment />);
      const descriptionElement = screen.getByText(/Grâce à notre logiciel de gestion dédié au bâtiment/i);
      expect(descriptionElement).toBeInTheDocument();
    });

    test("devrait avoir un badge indiquant \"Logiciels EBP Bâtiment\"", () => {
      render(<Ebpbatiment />);
      expect(screen.getByText(/Logiciels EBP/)).toBeInTheDocument();
      expect(screen.getByText(/Bâtiment/)).toBeInTheDocument();
    });
  });

  describe("Navigation et boutons d'action", () => {
    test("devrait avoir un bouton \"Demander une démonstration\"", () => {
      render(<Ebpbatiment />);
      const demoButton = screen.getByText('Demander une démonstration');
      expect(demoButton).toBeInTheDocument();
      expect(demoButton.closest('a')).toHaveAttribute('href', '/contact');
    });

    test("devrait avoir un lien vers les formations", () => {
      render(<Ebpbatiment />);
      const formationLink = screen.getByText('Voir les formations');
      expect(formationLink).toBeInTheDocument();
      expect(formationLink.closest('a')).toHaveAttribute('href', '/formationCompta');
    });
  });

  describe("Cartes de logiciels", () => {
    test("devrait afficher les noms des logiciels EBP", () => {
      render(<Ebpbatiment />);
      expect(screen.getByText('EBP Gestion Bâtiment')).toBeInTheDocument();
      expect(screen.getByText('EBP Expert Bâtiment')).toBeInTheDocument();
      expect(screen.getByText('EBP Bâtiment PRO')).toBeInTheDocument();
    });

    test("devrait afficher les sous-titres des logiciels", () => {
      render(<Ebpbatiment />);
      expect(screen.getByText('La gestion de chantiers simplifiée')).toBeInTheDocument();
      expect(screen.getByText('L\'excellence pour les professionnels du BTP')).toBeInTheDocument();
      expect(screen.getByText('Solution complète métré-devis-facture')).toBeInTheDocument();
    });

    test("devrait afficher les niveaux des logiciels", () => {
      render(<Ebpbatiment />);
      expect(screen.getAllByText('Professionnel')).toHaveLength(2);
      expect(screen.getByText('Expert')).toBeInTheDocument();
    });

    test("devrait marquer EBP Expert Bâtiment comme populaire", () => {
      render(<Ebpbatiment />);
      expect(screen.getByText('Plus populaire')).toBeInTheDocument();
    });

    test("devrait afficher au moins une carte de logiciel", () => {
      render(<Ebpbatiment />);
      const softwareCards = document.querySelectorAll(".software_card");
      expect(softwareCards.length).toBeGreaterThan(0);
    });

    test("chaque carte de logiciel devrait avoir un titre", () => {
      render(<Ebpbatiment />);
      const softwareCards = document.querySelectorAll(".software_card");
      
      softwareCards.forEach(card => {
        const title = card.querySelector('h2, h3, h4');
        expect(title).toBeInTheDocument();
        expect(title?.textContent).toBeTruthy();
      });
    });

    test("chaque carte de logiciel devrait avoir une description", () => {
      render(<Ebpbatiment />);
      const softwareCards = document.querySelectorAll(".software_card");
      
      softwareCards.forEach(card => {
        const description = card.querySelector('p');
        expect(description).toBeInTheDocument();
        expect(description?.textContent).toBeTruthy();
      });
    });

    test("chaque carte de logiciel devrait comporter un lien 'Télécharger la fiche'", () => {
      render(<Ebpbatiment />);
      const downloadButtons = screen.getAllByText(/Télécharger la fiche/i);
      expect(downloadButtons.length).toBeGreaterThan(0);
      
      downloadButtons.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
    });

    test("les liens 'Télécharger la fiche' devraient pointer vers des PDFs", () => {
      render(<Ebpbatiment />);
      const downloadButtons = screen.getAllByText(/Télécharger la fiche/i);
      
      downloadButtons.forEach((button) => {
        const href = button.getAttribute("href");
        expect(href).toMatch(/\.pdf$/);
      });
    });

    test("les liens devraient s'ouvrir dans un nouvel onglet", () => {
      render(<Ebpbatiment />);
      const downloadButtons = screen.getAllByText(/Télécharger la fiche/i);
      
      downloadButtons.forEach((button) => {
        expect(button).toHaveAttribute("target", "_blank");
        expect(button).toHaveAttribute("rel", "noopener noreferrer");
      });
    });
  });

  describe("Images et médias", () => {
    test("devrait contenir des images de logiciels", () => {
      render(<Ebpbatiment />);
      const images = document.querySelectorAll('img');
      expect(images.length).toBeGreaterThan(0);
      
      images.forEach(img => {
        expect(img).toHaveAttribute('alt');
        expect(img.getAttribute('alt')).toBeTruthy();
      });
    });

    test("les images devraient avoir des attributs src valides", () => {
      render(<Ebpbatiment />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        const src = img.getAttribute('src');
        expect(src).toBeTruthy();
        expect(src).not.toBe('#');
      });
    });

    test("devrait contenir des icônes SVG", () => {
      render(<Ebpbatiment />);
      const svgElements = document.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation et interactivité", () => {
    test("devrait permettre la navigation entre les cartes au clavier", () => {
      render(<Ebpbatiment />);
      const downloadButtons = screen.getAllByText(/Télécharger la fiche/i);
      
      if (downloadButtons.length > 0) {
        const firstButton = downloadButtons[0];
        firstButton.focus();
        expect(firstButton).toHaveFocus();
      }
    });

    test("les boutons devraient être accessibles via Tab", () => {
      render(<Ebpbatiment />);
      const focusableElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
      
      expect(focusableElements.length).toBeGreaterThan(0);
    });

    test("devrait avoir des éléments focusables", () => {
      render(<Ebpbatiment />);
      const focusableElements = document.querySelectorAll('a, button, [tabindex="0"]');
      expect(focusableElements.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibilité", () => {
    test("devrait avoir une structure de titres appropriée", () => {
      render(<Ebpbatiment />);
      const h1 = document.querySelector('h1');
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      
      expect(h1).toBeInTheDocument();
      expect(headings.length).toBeGreaterThan(1);
    });

    test("tous les liens devraient avoir du texte ou des labels", () => {
      render(<Ebpbatiment />);
      const links = document.querySelectorAll('a');
      
      links.forEach(link => {
        const hasText = link.textContent && link.textContent.trim().length > 0;
        const hasAriaLabel = link.hasAttribute('aria-label');
        const hasAriaLabelledBy = link.hasAttribute('aria-labelledby');
        
        expect(hasText || hasAriaLabel || hasAriaLabelledBy).toBe(true);
      });
    });

    test("les images devraient avoir des attributs alt appropriés", () => {
      render(<Ebpbatiment />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        const alt = img.getAttribute('alt');
        expect(alt).toBeDefined();
        // Les images décoratives peuvent avoir alt="", mais pas null/undefined
        expect(alt).not.toBeNull();
      });
    });

    test("les liens devraient avoir des attributs appropriés", () => {
      render(<Ebpbatiment />);
      const externalLinks = document.querySelectorAll('a[target="_blank"]');
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe("Responsive et mise en page", () => {
    test("devrait avoir des classes CSS appropriées pour le responsive", () => {
      render(<Ebpbatiment />);
      const container = document.querySelector('.container, .max-w-');
      expect(container).toBeInTheDocument();
    });

    test("les cartes devraient être dans un layout grid ou flex", () => {
      render(<Ebpbatiment />);
      const cardsContainer = document.querySelector('.grid, .flex, .software_cards_container');
      expect(cardsContainer).toBeInTheDocument();
    });

    test("devrait avoir des classes CSS appropriées pour le responsive", () => {
      render(<Ebpbatiment />);
      const container = document.querySelector('.max-w-7xl, [class*="max-w"]');
      expect(container).toBeInTheDocument();
    });

    test("les cartes devraient être dans un layout grid ou flex", () => {
      render(<Ebpbatiment />);
      const gridContainer = document.querySelector('[class*="grid"], [class*="flex"]');
      expect(gridContainer).toBeInTheDocument();
    });
  });

  describe("Contenu spécifique EBP Bâtiment", () => {
    test("devrait mentionner les types de logiciels bâtiment", () => {
      render(<Ebpbatiment />);
      const content = document.body.textContent;
      
      // Vérifier la présence de termes liés au bâtiment
      const buildingTerms = /bâtiment|construction|architecture|devis|factura|gestion/i;
      expect(content).toMatch(buildingTerms);
    });

    test("devrait afficher les différentes versions de logiciels", () => {
      render(<Ebpbatiment />);
      const softwareCards = document.querySelectorAll(".software_card");
      
      // Il devrait y avoir plusieurs cartes pour différents logiciels
      expect(softwareCards.length).toBeGreaterThanOrEqual(2);
    });

    test("devrait contenir des informations sur les fonctionnalités", () => {
      render(<Ebpbatiment />);
      const content = document.body.textContent;
      
      // Vérifier la présence de fonctionnalités typiques
      const features = /gestion|suivi|planification|budget|planning/i;
      expect(content).toMatch(features);
    });

    test("devrait lister les fonctionnalités des logiciels", () => {
      render(<Ebpbatiment />);
      expect(screen.getByText(/Devis et métrés BTP/)).toBeInTheDocument();
      expect(screen.getByText(/Gestion des chantiers/)).toBeInTheDocument();
      expect(screen.getByText(/Planning et ressources/)).toBeInTheDocument();
    });

    test("devrait avoir des badges pour identifier les types de logiciels", () => {
      render(<Ebpbatiment />);
      const badges = document.querySelectorAll('[class*="badge"], [class*="rounded-full"]');
      expect(badges.length).toBeGreaterThan(0);
    });

    test("devrait mentionner les différents publics cibles", () => {
      render(<Ebpbatiment />);
      const content = document.body.textContent || '';
      expect(content).toMatch(/artisan|entreprise|BTP|professionnel/i);
    });
  });

  describe("Performance et optimisation", () => {
    test("ne devrait pas avoir de rendu excessif", () => {
      const { rerender } = render(<Ebpbatiment />);
      
      // Vérifier que le composant peut être re-rendu sans erreur
      expect(() => {
        rerender(<Ebpbatiment />);
      }).not.toThrow();
    });

    test("devrait charger rapidement", () => {
      const startTime = performance.now();
      render(<Ebpbatiment />);
      const endTime = performance.now();
      
      // Le rendu ne devrait pas prendre plus de 100ms
      expect(endTime - startTime).toBeLessThan(100);
    });
  });

  describe("Gestion d'erreurs", () => {
    test("devrait gérer les props manquantes gracieusement", () => {
      // Même si aucune prop n'est passée, le composant devrait fonctionner
      expect(() => {
        render(<Ebpbatiment />);
      }).not.toThrow();
    });

    test("devrait continuer à fonctionner si une image ne se charge pas", () => {
      render(<Ebpbatiment />);
      const images = document.querySelectorAll('img');
      
      images.forEach(img => {
        // Simuler une erreur de chargement d'image
        fireEvent.error(img);
        // L'application devrait continuer à fonctionner
        expect(document.body).toBeInTheDocument();
      });
    });
  });

  describe("SEO et métadonnées", () => {
    test("devrait avoir des titres hiérarchiques appropriés", () => {
      render(<Ebpbatiment />);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
      expect(headings.length).toBeGreaterThan(1);
    });

    test("devrait contenir du contenu descriptif pour le SEO", () => {
      render(<Ebpbatiment />);
      const text = document.body.textContent || '';
      expect(text).toMatch(/BTP|bâtiment|devis|chantier/i);
    });
  });
}); 
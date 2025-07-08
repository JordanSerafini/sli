/* eslint-disable @next/next/no-img-element */

import React from "react";
import { render, screen } from "@testing-library/react";
import Informatique from "./page";
import '@testing-library/jest-dom';

// Mock de next/image pour retourner une balise <img>
jest.mock("next/image", () => {
  const MockImage = (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <img alt={props.alt || "mock image"} {...props} />
  );
  MockImage.displayName = "MockImage";
  return MockImage;
});

// Mock des icônes Lucide React
jest.mock("lucide-react", () => ({
  Server: () => <span data-testid="server-icon">Server</span>,
  Monitor: () => <span data-testid="monitor-icon">Monitor</span>,
  Shield: () => <span data-testid="shield-icon">Shield</span>,
  Cloud: () => <span data-testid="cloud-icon">Cloud</span>,
  Users: () => <span data-testid="users-icon">Users</span>,
  ArrowRight: () => <span data-testid="arrow-right-icon">ArrowRight</span>,
  CheckCircle: () => <span data-testid="check-circle-icon">CheckCircle</span>,
  Star: () => <span data-testid="star-icon">Star</span>,
  Phone: () => <span data-testid="phone-icon">Phone</span>,
}));

// Mock des composants UI
jest.mock("@/components/ui", () => ({
  ModernSection: ({ children, background, padding, className }: { 
    children: React.ReactNode; 
    background?: string; 
    padding?: string; 
    className?: string; 
  }) => (
    <section className={`modern-section ${background} ${padding} ${className || ''}`}>
      {children}
    </section>
  ),
  ServiceCard: ({ title, description, icon, features, variant, className, onClick }: {
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
    variant?: string;
    className?: string;
    onClick?: () => void;
  }) => (
    <div className={`service-card ${variant} ${className || ''}`} onClick={onClick}>
      <div data-testid="service-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ul>
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
  ),
}));

jest.mock("@/components/ui/modernButton", () => ({
  ModernButton: ({ children, href, variant, size, icon, iconPosition, ...props }: {
    children: React.ReactNode;
    href?: string;
    variant?: string;
    size?: string;
    icon?: React.ReactNode;
    iconPosition?: string;
    [key: string]: unknown;
  }) => {
    const Component = href ? 'a' : 'button';
    return (
      <Component href={href} className={`modern-button ${variant} ${size}`} {...props}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </Component>
    );
  },
}));

describe("Page Informatique", () => {
  it("affiche le titre principal 'SOLUTIONS INFORMATIQUES'", () => {
    render(<Informatique />);
    const mainHeading = screen.getByRole("heading", {
      name: /solutions informatiques/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  it("affiche les titres des services", () => {
    render(<Informatique />);
    
    // Utiliser getAllByText pour gérer les éléments multiples
    const infrastructureTitles = screen.getAllByText('Infrastructure IT');
    expect(infrastructureTitles[0]).toBeInTheDocument();
    
    const environmentTitles = screen.getAllByText('Environnement Utilisateur');
    expect(environmentTitles[0]).toBeInTheDocument();
    
    const cloudTitles = screen.getAllByText('Hébergement & Cloud');
    expect(cloudTitles[0]).toBeInTheDocument();
  });

  it("affiche le titre de la section expertise", () => {
    render(<Informatique />);
    expect(screen.getByText('Nos expertises')).toBeInTheDocument();
  });

  it("affiche les statistiques", () => {
    render(<Informatique />);
    
    // Vérifier que les statistiques sont présentes
    expect(screen.getByText('30+')).toBeInTheDocument();
    expect(screen.getByText('Années d\'expérience')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('Entreprises accompagnées')).toBeInTheDocument();
    expect(screen.getByText('99.9%')).toBeInTheDocument();
    expect(screen.getByText('Disponibilité garantie')).toBeInTheDocument();
    expect(screen.getByText('24/7')).toBeInTheDocument();
    expect(screen.getByText('Support technique')).toBeInTheDocument();
  });

  it("affiche les boutons d'action", () => {
    render(<Informatique />);
    
    expect(screen.getByText('Demander un devis')).toBeInTheDocument();
    
    // Gérer les éléments multiples pour le numéro de téléphone
    const phoneNumbers = screen.getAllByText('04 50 64 02 33');
    expect(phoneNumbers[0]).toBeInTheDocument();
  });

  it("affiche des icônes Lucide", () => {
    render(<Informatique />);
    
    // Vérifier que les icônes sont présentes
    expect(screen.getAllByTestId(/icon/)).not.toHaveLength(0);
  });

  it("contient les informations de contact", () => {
    render(<Informatique />);
    
    // Vérifier le lien téléphone en étant plus spécifique
    const phoneLinks = screen.getAllByRole('link');
    const phoneLink = phoneLinks.find(link => link.getAttribute('href') === 'tel:0450640233');
    expect(phoneLink).toBeDefined();
    expect(phoneLink).toHaveAttribute('href', 'tel:0450640233');
  });

  it("affiche la description des services", () => {
    render(<Informatique />);
    
    // Utiliser getAllByText pour gérer les éléments multiples
    const infrastructureDescriptions = screen.getAllByText(/Solutions complètes pour votre infrastructure informatique/);
    expect(infrastructureDescriptions[0]).toBeInTheDocument();
    
    const environmentDescriptions = screen.getAllByText(/Un environnement de travail optimisé et sécurisé/);
    expect(environmentDescriptions[0]).toBeInTheDocument();
    
    const cloudDescriptions = screen.getAllByText(/Solutions cloud complètes avec sauvegarde automatique/);
    expect(cloudDescriptions[0]).toBeInTheDocument();
  });
});

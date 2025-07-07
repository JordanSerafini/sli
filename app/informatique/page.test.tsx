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

describe("Page Informatique", () => {
  it("affiche le titre principal 'SOLUTIONS INFORMATIQUES'", () => {
    render(<Informatique />);
    const mainHeading = screen.getByRole("heading", {
      name: /solutions informatiques/i,
    });
    expect(mainHeading).toBeInTheDocument();
  });

  it("affiche les titres des sections", () => {
    render(<Informatique />);
    // Récupère tous les titres de niveau 2
    const sectionTitles = screen.getAllByRole("heading", { level: 2 });
    // On vérifie que les sections Infrastructure, Environnement utilisateur et Hébergement & Cloud existent
    const hasInfrastructure = sectionTitles.some((title) =>
      /infrastructure/i.test(title.textContent || "")
    );
    const hasEnvironnement = sectionTitles.some((title) =>
      /environnement utilisateur/i.test(title.textContent || "")
    );
    const hasHebergement = sectionTitles.some((title) =>
      /hébergement.*cloud/i.test(title.textContent || "")
    );
    expect(hasInfrastructure).toBe(true);
    expect(hasEnvironnement).toBe(true);
    expect(hasHebergement).toBe(true);
  });

  it("affiche des images avec l'attribut alt 'logo_solution_logique_informatique'", () => {
    render(<Informatique />);
    const images = screen.getAllByAltText(/logo_solution_logique_informatique/i);
    expect(images.length).toBeGreaterThan(0);
  });

  it("affiche des icônes Lucide", () => {
    render(<Informatique />);
    // On recherche les éléments SVG (icônes Lucide) dans la page
    const icons = document.querySelectorAll("svg");
    expect(icons.length).toBeGreaterThan(0);
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ebpbatiment from "./page";

describe("Ebpbatiment Component", () => {
  test("devrait se rendre sans crash", () => {
    render(<Ebpbatiment />);
    // Vérification que le titre principal est présent
    const titleElements = screen.getAllByText(/EBP Bâtiment/i);
    expect(titleElements[0]).toBeInTheDocument();
  });

  test("devrait afficher la description", () => {
    render(<Ebpbatiment />);
    const descriptionElement = screen.getByText(/Solutions spécialisées pour les professionnels du BTP/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("devrait afficher au moins une carte de logiciel", () => {
    render(<Ebpbatiment />);
    // Vérifie qu'il y a au moins un élément avec les classes des cartes
    const softwareCards = document.querySelectorAll(".grid .bg-white");
    expect(softwareCards.length).toBeGreaterThan(0);
  });

  test("chaque carte de logiciel devrait comporter un lien 'Télécharger la fiche'", () => {
    render(<Ebpbatiment />);
    // Récupère tous les boutons/liens contenant ce texte
    const downloadButtons = screen.getAllByText(/Télécharger la fiche/i);
    expect(downloadButtons.length).toBeGreaterThan(0);
    downloadButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
    });
  });
}); 
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Ebpbatiment from "./page";

describe("Ebpbatiment Component", () => {
  test("devrait se rendre sans crash", () => {
    render(<Ebpbatiment />);
    // Vérification que le titre principal est présent
    const titleElement = screen.getByText(/EBP Bâtiment/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("devrait afficher la description", () => {
    render(<Ebpbatiment />);
    const descriptionElement = screen.getByText(/Grâce à notre logiciel de gestion dédié au bâtiment/i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("devrait afficher au moins une carte de logiciel", () => {
    render(<Ebpbatiment />);
    // Vérifie qu'il y a au moins un élément avec la classe "software_card"
    const softwareCards = document.querySelectorAll(".software_card");
    expect(softwareCards.length).toBeGreaterThan(0);
  });

  test("chaque carte de logiciel devrait comporter un lien 'En savoir plus ?'", () => {
    render(<Ebpbatiment />);
    // Récupère tous les boutons/liens contenant ce texte
    const learnMoreButtons = screen.getAllByText(/En savoir plus ?/i);
    expect(learnMoreButtons.length).toBeGreaterThan(0);
    learnMoreButtons.forEach((button) => {
      expect(button).toHaveAttribute("href");
    });
  });
}); 
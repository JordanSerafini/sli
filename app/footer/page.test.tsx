import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "./page";

describe("Footer Component", () => {
  test("devrait se rendre sans crash", () => {
    render(<Footer />);
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toBeInTheDocument();
  });

  test("devrait afficher les liens de navigation", () => {
    render(<Footer />);
    expect(screen.getByText(/Accueil/i)).toBeInTheDocument();
    expect(screen.getByText(/Nos logiciels \/ Formations/i)).toBeInTheDocument();
    expect(screen.getByText(/Nos Services/i)).toBeInTheDocument();
    expect(screen.getByText(/Télémaintenance/i)).toBeInTheDocument();
    expect(screen.getByText(/Contactez nous/i)).toBeInTheDocument();
    expect(screen.getByText(/Conditions Générales de Vente/i)).toBeInTheDocument();
  });

  // test("devrait afficher une adresse incorrecte (erreur volontaire)", () => {
  //   render(<Footer />);
  //   // Vérifie un texte incorrect volontairement
  //   expect(screen.getByText(/Adresse inexistante/i)).toBeInTheDocument();
  // });

  test("devrait afficher l'année dynamique dans le copyright", () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    const regex = new RegExp(`2022\\s*-\\s*${currentYear}`, "i");
    expect(screen.getByText(regex)).toBeInTheDocument();
  });
});

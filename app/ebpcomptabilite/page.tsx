import "./ebpcomptabilite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";

function Ebpcomptabilite() {
  return (
    <div className="ebp_comptabilite">
      <h1 className="title_ebp">EBP Comptabilité</h1>
      <p className="description">
        Bien que la comptabilité soit une discipline universelle, chaque
        activité détient ses propres spécificités : bilan et compte de
        résultat (CSE, associations, etc.), gestion des dons fiscaux, dossiers
        de gestion, etc. Pour répondre au mieux aux exigences de votre
        métier/secteur, choisissez le logiciel de comptabilité qui facilite la
        tenue de votre trésorerie.
      </p>
      <div className="software_grid">
        {[
          {
            title: "Logiciel Comptabilité ACTIV",
            features: [
              "Comptabilité générale",
              "Saisie automatisée",
              "Tableau de bord",
            ],
            link: "assets/ebp-logiciel-comptabilite-activ-2022.pdf",
          },
          {
            title: "Logiciel Comptabilité PRO",
            features: [
              "Comptabilité générale",
              "Saisie automatisée",
              "Tableau de bord",
              "Déclaration de TVA",
              "Gestion des impayés",
            ],
            link: "assets/ebp-logiciel-comptabilite-pro-2022.pdf",
          },
          {
            title: "Logiciel Comptabilité ELITE",
            features: [
              "Comptabilité générale",
              "Saisie automatisée",
              "Tableau de bord",
              "Déclaration de TVA",
              "Gestion des impayés",
              "Ratios financiers",
              "Personnalisation du logiciel (fiches, vues, etc.)",
            ],
            link: "assets/ebp-logiciel-comptabilite-elite-2022.pdf",
          },
        ].map((software, index) => (
          <div className="software_card" key={index}>
            <h3 className="title_software">{software.title}</h3>
            <ul className="features_list">
              {software.features.map((feature, idx) => (
                <li key={idx}>
                  <FontAwesomeIcon
                    className="comptabilite_icons"
                    icon={faCheck}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              className="btn_help"
              href={software.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              En savoir plus ?
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ebpcomptabilite;

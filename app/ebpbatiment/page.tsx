import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./ebpbatiment.scss";

function Ebpbatiment() {
  return (
    <div className="ebp_batiment">
      <h1 className="title_ebp">EBP Bâtiment</h1>
      <p className="description">
        Grâce à notre logiciel de gestion dédié au bâtiment et aux artisans du
        BTP, faire un devis n’aura jamais été aussi simple ! Calculez vos prix
        au plus juste et chiffrez facilement vos devis. Optimisez votre
        trésorerie au quotidien en facturant vos clients à l’avancement.
      </p>
      <div className="software_grid">
        {[
          {
            title: "Logiciel Bâtiment",
            features: ["Gestion des ventes", "Suivi de chantier", "Tableau de bord"],
            link: "assets/ebp-logiciel-batiment-2022.pdf",
          },
          {
            title: "Logiciel Gestion Bâtiment",
            features: [
              "Gestion des ventes",
              "Suivi de chantier",
              "Tableau de bord",
              "Devis et Factures",
              "Suivi des règlements",
            ],
            link: "assets/ebp-logiciel-gestion-batiment-2022.pdf",
          },
          {
            title: "Logiciel Expert Bâtiment",
            features: [
              "Comptabilité générale",
              "Saisie automatisée",
              "Tableau de bord",
              "Déclaration de TVA",
              "Gestion des impayés",
              "Ratios financiers",
              "Personnalisation du logiciel (fiches, vues, etc.)",
            ],
            link: "assets/ebp-logiciel-expert-batiment-2022.pdf",
          },
        ].map((software, index) => (
          <div className="software_card" key={index}>
            <h3 className="title_software">{software.title}</h3>
            <ul className="features_list">
              {software.features.map((feature, idx) => (
                <li key={idx}>
                  <FontAwesomeIcon
                    className="batiment_icons"
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

export default Ebpbatiment;

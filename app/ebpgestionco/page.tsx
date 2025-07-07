import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Ebpgestionco.scss";

function Ebpgestionco() {
  return (
    <div className="ebp_gestionco">
      <h1 className="title_ebp">EBP Gestion Commerciale</h1>
      <p className="description">
        Commerçants, professionnels du bâtiment ou de l’automobile, découvrez
        quel logiciel de devis et facture EBP correspond à votre secteur
        d’activité. Prenant en compte les besoins spécifiques liés à votre
        métier, nos solutions vous assurent de gérer votre entreprise en toute
        sérénité.
      </p>
      <div className="software_grid">
        {[
          {
            title: "Logiciel Gestion Commerciale ACTIV",
            features: [
              "Gestion des ventes",
              "Relances clients",
              "Synchronisation bancaire",
              "Récupération des factures fournisseurs",
              "Accès à la compta automatisée",
              "Facturation périodique",
              "Assistance téléphonique",
            ],
            link: "assets/ebp-logiciel-gestion-commerciale-activ-2022.pdf",
          },
          {
            title: "Logiciel Gestion Commerciale PRO",
            features: [
              "Gestion des ventes",
              "Relances clients",
              "Achats et stocks",
              "Tableau de bord",
              "Statistiques détaillées",
              "Application mobile EBP - Suivi devis factures",
            ],
            link: "assets/ebp-logiciel-gestion-commerciale-pro-2022.pdf",
          },
          {
            title: "Logiciel Gestion Commerciale ELITE",
            features: [
              "Gestion des ventes",
              "Relances clients",
              "Achats et stocks",
              "Tableau de bord",
              "Statistiques détaillées",
              "Facturation périodique",
              "Planification des ressources",
              "Application mobile EBP - Suivi devis factures",
            ],
            link: "assets/ebp-logiciel-gestion-commerciale-elite-2022.pdf",
          },
        ].map((software, index) => (
          <div className="software_card" key={index}>
            <h3 className="title_software">{software.title}</h3>
            <ul className="features_list">
              {software.features.map((feature, idx) => (
                <li key={idx}>
                  <FontAwesomeIcon
                    className="gestionco_icons"
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

export default Ebpgestionco;

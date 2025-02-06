import React from "react";

import './expertise.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faPrint,
  faFloppyDisk,
  faPhone,
  faShield,
} from "@fortawesome/free-solid-svg-icons";


function Expertise() {
  return (
    <div className="home_banner_bot">
    <div className="container">
      <section className="our_expertise">
        <h1>Notre expertise</h1>
        <h2>Découvrez nos solutions</h2>
        <h3>
          Une équipe expérimentée, des collaborateurs diplômés et certifiés,
          une exigence reconnue pour vous assurer une qualité de service
          professionnel. Nos techniciens ont la mission de renforcer la
          performance de votre système informatique et de protéger votre
          environnement de travail.
        </h3>
      </section>
      <section className="home_services">
        {[
          {
            icon: faComputer,
            title: "Matériels Informatique",
            text: "Optez pour une solution sur mesure",
          },
          {
            icon: faServer,
            title: "Virtualisation & Serveur",
            text: "Optimisez votre productivité.",
          },
          {
            icon: faPrint,
            title: "Système d'impression",
            text: "Mettez-vous à la page",
          },
          {
            icon: faFloppyDisk,
            title: "Sauvegarde de données",
            text: "Protégez vos données.",
          },
          {
            icon: faPhone,
            title: "Opérateur Télécom",
            text: "Choisissez une téléphonie.",
          },
          {
            icon: faShield,
            title: "Sécurité Informatique",
            text: "Protégez votre système.",
          },
        ].map((service, index) => (
          <div className="home_services_card" key={index}>
            <FontAwesomeIcon
              className="home_services_icon"
              icon={service.icon}
            />
            <h1>{service.title}</h1>
            <p>{service.text}</p>
          </div>
        ))}
      </section>
    </div>
  </div>  )
}

export default Expertise
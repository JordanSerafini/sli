import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faSitemap,
  faNetworkWired,
  faHouseLaptop,
  faShieldVirus,
  faTimeline,
  faPeopleGroup,
  faFloppyDisk,
  faCloud,
  faEnvelopesBulk,
  faWindowClose,
  faCloudArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import "./informatique.scss";

function Informatique() {
  return (
    <div className="container add_margin">
      <h1>SOLUTIONS INFORMATIQUES</h1>
      <div className="container_2">
        <h2 className="informatique_section_title">Infrastructure</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <Image
              alt="logo_solution_logique_informatique"
              src="/assets/infrastructure.webp"
              width={400}
              height={300}
            />
          </div>
          <div className="card_informatique_right_side">
            {[
              { icon: faComputer, title: "Matériel Informatique" },
              { icon: faServer, title: "Serveur et stockage" },
              { icon: faSitemap, title: "Interconnexion de sites" },
              { icon: faNetworkWired, title: "Virtualisation de l'infrastructure" },

            ].map((item, index) => (
              <div className="informations_informatique" key={index}>
                <FontAwesomeIcon className="icons_informatique" icon={item.icon} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>

        <h2 className="informatique_section_title">Environnement utilisateur</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            {[
              { icon: faHouseLaptop, title: "Poste de travail" },
              { icon: faShieldVirus, title: "Sécurité Antivirus" },
              { icon: faTimeline, title: "Interconnexion de sites" },
              { icon: faPeopleGroup, title: "Outils Collaboratif" },
            ].map((item, index) => (
              <div className="informations_informatique" key={index}>
                <FontAwesomeIcon className="icons_informatique" icon={item.icon} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
          <div className="card_informatique_right_side">
            <Image
              alt="logo_solution_logique_informatique"
              src="/assets/environnement.webp"
              width={400}
              height={300}
            />
          </div>
        </div>

        <h2 className="informatique_section_title">Hébergement & Cloud</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <Image
              alt="logo_solution_logique_informatique"
              src="/assets/hebergement.webp"
              width={400}
              height={300}
            />
          </div>
          <div className="card_informatique_right_side">
            {[
              { icon: faCloudArrowUp, title: "Sauvegarde externalisé" },
              { icon: faFloppyDisk, title: "Sauvegarde sur place" },
              { icon: faWindowClose, title: "Hébergement de site web" },
              { icon: faEnvelopesBulk, title: "Hébergement et gestion des boites mails" },
              { icon: faCloud, title: "Stockage de données sur le cloud" },
            ].map((item, index) => (
              <div className="informations_informatique" key={index}>
                <FontAwesomeIcon className="icons_informatique" icon={item.icon} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informatique;
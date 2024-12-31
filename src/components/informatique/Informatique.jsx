import "./informatique.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faSitemap,
  faNetworkWired,
  faCamera,
  faHouseLaptop,
  faShieldVirus,
  faTimeline,
  faPeopleGroup,
  faFloppyDisk,
  faCloud,
  faEnvelopesBulk,
  faWindowClose,
  faCloudArrowUp,
  faVideo,
} from "@fortawesome/free-solid-svg-icons";

function Informatique() {
  return (
    <div className="container">
      <h1>SOLUTIONS INFORMATIQUES</h1>
      <div className="container">
        <h2 className="informatique_section_title">Infrastructure</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <img
              alt="logo_solution_logique_informatique"
              src="assets/infrastructure.webp"
            ></img>
          </div>
          <div className="card_informatique_right_side">
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faComputer}
              />
              <h3>Matériel Informatique</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faServer} />
              <h3>Serveur et stockage</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faSitemap}
              />
              <h3>Interconnexion de sites</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faNetworkWired}
              />
              <h3>Virtualisation de l'infrastructure</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faCamera} />
              <h3>Vidéo surveillance</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faVideo} />
              <h3>Vidéo projection</h3>
            </div>
          </div>
        </div>
        <h2 className="informatique_section_title">
          Environnement utilisateur
        </h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faHouseLaptop}
              />
              <h3>Poste de travail</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faShieldVirus}
              />
              <h3>Sécurité Antivirus</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faTimeline}
              />
              <h3>Interconnexion de sites</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faPeopleGroup}
              />
              <h3>Outils Collaboratif</h3>
            </div>
          </div>
          <div className="card_informatique_right_side">
            <img
              alt="logo_solution_logique_informatique"
              src="assets/environnement.webp"
            ></img>
          </div>
        </div>
        <h2 className="informatique_section_title">Hébergement & Cloud</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <img
              alt="logo_solution_logique_informatique"
              src="assets/hebergement.webp"
            ></img>
          </div>
          <div className="card_informatique_right_side">
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faCloudArrowUp}
              />
              <h3>Sauvegarde externalisé</h3>
            </div>

            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faFloppyDisk}
              />
              <h3>Sauvegarde sur place</h3>
            </div>

            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faWindowClose}
              />
              <h3>Hébergement de site web</h3>
            </div>

            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faEnvelopesBulk}
              />
              <h3>Hébergement et gestion des boites mails</h3>
            </div>

            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faCloud} />
              <h3>Stockage de données sur le cloud</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Informatique;

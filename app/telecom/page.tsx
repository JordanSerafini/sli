import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignal,
  faServer,
  faNetworkWired,
  faSquarePhone,
  faMobileScreen,
  faEthernet,
  faWifi,
  faSitemap,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import "./telecom.scss";

export default function Telecom() {
  return (
    <div className="container">
      <h1>SOLUTIONS TÉLÉCOM</h1>
      <div className="container">
        <h2 className="informatique_section_title">
          Téléphonie fixe et mobile
        </h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
            <Image
              alt="logo_solution_logique_informatique"
              src="/assets/telephonie.webp"
              width={400}
              height={300}
            />
          </div>
          <div className="card_informatique_right_side">
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faSignal} />
              <h3>Téléphonie IP</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faServer} />
              <h3>Trunksip</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faSquarePhone}
              />
              <h3>Softphone</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faMobileScreen}
              />
              <h3>Forfait 4G + 5G et mobiles</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon
                className="icons_informatique"
                icon={faEthernet}
              />
              <h3>Opérateur Télécom (fibre, SDSL, ....)</h3>
            </div>
          </div>
        </div>
        <h2 className="informatique_section_title">Connectivité</h2>
        <div className="card_informatique">
          <div className="card_informatique_left_side">
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
              <h3>Accès à Internet</h3>
            </div>
            <div className="informations_informatique">
              <FontAwesomeIcon className="icons_informatique" icon={faWifi} />
              <h3>Accès sans fil - Wifi</h3>
            </div>
          </div>
          <div className="card_informatique_right_side">
            <Image
              alt="logo_solution_logique_informatique"
              src="/assets/connectivité.webp"
              width={400}
              height={300}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

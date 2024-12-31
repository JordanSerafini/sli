import "./ebpcomptabilite.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Ebpcomptabilite() {
  return (
    <div>
      <h1 className="title_ebp">EBP Comptabilité</h1>
      <div className="container ebp_comptabilite">
        <p>
          Bien que la comptabilité soit une discipline universelle, chaque
          activité détient ses propres spécificités : bilan et compte de
          résultat (CSE, associations, etc.), gestion des dons fiscaux, dossiers
          de gestion, etc. Pour répondre au mieux aux exigences de votre
          métier/secteur, choisissez le logiciel de comptabilité qui facilite la
          tenue de votre trésorerie.
        </p>
        <div className="colum_software_compta">
          <div className="colum_software_1">
            <h3 className="title_software">Logiciel Comptabilité ACTIV</h3>
            <div className="description_software">
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Comptabilité générale
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Saisie automatisée
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Tableau de bord
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-comptabilite-activ-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_2">
            <h3 className="title_software">Logiciel Comptabilité PRO</h3>
            <div className="description_software">
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Comptabilité générale
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Saisie automatisée
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Tableau de bord
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Déclaration de TVA
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Gestion des impayés
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-comptabilite-pro-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_3">
            <h3 className="title_software">Logiciel Comptabilité ELITE</h3>
            <div className="description_software">
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Comptabilité générale
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Saisie automatisée
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Tableau de bord
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Déclaration de TVA
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Gestion des impayés
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Ratios financiers
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Personnaliastion du logiciel (fiches, vues, etc.)
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-comptabilite-elite-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ebpcomptabilite;

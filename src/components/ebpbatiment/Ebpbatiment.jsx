import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Ebpbatiment() {
  return (
    <div>
      <h1>EBP Bâtiment</h1>
      <div className="container ebp_comptabilite">
        <p>
        Grâce à notre logiciel de gestion dédié au bâtiment et aux artisans du BTP, faire un devis
n’aura jamais été aussi simple ! Calculez vos prix au plus juste et chiffrez facilement vos
devis. Optimisez votre trésorerie au quotidien en facturant vos clients à l’avancement.
        </p>
        <div className="colum_software_compta">
          <div className="colum_software_1">
            <h3 className="title_software">Logiciel Bâtiment</h3>
            <div className="description_software">
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Gestion des ventes
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Suivi de chantier
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
                  href="assets/ebp-logiciel-batiment-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_2">
            <h3 className="title_software">Logiciel Gestion Bâtiment</h3>
            <div className="description_software">
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Gestion des ventes
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Suivi de chantier
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
                Devis et Factures
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Suivi des règlements
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-gestion-batiment-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_3">
            <h3 className="title_software">Logiciel Expert Bâtiment</h3>
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
                  href="assets/ebp-logiciel-expert-batiment-2022.pdf"
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

export default Ebpbatiment;

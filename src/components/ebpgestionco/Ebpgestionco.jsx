import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function Ebpgestionco() {
  return (
    <div>
      <h1>EBP Gestion commercial</h1>
      <div className="container ebp_comptabilite">
        <p>
          Commerçants, professionnels du bâtiment ou de l’automobile, découvrez
          quel logiciel de devis et facture EBP correspond à votre secteur
          d’activité. Prenant en compte les besoins spécifiques liés à votre
          métier, nos solutions vous assurent de gérer votre entreprise en toute
          sérénité
        </p>
        <div className="colum_software_compta">
          <div className="colum_software_1">
            <h3 className="title_software">
              Logiciel Gestion Commerciale ACTIV
            </h3>
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
                Relances clients
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Synchronisation bancaire
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Récupération des factures fournisseurs
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Accès à la compta automatisée
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Facturation périodique
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Assistance téléphonique
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-gestion-commerciale-activ-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_2">
            <h3 className="title_software">Logiciel Gestion Commerciale PRO</h3>
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
                Relances clients
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Achats et stocks
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
                Statistiques détaillées
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Application mobile EBP - Suivi devis factures
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-gestion-commerciale-pro-2022.pdf"
                  target="blank"
                >
                  En savoir plus ?
                </a>
              </div>
            </div>
          </div>
          <div className="colum_software_3">
            <h3 className="title_software">
              Logiciel Gestion Commerciale ELITE
            </h3>
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
                Relances clients
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Achats et stocks
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
                Statistiques détaillées
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Facturation périodique
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Planification des ressources
              </p>
              <p>
                <FontAwesomeIcon
                  className="comptabilite_icons"
                  icon={faCheck}
                />
                Application mobile EBP - Suivi devis factures
              </p>
              <div className="buttons_ebp">
                <a
                  className="btn_help btn_help_right"
                  href="assets/ebp-logiciel-gestion-commerciale-elite-2022.pdf"
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

export default Ebpgestionco;

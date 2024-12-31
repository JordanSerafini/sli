import "./logicielsebp.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHeart,
  faPeopleGroup,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";

function LogicielsEbp() {
  return (
    <div>
      <div className="profile-card">
        <div className="container">
          <h1 className="heading_logiciels">NOS LOGICIELS EBP </h1>
          <div className="card-grid">
            <div
              className="card card0"
              style={{
                backgroundImage: "url(/assets/compta.webp)",
              }}
            >
              <div className="overlay">
                <div className="content">
                  <h2>Comptabilité</h2>
                  <p>
                    "Optimisez la gestion de votre trésorerie et analysez la
                    santé financière de votre entreprise avec nos logiciels de
                    comptabilité."
                  </p>
                  <Link className="learn-more-btn" to="/ebpcomptabilite">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="card card1"
              style={{ backgroundImage: "url(/assets/gestion-co.webp)" }}
            >
              <div className="overlay">
                <div className="content">
                  <h2>Gestion Commerciale</h2>
                  <p>
                    "Gérez tous les aspects commerciaux de votre entreprise et
                    gagnez en efficacité avec nos logiciels de Gestion
                    Commerciale"
                  </p>
                  <Link className="learn-more-btn" to="/ebpgestionco">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="card card2"
              style={{ backgroundImage: "url(/assets/batiments.webp)" }}
            >
              <div className="overlay">
                <div className="content">
                  <h2>Batiment</h2>
                  <p>
                    "Optimisez la rentabilité de vos chantiers, chiffrez et
                    facturez efficacement et gagnez un temps précieux au
                    quotidien pour vous consacrer pleinement à votre cœur de
                    métier : le chantier !"
                  </p>
                  <Link className="learn-more-btn" to="/ebpbatiment">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="container">
          <h1>NOS FORMATIONS</h1>
          <div className="counter_formations_SLI">
            <div className="cards_statistic">
              <div className="card_statistic">
                <div className="top_card_statistic">
                  <FontAwesomeIcon
                    className="satisfaction_heart"
                    icon={faPeopleGroup}
                  />
                </div>
                <div className="mid_card_statistic">
                  <CountUp end={52} duration={5} />
                </div>
              </div>
              <div className="card_statistic">
                <div className="top_card_statistic">
                  <FontAwesomeIcon
                    className="satisfaction_heart"
                    icon={faClock}
                  />
                </div>
                <div className="mid_card_statistic">
                  <CountUp end={403} duration={6} /> heures
                </div>
              </div>
              <div className="card_statistic">
                <div className="top_card_statistic">
                  <FontAwesomeIcon
                    className="satisfaction_heart"
                    icon={faHeart}
                  />
                </div>
                <div className="mid_card_statistic">
                  <CountUp end={100} duration={7} />%
                </div>
              </div>
            </div>
          </div>
          <div className="form_formations_sli">
            <h2>Prix à la ½ journée</h2>
            <h1>485€</h1>
            <h3>
              Nos formations sont accessibles selon les modalités ci-dessous :
            </h3>
            <h2>Les modalités de formation</h2>
            <div className="forms_sli">
              <div className="group_form_sli">
                <div className="form_sli">
                  <FontAwesomeIcon className="formations_group" icon={faUser} />
                  <h4>Individuel</h4>
                </div>
                <div className="form_sli">
                  <FontAwesomeIcon
                    className="formations_group"
                    icon={faUsers}
                  />
                  <h4>Intra-entreprise (3 max)</h4>
                </div>
              </div>
            </div>
            <div className="formations_place">
              <div className="formations_block">
                <h2>Les formations peuvent avoir lieu :</h2>
                <p>
                  En présentiel, dans les locaux de Solution Logique, Nos locaux
                  peuvent également vous accueillir et sont adaptés aux
                  personnes à mobilité réduite.
                </p>
                <p>En présentiel, dans les locaux de votre entreprise</p>
                <p>
                  En distanciel via Internet en utilisant l’application
                  <span>
                    <a
                      href="https://www.islonline.com/fr/fr/join/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {" "}
                      ISL Online
                    </a>
                  </span>
                </p>
              </div>
              <div className="formations_block">
                <h2>
                  Délais d’accès en formation Intra-entreprise et Individuel :
                </h2>
                <p>
                  Solution Logique vous proposera des dates le plus tôt possible
                  en fonction de vos disponibilités et de celles du formateur
                  pressenti. Pour pouvoir démarrer la formation, votre rapidité
                  de réponse sur toutes les questions administratives permettra
                  d’accélérer le démarrage de votre formation. Vous êtes acteur
                  de votre demande et seul décisionnaire, les délais de
                  traitement sont donc très rapides si une date de formation est
                  déjà fixée.{" "}
                  <Link to="/engagementHandicap">
                    Notre engagement dans le handicap pour en savoir plus
                    cliquez ici.
                  </Link>
                </p>
              </div>

              <div className="formations_block"></div>
              <h2>Modalités de financement</h2>
              <p>
                Plusieurs modes de financement vous permettent d’accéder à nos
                formations en tant que salarié via votre entreprise ou en tant
                que particulier (salarié, demandeur d’emploi ou indépendant). La
                question du financement d’une formation peut s’avérer complexe
                et ramène bien souvent à de nombreux financeurs ou dispositifs.
              </p>
              <div className="formations_block">
                <h2>Les différents organismes financeurs </h2>
                <h3>Les OPCOS</h3>
                <p>
                  Au service des salariés et des entreprises, les OPCO, qui sont
                  des opérateurs de compétences. Pour savoir à quel OPCO est
                  affilié votre entreprise, vous devez connaître votre numéro de
                  convention collective (IDCC) qui figure sur votre bulletin de
                  paie. Trouver votre OPCO.
                </p>
              </div>
              <div className="formations_block">
                <h2>
                  Les FAF (Fonds d’Assurance Formation) pour les indépendants
                </h2>
                <p>- Le FIF PL est le FAF des professions libérales. </p>
                <p>
                  - L’AGEFICE est le FAF du Commerce, de l’Industrie et des
                  Services. Il finance des actions de formation les dirigeants
                  d’entreprise et conjoints collaborateurs ou conjoints
                  associés.
                </p>
              </div>
              <div className="formations_block">
                <h2>Les autres financeurs</h2>
                <p>
                  Les régions, l'Europe, Pole Emploi, l'Agefiph... financent
                  directement ou indirectement, via des partenariats ou des
                  co-financements, de nombreux projets de formation.
                </p>
              </div>
              <div className="logo_qualiopi">
            <img
              alt="logo_solution_logique_informatique"
              src="assets/Logo Qualiopi-300dpi.png"
            ></img>
            <div className="logo_qualiopi_description">
              <p>
                La certification qualité a été délivrée au titre de la ou des
                catégories d'actions suivantes :
              </p>
              <p>ACTIONS DE FORMATION</p>
            </div>
          </div>
            </div>
          </div>
          <div className="card-grid">
            <div
              className="card card0"
              style={{
                backgroundImage: "url(/assets/compta.webp)",
              }}
            >
              <div className="overlay">
                <div className="content">
                  <h2> Formation Comptabilité</h2>
                  <p>
                    <li>
                      {" "}
                      Maîtriser le travail quotidien de la tenue d’une
                      comptabilité : lecture, saisie, lettrage et éditer un état
                      comptable…
                    </li>
                    <li>
                      {" "}
                      Gérer son quotidien comptable : échéancier, relances,
                      comptes à lettrer, imputation de règlement …
                    </li>
                    <li> Suivre sa trésorerie</li>
                  </p>
                  <Link className="learn-more-btn" to="/formationCompta">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="card card1"
              style={{ backgroundImage: "url(/assets/gestion-co.webp)" }}
            >
              <div className="overlay">
                <div className="content">
                  <h2> Formation Gestion Commerciale</h2>
                  <p>
                    <li>
                      Créer, modifier et enrichir ses bases clients, articles,
                      modes de règlement….
                    </li>
                    <li>
                      Créer, modifier et émettre des documents commerciaux :
                      devis, commandes, bons de livraison, factures, avoirs,
                      retours…
                    </li>
                  </p>
                  <Link className="learn-more-btn" to="/formationCommerciale">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="card card2"
              style={{ backgroundImage: "url(/assets/batiments.webp)" }}
            >
              <div className="overlay">
                <div className="content">
                  <h2>Formation Batiment</h2>
                  <p>
                    <li>Maîtriser le chiffrage de son devis de bâtiment</li>
                    <li>Créer et modifier des documents d’achat et de vente</li>
                    <li>
                      Gérer les stocks, le suivi des chantiers et des affaires
                    </li>
                    <li>Gérer le flux financier de son entreprise</li>
                  </p>
                  <Link className="learn-more-btn" to="/formationBatiment">
                    En savoir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="home_conseils_sli">
          <div className="home_conseils_sli_left">
            <img
              className="img_right_side"
              alt="logo_solution_logique_informatique"
              src="assets/assistance.webp"
            ></img>
          </div>
          <div className="home_conseils_sli_right">
            <h1>Nous contacter</h1>
            <h2>Besoin d'une aide en télémaintenance ?</h2>
            <p>
              Accédez à la télémaintenance pour que Solution Logique intervienne
              directement sur votre ordinateur.
            </p>
            <a
              href="https://www.islonline.com/fr/fr/join/"
              className="btn_help btn_help_right"
              target="blank"
            >
              Besoin d'aide ?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogicielsEbp;

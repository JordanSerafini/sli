import "./home.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faPrint,
  faFloppyDisk,
  faPhone,
  faShield,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "react-elastic-carousel";
import Item from "./Item";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Home() {
  return (
    <div className="card_home_page">
      <div className="container">
        <div className="home_container_both">
          <div className="home_container_left_side">
            <div className="left_top_side">
              <img
                className="device_sli"
                alt="logo_solution_logique_informatique"
                src="assets/sli.webp"
              ></img>
            </div>
            <div className="left_bot_side">
              <h1>Bienvenue à Solution Logique</h1>
              <h2>Qui sommes-nous ?</h2>
              <p>
                L’équipe de <span>Solution Logique</span> est à{" "}
                <span>votre écoute</span> pour réaliser vos projets
                informatiques.
              </p>
              <p>
                Depuis <span>plus de 30 ans</span>, nous avons toujours voulu
                marquer <span>notre volonté</span>, d’une forte implantation
                locale en Rhône-Alpes.
              </p>
            </div>
          </div>
          <div className="home_container_right_side">
            <h1>Apporteur de solution informatique</h1>
            <p>
              Intégrateur de solutions complètes et prestataire de services en
              conseils informatiques, nous innovons quotidiennement pour les
              PME, PMI, TPE, indépendants et collectivités.
            </p>
            <img
              className="img_right_side"
              alt="logo_solution_logique_informatique"
              src="assets/solution.webp"
            ></img>
          </div>
        </div>
      </div>
      <div className="home_banner_bot">
        <div className="container">
          <div className="our_expertise">
            <h1>Notre expertise</h1>
            <h2>Découvrez nos solutions</h2>
            <h3>
              Une équipe expérimentée, des collaborateurs diplômés et certifiés,
              une exigence reconnue pour vous assurer une qualité de service
              professionnel. Nos techniciens ont la mission de renforcer la
              performance de votre système informatique et protège votre
              environnement de travail.
            </h3>
          </div>
          <div className="home_services">
            <div className="home_services_card">
              <FontAwesomeIcon
                className="home_services_icon"
                icon={faComputer}
              />
              <h1>Matériels Informatique</h1>
              <p>Optez pour une solution sur mesure</p>
            </div>
            <div className="home_services_card">
              <FontAwesomeIcon className="home_services_icon" icon={faServer} />
              <h1>Virtualisation & Serveur</h1>
              <p>Gérez tout a distance.</p>
            </div>
            <div className="home_services_card">
              <FontAwesomeIcon className="home_services_icon" icon={faPrint} />
              <h1>Système d'impression</h1>
              <p>Mettez-vous à la page</p>
            </div>
            <div className="home_services_card">
              <FontAwesomeIcon
                className="home_services_icon"
                icon={faFloppyDisk}
              />
              <h1>Sauvegarde de données</h1>
              <p>Protégez vos données.</p>
            </div>
            <div className="home_services_card">
              <FontAwesomeIcon className="home_services_icon" icon={faPhone} />
              <h1>Opérateur Télécom</h1>
              <p>Choisissez une téléphonie.</p>
            </div>
            <div className="home_services_card">
              <FontAwesomeIcon className="home_services_icon" icon={faShield} />
              <h1>Sécurité Informatique</h1>
              <p>Protégez votre système.</p>
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
            </a>{" "}
          </div>
        </div>
        <h1>PARTENAIRE ASSOCIATIF :</h1>
      </div>
      <div className="home_carousel_partner">
        <Carousel breakPoints={breakPoints}>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/ebp.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/dell.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/stormshield.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              href=""
              src="assets/3cx.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/vmware.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/lenovo.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/oxatis.webp"
            ></img>
          </Item>
          <Item>
            <img
              className="device_sli"
              alt="logo_solution_logique_informatique"
              src="assets/kyocera.webp"
            ></img>
          </Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Home;

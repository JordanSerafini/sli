import React, { useEffect } from "react";
import "./services.scss";
import $ from "jquery";
import { Link } from "react-router-dom";

function NosServices() {
  useEffect(() => {
    // Ajout des effets de hover avec jQuery
    $(".card").hover(
      function () {
        const vSrc = $(this).find("iframe").data("video");
        const video = $(this).find("iframe");
        video.attr("src", vSrc);
      },
      function () {
        $(this).find("iframe").attr("src", "");
      }
    );

    // Nettoyage pour éviter les fuites mémoire
    return () => {
      $(".card").off("hover");
    };
  }, []);

  return (
    <div className="container">
      <h1 className="heading_logiciels">NOS SERVICES</h1>

      {/* Section principale */}
      <div className="fullscreen">
        {/* Carte Informatique */}
        <div
          className="card card_1"
          style={{
            backgroundImage: "url(/assets/informatique.webp)",
          }}
        >
          <div className="content_services">
            <div className="title">Informatique</div>
            <div className="text">
              Optimisez vos performances avec des solutions informatiques fiables
              et sécurisées.
            </div>
          </div>
          <Link to="/informatique">
            <div className="sinopse">
              <div className="content-sinopse">
                <div className="title">Plus d'informations :</div>
                <div className="text">
                  <ul>
                    <h3>Infrastructure</h3>
                    <li className="second_description">Matériel Informatique</li>
                    <li className="second_description">Serveur de stockage</li>
                    <li className="second_description">Sécurité de l'infra</li>
                    <li className="second_description">Interconnexion de sites</li>
                    <li className="second_description">
                      Virtualisation de l'infrastructure
                    </li>
                    <li className="second_description">Vidéo surveillance</li>

                    <h3>Environnement Utilisateur</h3>
                    <li className="second_description">Post de travail</li>
                    <li className="second_description">Sécurité anti virus</li>
                    <li className="second_description">Outil collaboratif</li>

                    <h3>Hébergement &amp; Cloud</h3>
                    <li className="second_description">Sauvegarde Externalisé</li>
                    <li className="second_description">Sauvegarde sur place</li>
                    <li className="second_description">Hébergement site web</li>
                    <li className="second_description">
                      Hebergement et gestion des boites mails
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Carte Télécom */}
        <div
          className="card card_1"
          style={{
            backgroundImage: "url(/assets/telecom.webp)",
          }}
        >
          <div className="content_services">
            <div className="title">Télécom</div>
            <div className="text">
              Restez connectés grâce à nos solutions télécom innovantes et
              performantes.
            </div>
          </div>
          <Link to="/telecom">
            <div className="sinopse">
              <div className="content-sinopse">
                <div className="title">Plus d'informations :</div>
                <div className="text">
                  <ul>
                    <h3>Téléphonie fixe et mobile</h3>
                    <li className="second_description">Téléphonie IP</li>
                    <li className="second_description">Trunksip</li>
                    <li className="second_description">Softphone</li>
                    <li className="second_description">Forfait 4G et mobile</li>
                    <li className="second_description">
                      Opérateur Télécom (fibre, SDSL, ...)
                    </li>
                    <li className="second_description">Connectivité</li>
                    <li className="second_description">Interconnexion</li>
                    <li className="second_description">Accès à Internet</li>
                    <li className="second_description">Accès sans fil - Wifi</li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Carte Sécurité */}
        <div
          className="card card_1"
          style={{
            backgroundImage: "url(/assets/securite_info.webp)",
          }}
        >
          <div className="content_services">
            <div className="title">Sécurité</div>
            <div className="text">
              Protégez vos données et votre réseau avec nos solutions de sécurité
              avancées.
            </div>
          </div>
          <Link to="/securite">
            <div className="sinopse">
              <div className="content-sinopse">
                <div className="title">Plus d'informations :</div>
                <div className="text">
                  <ul>
                    <h3>Sécurité du SI</h3>
                    <li className="second_description">
                      Sécurité de l'infrastructure
                    </li>
                    <li className="second_description">Sécurité du réseau</li>
                    <li className="second_description">Sécurité des données</li>
                  </ul>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Section contact / télémaintenance */}
      <div className="home_conseils_sli">
        <div className="home_conseils_sli_left">
          <img
            className="img_right_side"
            alt="logo_solution_logique_informatique"
            src="assets/assistance.webp"
          />
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
            rel="noreferrer"
          >
            Besoin d'aide ?
          </a>
        </div>
      </div>
    </div>
  );
}

export default NosServices;

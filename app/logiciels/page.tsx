"use client";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faHeart,
  faPeopleGroup,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import "./logicielsebp.scss";
import React from "react";

function Logiciels() {
  return (
    <div>
      <div className="profile-card">
        <div className="container">
          <h1 className="heading_logiciels">NOS LOGICIELS EBP</h1>
          <div className="card-grid">
            {[
              {
                background: "/assets/compta.webp",
                title: "Comptabilité",
                description:
                  "Optimisez la gestion de votre trésorerie et analysez la santé financière de votre entreprise avec nos logiciels de comptabilité.",
                link: "/ebpcomptabilite",
              },
              {
                background: "/assets/gestion-co.webp",
                title: "Gestion Commerciale",
                description:
                  "Gérez tous les aspects commerciaux de votre entreprise et gagnez en efficacité avec nos logiciels de Gestion Commerciale.",
                link: "/ebpgestionco",
              },
              {
                background: "/assets/batiments.webp",
                title: "Batiment",
                description:
                  "Optimisez la rentabilité de vos chantiers, chiffrez et facturez efficacement et gagnez un temps précieux au quotidien pour vous consacrer pleinement à votre cœur de métier : le chantier !",
                link: "/ebpbatiment",
              },
            ].map((card, index) => (
              <div
                className={`card card${index}`}
                style={{ backgroundImage: `url(${card.background})` }}
                key={index}
              >
                <div className="overlay">
                  <div className="content">
                    <h2>{card.title}</h2>
                    <p>{card.description}</p>
                    <Link href={card.link} className="learn-more-btn">
                      En savoir plus
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="profile-card">
        <div className="container">
          <h1>NOS FORMATIONS</h1>
          <div className="counter_formations_SLI">
            <div className="cards_statistic">
              {[
                { icon: faPeopleGroup, value: 52, duration: 5 },
                { icon: faClock, value: 403, duration: 6, suffix: " heures" },
                { icon: faHeart, value: 100, duration: 7, suffix: "%" },
              ].map((stat, index) => (
                <div className="card_statistic" key={index}>
                  <div className="top_card_statistic">
                    <FontAwesomeIcon
                      className="satisfaction_heart"
                      icon={stat.icon}
                    />
                  </div>
                  <div className="mid_card_statistic">
                    <CountUp
                      end={stat.value}
                      duration={stat.duration}
                      suffix={stat.suffix || ""}
                    />
                  </div>
                </div>
              ))}
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
                {[
                  { icon: faUser, title: "Individuel" },
                  { icon: faUsers, title: "Intra-entreprise (3 max)" },
                ].map((form, index) => (
                  <div className="form_sli" key={index}>
                    <FontAwesomeIcon
                      className="formations_group"
                      icon={form.icon}
                    />
                    <h4>{form.title}</h4>
                  </div>
                ))}
              </div>
            </div>

            <div className="formations_place">
              <div className="formations_block">
                <h2>Les formations peuvent avoir lieu :</h2>
                <p>
                  En présentiel, dans les locaux de Solution Logique, adaptés
                  aux personnes à mobilité réduite.
                </p>
                <p>En présentiel, dans les locaux de votre entreprise.</p>
                <p>
                  En distanciel via Internet avec{" "}
                  <a
                    href="https://www.islonline.com/fr/fr/join/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ISL Online
                  </a>
                </p>
              </div>

              <div className="formations_block">
                <h2>
                  Délais d’accès en formation Intra-entreprise et Individuel :
                </h2>
                <p>
                  Solution Logique vous proposera des dates le plus tôt possible
                  en fonction de vos disponibilités et de celles du formateur.
                </p>
                <Link href="/engagementHandicap">
                  Notre engagement dans le handicap.
                </Link>
              </div>

              <div className="formations_block">
                <h2>Modalités de financement</h2>
                <p>
                  Plusieurs modes de financement vous permettent d’accéder à
                  nos formations, en tant que salarié ou indépendant.
                </p>
              </div>

              <div className="logo_qualiopi">
                <Image
                  alt="logo_solution_logique_informatique"
                  src="/assets/Logo Qualiopi-300dpi.png"
                  width={300}
                  height={150}
                />
                <div className="logo_qualiopi_description">
                  <p>
                    La certification qualité a été délivrée pour les catégories
                    suivantes :
                  </p>
                  <p>ACTIONS DE FORMATION</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Logiciels;

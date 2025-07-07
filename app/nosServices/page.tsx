import "./services.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";

const servicesData = [
  {
    title: "Informatique",
    backgroundImage: "/assets/informatique.webp",
    link: "/informatique",
    description:
      "Optimisez vos performances avec des solutions informatiques fiables et sécurisées.",
    details: [
      {
        category: "Infrastructure",
        items: [
          "Matériel Informatique",
          "Serveur de stockage",
          "Sécurité de l'infrastructure",
          "Interconnexion de sites",
          "Virtualisation de l'infrastructure",
          "Vidéo surveillance",
        ],
      },
      {
        category: "Environnement Utilisateur",
        items: ["Poste de travail", "Sécurité antivirus", "Outil collaboratif"],
      },
      {
        category: "Hébergement & Cloud",
        items: [
          "Sauvegarde Externalisée",
          "Sauvegarde sur place",
          "Hébergement site web",
          "Hébergement et gestion des boîtes mails",
        ],
      },
    ],
  },
  {
    title: "Télécom",
    backgroundImage: "/assets/telecom.webp",
    link: "/telecom",
    description:
      "Restez connectés grâce à nos solutions télécom innovantes et performantes.",
    details: [
      {
        category: "Téléphonie fixe et mobile",
        items: [
          "Téléphonie IP",
          "Trunksip",
          "Softphone",
          "Forfait 4G et mobile",
          "Opérateur Télécom (fibre, SDSL, ...)",
        ],
      },
      {
        category: "Connectivité",
        items: ["Interconnexion", "Accès à Internet", "Accès sans fil - Wifi"],
      },
    ],
  },
  {
    title: "Sécurité",
    backgroundImage: "/assets/securite_info.webp",
    link: "/securite",
    description:
      "Protégez vos données et votre réseau avec nos solutions de sécurité avancées.",
    details: [
      {
        category: "Sécurité du SI",
        items: [
          "Sécurité de l'infrastructure",
          "Sécurité du réseau",
          "Sécurité des données",
        ],
      },
    ],
  },
];

function NosServices() {
  return (
    <div className="container mt-16">
      <h1 className="heading_logiciels">NOS SERVICES</h1>
      <div className="fullscreen">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundImage: `url(${service.backgroundImage})` }}
          >
            <div className="content_services">
              <div className="title">{service.title}</div>
              <div className="text">{service.description}</div>
            </div>
            <Link href={service.link}>
              <div className="sinopse">
                <div className="content-sinopse">
                  <div className="title">Plus d&apos;informations :</div>
                  <div className="text">
                    {service.details.map((detail, i) => (
                      <div key={i}>
                        <h3>{detail.category}</h3>
                        <ul>
                          {detail.items.map((item, j) => (
                            <li key={j} className="second_description">
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      <div className="home_conseils_sli">
        <div className="home_conseils_sli_left">
          <Image
            alt="logo_solution_logique_informatique"
            src="/assets/assistance.webp"
            width={400}
            height={300}
          />
        </div>
        <div className="home_conseils_sli_right">
          <h1>Nous contacter</h1>
          <h2>Besoin d&apos;une aide en télémaintenance ?</h2>
          <p>
            Accédez à la télémaintenance pour que Solution Logique intervienne
            directement sur votre ordinateur.
          </p>
          <Link href="/telemaintenance" className="btn_help btn_help_right">
            Télémaintenance
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NosServices;

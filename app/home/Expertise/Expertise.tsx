import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faPrint,
  faFloppyDisk,
  faPhone,
  faShield,
} from "@fortawesome/free-solid-svg-icons";

function Expertise() {
  const services = [
    {
      icon: faComputer,
      title: "Matériels Informatique",
      text: "Optez pour une solution sur mesure",
    },
    {
      icon: faServer,
      title: "Virtualisation & Serveur",
      text: "Optimisez votre productivité.",
    },
    {
      icon: faPrint,
      title: "Système d'impression",
      text: "Mettez-vous à la page",
    },
    {
      icon: faFloppyDisk,
      title: "Sauvegarde de données",
      text: "Protégez vos données.",
    },
    {
      icon: faPhone,
      title: "Opérateur Télécom",
      text: "Choisissez une téléphonie.",
    },
    {
      icon: faShield,
      title: "Sécurité Informatique",
      text: "Protégez votre système.",
    },
  ];

  return (
    <div className="bg-gradient-to-r from-[#04a2df] to-[#00ceff] text-white text-center py-10">
      <div className="container mx-auto">
        {/* Header Section - our_expertise */}
        <section className="mb-8">
          <h1 className="text-white text-[2.5em]">
            Notre expertise
          </h1>
          <h2 className="pb-[30px] text-[2em]">
            Découvrez nos solutions
          </h2>
          <h3 className="mx-5 text-[1.2em]">
            Une équipe expérimentée, des collaborateurs diplômés et certifiés,
            une exigence reconnue pour vous assurer une qualité de service
            professionnel. Nos techniciens ont la mission de renforcer la
            performance de votre système informatique et de protéger votre
            environnement de travail.
          </h3>
        </section>

        {/* Services Section - home_services */}
        <section className="flex flex-wrap justify-around max-[414px]:flex-col max-[414px]:items-center">
          {services.map((service, index) => (
            <div 
              key={index}
              className="mx-5 my-5 text-white text-center max-w-[300px]"
            >
              <FontAwesomeIcon
                className="text-[3em] cursor-pointer text-white transition-transform duration-300 hover:scale-125"
                icon={service.icon}
              />
              <h1 className="text-[1.5em] py-[15px] px-0">
                {service.title}
              </h1>
              <p className="text-[1em]">
                {service.text}
              </p>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export default Expertise;
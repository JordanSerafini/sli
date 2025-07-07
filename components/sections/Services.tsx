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
import { Card, CardContent } from "@/components/ui/Card";
import Section from "@/components/ui/Section";

function Services() {
  const services = [
    {
      icon: faComputer,
      title: "Matériels Informatique",
      text: "Optez pour une solution sur mesure",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: faServer,
      title: "Virtualisation & Serveur",
      text: "Optimisez votre productivité",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: faPrint,
      title: "Système d'impression",
      text: "Mettez-vous à la page",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: faFloppyDisk,
      title: "Sauvegarde de données",
      text: "Protégez vos données",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: faPhone,
      title: "Opérateur Télécom",
      text: "Choisissez une téléphonie",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: faShield,
      title: "Sécurité Informatique",
      text: "Protégez votre système",
      color: "from-green-500 to-green-600"
    },
  ];

  return (
    <Section 
      background="gradient" 
      padding="xl" 
      className="text-white"
      containerSize="xl"
    >
      <div className="text-center space-y-6 mb-16">
        <h2 className="text-4xl lg:text-5xl font-bold">
          Notre expertise
        </h2>
        <h3 className="text-xl lg:text-2xl text-blue-100 font-medium">
          Découvrez nos solutions
        </h3>
        <p className="text-lg text-blue-100 leading-relaxed max-w-4xl mx-auto">
          Une équipe expérimentée, des collaborateurs diplômés et certifiés,
          une exigence reconnue pour vous assurer une qualité de service
          professionnel. Nos techniciens ont la mission de renforcer la
          performance de votre système informatique et de protéger votre
          environnement de travail.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card 
            key={index}
            className="group bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <CardContent className="p-8 text-center space-y-6">
              {/* Icon avec gradient background */}
              <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <FontAwesomeIcon
                  icon={service.icon}
                  className="text-2xl text-white"
                />
              </div>
              
              {/* Title */}
              <h4 className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors">
                {service.title}
              </h4>
              
              {/* Description */}
              <p className="text-blue-100 leading-relaxed">
                {service.text}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Section>
  );
}

export default Services; 
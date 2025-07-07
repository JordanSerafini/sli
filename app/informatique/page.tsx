"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComputer,
  faServer,
  faSitemap,
  faNetworkWired,
  faHouseLaptop,
  faShieldVirus,
  faTimeline,
  faPeopleGroup,
  faFloppyDisk,
  faCloud,
  faEnvelopesBulk,
  faWindowClose,
  faCloudArrowUp,
  faChevronLeft,
  faChevronRight,
  faCircle
} from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";

const servicesData = [
  {
    id: "infrastructure",
    title: "Infrastructure",
    image: "/assets/infrastructure.webp",
    description: "Solutions complètes pour votre infrastructure informatique avec du matériel performant et des serveurs sécurisés.",
    services: [
      { 
        icon: faComputer, 
        title: "Matériel Informatique",
        detail: "Ordinateurs, périphériques et équipements informatiques de dernière génération"
      },
      { 
        icon: faServer, 
        title: "Serveur et stockage",
        detail: "Solutions serveurs haute performance et systèmes de stockage sécurisés"
      },
      { 
        icon: faSitemap, 
        title: "Interconnexion de sites",
        detail: "Connexion sécurisée entre vos différents sites et bureaux"
      },
      { 
        icon: faNetworkWired, 
        title: "Virtualisation de l'infrastructure",
        detail: "Optimisation des ressources grâce à la virtualisation avancée"
      },
    ]
  },
  {
    id: "environnement",
    title: "Environnement utilisateur",
    image: "/assets/environnement.webp",
    description: "Un environnement de travail optimisé et sécurisé pour vos équipes avec des outils collaboratifs modernes.",
    services: [
      { 
        icon: faHouseLaptop, 
        title: "Poste de travail",
        detail: "Configuration et optimisation des postes de travail pour une productivité maximale"
      },
      { 
        icon: faShieldVirus, 
        title: "Sécurité Antivirus",
        detail: "Protection avancée contre les virus et logiciels malveillants"
      },
      { 
        icon: faTimeline, 
        title: "Gestion des accès",
        detail: "Contrôle sécurisé des accès et authentification des utilisateurs"
      },
      { 
        icon: faPeopleGroup, 
        title: "Outils Collaboratif",
        detail: "Solutions de collaboration moderne pour optimiser le travail d'équipe"
      },
    ]
  },
  {
    id: "hebergement",
    title: "Hébergement & Cloud",
    image: "/assets/hebergement.webp",
    description: "Solutions cloud complètes avec sauvegarde automatique et hébergement web professionnel.",
    services: [
      { 
        icon: faCloudArrowUp, 
        title: "Sauvegarde externalisé",
        detail: "Sauvegarde automatique et sécurisée de vos données dans le cloud"
      },
      { 
        icon: faFloppyDisk, 
        title: "Sauvegarde sur place",
        detail: "Solutions de sauvegarde locale pour une récupération rapide"
      },
      { 
        icon: faWindowClose, 
        title: "Hébergement de site web",
        detail: "Hébergement web haute performance pour vos sites et applications"
      },
      { 
        icon: faEnvelopesBulk, 
        title: "Hébergement et gestion des boites mails",
        detail: "Solutions de messagerie professionnelle complètes et sécurisées"
      },
      { 
        icon: faCloud, 
        title: "Stockage de données sur le cloud",
        detail: "Stockage cloud évolutif et accessible depuis n'importe où"
      },
    ]
  }
];

function Informatique() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % servicesData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % servicesData.length);
    setIsAutoPlay(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + servicesData.length) % servicesData.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const currentService = servicesData[currentSlide];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mb-12">
      <h1 className="text-center text-4xl lg:text-5xl font-bold text-blue-600 pb-8">
        SOLUTIONS INFORMATIQUES
      </h1>
      
      {/* Mode Carrousel */}
      <div className="relative w-full max-w-6xl mx-auto my-12 p-6 bg-gradient-to-br from-white/90 to-blue-50/80 rounded-3xl shadow-2xl overflow-hidden">
        {/* Navigation Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between pointer-events-none z-10">
          <button 
            className="pointer-events-auto bg-blue-500/90 hover:bg-blue-600 border-none rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center text-white text-lg lg:text-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg ml-5 backdrop-blur-sm"
            onClick={prevSlide}
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
          <button 
            className="pointer-events-auto bg-blue-500/90 hover:bg-blue-600 border-none rounded-full w-12 h-12 lg:w-14 lg:h-14 flex items-center justify-center text-white text-lg lg:text-xl cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-lg mr-5 backdrop-blur-sm"
            onClick={nextSlide}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center gap-4 mb-8">
          {servicesData.map((_, index) => (
            <button
              key={index}
              className="bg-none border-none cursor-pointer transition-all duration-300"
              onClick={() => goToSlide(index)}
            >
              <FontAwesomeIcon 
                icon={faCircle} 
                className={`text-xs transition-all duration-300 ${
                  index === currentSlide 
                    ? 'text-blue-600 scale-125' 
                    : 'text-blue-300 hover:text-blue-500 hover:scale-110'
                }`}
              />
            </button>
          ))}
        </div>

        {/* Current Slide Content */}
        <div className="text-center">
          <h2 className="text-center text-3xl lg:text-4xl font-bold text-blue-600 pt-12 pb-6 uppercase animate-fadeIn">
            {currentService.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed">
            {currentService.description}
          </p>
          
          <div className="mt-10 bg-white rounded-2xl overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-1/2 p-6">
                <Image
                  alt={`Solution Logique - ${currentService.title}`}
                  src={currentService.image}
                  width={500}
                  height={400}
                  className="w-full rounded-2xl transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="w-full lg:w-1/2 p-8">
                <div className="grid gap-6">
                  {currentService.services.map((item, index) => (
                    <div 
                      key={index} 
                      className="flex items-start gap-5 p-5 bg-gradient-to-r from-blue-50 to-sky-50 rounded-xl transition-all duration-300 hover:translate-x-2 hover:from-blue-100 hover:to-sky-100 border-l-4 border-transparent hover:border-blue-500"
                    >
                      <div className="flex-shrink-0 w-15 h-15 bg-gradient-to-br from-blue-500 to-sky-500 rounded-xl flex items-center justify-center shadow-lg">
                        <FontAwesomeIcon 
                          className="text-white text-xl" 
                          icon={item.icon} 
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-blue-600 text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-blue-200 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-500 to-sky-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / servicesData.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16 p-10 bg-gradient-to-br from-blue-50/50 to-sky-50/50 rounded-2xl border border-blue-100">
        <h3 className="text-blue-600 text-2xl lg:text-3xl font-semibold mb-4">
          Besoin d'une solution sur mesure ?
        </h3>
        <p className="text-gray-600 text-lg mb-6 max-w-3xl mx-auto">
          Nos experts sont là pour vous conseiller et adapter nos services à vos besoins spécifiques.
        </p>
        <button className="bg-gradient-to-r from-blue-500 to-sky-500 text-white border-none px-8 py-4 rounded-lg text-lg font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
          Nous contacter
        </button>
      </div>
    </div>
  );
}

export default Informatique;
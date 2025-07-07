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
  faGraduationCap,
  faAward,
  faCertificate,
  faLaptopCode,
  faHandshake,
  faMapMarkerAlt,
  faMoneyBillWave,
  faCalendarAlt
} from "@fortawesome/free-solid-svg-icons";
import CountUp from "react-countup";
import React, { useState, useEffect } from "react";

function Logiciels() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div>
      {/* Section Logiciels EBP */}
      <div className="flex items-center justify-center py-12 px-4">
        <div className="max-w-6xl w-full">
          <h1 className="text-center text-4xl lg:text-5xl font-bold text-blue-600 pb-12">
            NOS LOGICIELS EBP
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="relative overflow-hidden bg-white shadow-xl rounded-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl group"
                style={{ 
                  backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${card.background})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '400px'
                }}
                key={index}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/20 transition-all duration-300" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6 text-white">
                  <h2 className="text-2xl font-bold mb-3">{card.title}</h2>
                  <p className="text-sm opacity-90 mb-4 line-clamp-3">{card.description}</p>
                  <Link 
                    href={card.link} 
                    className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 self-start"
                  >
                    En savoir plus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section Formation Améliorée */}
      <div className="bg-gradient-to-br from-slate-50 to-blue-50/30 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header de la section formation */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="text-center lg:text-left">
              <div className="flex justify-center lg:justify-start mb-6">
                <FontAwesomeIcon 
                  icon={faGraduationCap} 
                  className="text-6xl text-blue-500 animate-bounce"
                />
              </div>
              <h1 className={`text-4xl lg:text-5xl font-bold text-blue-600 mb-4 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}>
                NOS FORMATIONS EBP
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Maîtrisez vos logiciels EBP grâce à nos formations certifiées Qualiopi
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src="/assets/formations_ebp.webp"
                alt="Formations EBP - Solution Logique"
                width={400}
                height={300}
                className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              />
            </div>
          </div>

          {/* Statistiques animées */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-12">
              Nos résultats parlent d'eux-mêmes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { 
                  icon: faPeopleGroup, 
                  value: 52, 
                  duration: 5, 
                  label: "Stagiaires formés",
                  description: "Des professionnels accompagnés"
                },
                { 
                  icon: faClock, 
                  value: 403, 
                  duration: 6, 
                  suffix: "h", 
                  label: "Heures de formation",
                  description: "D'expertise partagée"
                },
                { 
                  icon: faHeart, 
                  value: 100, 
                  duration: 7, 
                  suffix: "%", 
                  label: "Satisfaction client",
                  description: "Un taux de satisfaction exceptionnel"
                },
                { 
                  icon: faAward, 
                  value: 15, 
                  duration: 4, 
                  suffix: "+", 
                  label: "Années d'expérience",
                  description: "Au service de votre réussite"
                },
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:-translate-y-2 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}
                  style={{animationDelay: `${index * 0.2}s`}}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <FontAwesomeIcon icon={stat.icon} className="text-white text-2xl" />
                  </div>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    <CountUp
                      end={stat.value}
                      duration={stat.duration}
                      suffix={stat.suffix || ""}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{stat.label}</h3>
                  <p className="text-sm text-gray-600">{stat.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section prix et modalités */}
          <div className="mb-16 flex justify-center">
            <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md w-full border-2 border-blue-100 hover:border-blue-300 transition-colors duration-300">
              <div className="text-center mb-6">
                <FontAwesomeIcon icon={faMoneyBillWave} className="text-4xl text-blue-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Formation ½ journée</h2>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl text-blue-500 font-semibold">€</span>
                  <span className="text-5xl font-bold text-blue-600">485</span>
                  <span className="text-lg text-gray-500">/ session</span>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { icon: faUser, text: "Formation individuelle personnalisée" },
                  { icon: faUsers, text: "Intra-entreprise (3 participants max)" },
                  { icon: faCertificate, text: "Certification Qualiopi" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <FontAwesomeIcon icon={feature.icon} className="text-blue-500 text-lg" />
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Modalités de formation */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center text-blue-600 mb-12 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faLaptopCode} />
              Modalités de formation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: faMapMarkerAlt,
                  title: "Où ?",
                  items: ["Dans nos locaux adaptés PMR", "Dans votre entreprise", "En distanciel via ISL Online"]
                },
                {
                  icon: faCalendarAlt,
                  title: "Quand ?",
                  items: ["Planification selon vos disponibilités", "Délais réduits", "Flexibilité maximale"]
                },
                {
                  icon: faHandshake,
                  title: "Financement",
                  items: ["Prise en charge OPCO", "CPF (Compte Personnel de Formation)", "Financement entreprise"]
                }
              ].map((modality, index) => (
                <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={modality.icon} className="text-white text-2xl" />
                    </div>
                    <h3 className="text-xl font-bold text-blue-600">{modality.title}</h3>
                  </div>
                  <ul className="space-y-3">
                    {modality.items.map((item, idx) => (
                      <li key={idx} className="text-gray-600 text-sm leading-relaxed flex items-start gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Section Qualiopi réduite */}
          <div className="mb-16">
            <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">Formation certifiée Qualiopi</h3>
                <p className="text-gray-600 mb-2">La certification qualité a été délivrée pour les catégories suivantes :</p>
                <p className="font-semibold text-gray-800 mb-4">ACTIONS DE FORMATION</p>
                <Link 
                  href="/engagementHandicap" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300"
                >
                  <FontAwesomeIcon icon={faHandshake} />
                  Notre engagement dans le handicap
                </Link>
              </div>
              <div className="flex-shrink-0">
                <Image
                  alt="Certification Qualiopi - Solution Logique"
                  src="/assets/Logo Qualiopi-300dpi.png"
                  width={200}
                  height={100}
                  className="hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center p-10 bg-gradient-to-r from-blue-600 to-sky-600 rounded-3xl text-white">
            <h2 className="text-3xl font-bold mb-4">Prêt à développer vos compétences ?</h2>
            <p className="text-lg mb-8 opacity-90">
              Nos formateurs experts vous accompagnent dans la maîtrise de vos logiciels EBP
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/contact" 
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                Demander un devis
              </Link>
              <Link 
                href="/formationCommerciale" 
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 hover:-translate-y-1"
              >
                Voir nos programmes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Logiciels;

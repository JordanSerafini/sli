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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Titre principal */}
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16 text-gradient">
        NOS SERVICES
      </h1>
      
      {/* Grille des cartes de services */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
        {servicesData.map((service, index) => (
          <div
            key={index}
            className="group relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            {/* Image de fond */}
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${service.backgroundImage})` }}
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/90 group-hover:via-black/50 transition-all duration-500" />
            
            {/* Contenu principal */}
            <div className="relative h-full flex flex-col justify-end p-6 text-white">
              <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-200 text-sm leading-relaxed overflow-hidden transition-all duration-300" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical'
                }}>
                  {service.description}
                </p>
              </div>
            </div>

            {/* Overlay détails au hover */}
            <Link href={service.link} className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/95 via-blue-800/85 to-blue-700/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-6 text-white overflow-y-auto">
                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                  <h4 className="text-xl font-semibold mb-4 text-cyan-300 border-b border-cyan-300/30 pb-2">
                    Plus d&apos;informations :
                  </h4>
                  
                  <div className="space-y-4">
                    {service.details.map((detail, i) => (
                      <div key={i} className="space-y-2">
                        <h5 className="font-semibold text-cyan-200 text-sm uppercase tracking-wide">
                          {detail.category}
                        </h5>
                        <ul className="space-y-1">
                          {detail.items.map((item, j) => (
                            <li key={j} className="flex items-start text-sm text-gray-200">
                              <svg className="w-3 h-3 text-cyan-400 mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  
                  {/* Bouton d'action */}
                  <div className="mt-6 pt-4 border-t border-cyan-300/30">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg">
                      En savoir plus
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Section Télémaintenance - Design moderne */}
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 rounded-2xl p-8 md:p-12 shadow-xl border border-slate-200/50 mt-16">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Image à gauche */}
          <div className="flex-shrink-0 lg:w-1/2">
            <div className="relative overflow-hidden rounded-xl shadow-lg group">
              <Image
                alt="Assistance télémaintenance Solution Logique"
                src="/assets/assistance.webp"
                width={500}
                height={350}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Contenu à droite */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Support technique instantané
            </div>

            {/* Titre principal */}
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-gradient">
                Nous contacter
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-700">
                Besoin d&apos;une aide en télémaintenance ?
              </h3>
            </div>

            {/* Description */}
            <p className="text-slate-600 text-lg leading-relaxed max-w-2xl">
              Accédez à notre service de télémaintenance pour que nos experts Solution Logique 
              interviennent directement et sécurisement sur votre ordinateur. 
              <span className="font-medium text-slate-700">Support immédiat et personnalisé.</span>
            </p>

            {/* Avantages */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
              <div className="flex items-center text-slate-600">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Connexion sécurisée</span>
              </div>
              <div className="flex items-center text-slate-600">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Support en temps réel</span>
              </div>
              <div className="flex items-center text-slate-600">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Résolution rapide</span>
              </div>
              <div className="flex items-center text-slate-600">
                <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>Expertise certifiée</span>
              </div>
            </div>

            {/* Bouton d'action */}
            <div className="pt-4">
              <Link 
                href="/telemaintenance" 
                className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-2 border-transparent hover:border-white/20"
              >
                <svg className="w-6 h-6 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Accéder à la télémaintenance
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Contact alternatif */}
            <div className="pt-6 border-t border-slate-200">
              <p className="text-sm text-slate-500 mb-3">Besoin d&apos;une autre forme de support ?</p>
              <div className="flex flex-wrap gap-3">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Nous écrire
                </Link>
                <span className="text-slate-300">•</span>
                <a 
                  href="tel:+33123456789" 
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Nous appeler
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NosServices;

"use client";

import React, { useState } from "react";
import { ModernSection, ServiceCard } from "@/components/ui";
import { ModernButton } from "@/components/ui/modernButton";
import { 
  Phone, 
  Smartphone, 
  Wifi, 
  Router, 
  Network, 
  Signal,
  Headphones,
  ArrowRight,
  CheckCircle,
  Users,
  Clock
} from "lucide-react";

const telecomServices = [
  {
    id: "telephonie",
    title: "Téléphonie fixe et mobile",
    description: "Solutions complètes de téléphonie moderne pour optimiser vos communications d'entreprise avec la technologie IP.",
    image: "/assets/telephonie.webp",
    features: [
      "Téléphonie IP moderne et évolutive",
      "Trunks SIP haute qualité",
      "Applications softphone mobiles",
      "Forfaits 4G et 5G professionnels",
      "Solutions multi-sites intégrées"
    ],
    benefits: [
      "Réduction des coûts",
      "Mobilité accrue",
      "Qualité premium"
    ]
  },
  {
    id: "connectivite",
    title: "Connectivité et réseaux",
    description: "Infrastructure réseau professionnelle pour assurer une connectivité optimale et sécurisée entre tous vos sites.",
    image: "/assets/connectivité.webp",
    features: [
      "Interconnexion de sites sécurisée",
      "Accès Internet haute performance",
      "Réseaux WiFi professionnels",
      "Fibre optique et SDSL",
      "Redondance et haute disponibilité"
    ],
    benefits: [
      "Performance garantie",
      "Sécurité renforcée",
      "Évolutivité"
    ]
  }
];

const operatorPartners = [
  { name: "Orange", description: "Fibre et solutions mobiles" },
  { name: "SFR", description: "Connectivité entreprise" },
  { name: "Bouygues", description: "Réseaux et téléphonie" },
  { name: "Free Pro", description: "Solutions économiques" }
];

const statsData = [
  { value: "99.9%", label: "Disponibilité réseau", icon: <Signal /> },
  { value: "8h30-17h30", label: "Support technique", icon: <Headphones /> },
  { value: "200+", label: "Entreprises connectées", icon: <Users /> },
  { value: "<4h ", label: "Temps d'intervention (en heures ouvrées)", icon: <Clock /> }
];

const telecomSolutions = [
  {
    icon: <Phone />,
    title: "Téléphonie IP",
    description: "Système téléphonique moderne basé sur IP avec fonctionnalités avancées"
  },
  {
    icon: <Router />,
    title: "Trunk SIP",
    description: "Liaisons SIP professionnelles pour optimiser vos communications"
  },
  {
    icon: <Smartphone />,
    title: "Softphone",
    description: "Applications mobiles pour téléphoner depuis n'importe où"
  },
  {
    icon: <Signal />,
    title: "4G/5G Pro",
    description: "Forfaits mobiles professionnels avec data illimitée"
  },
  {
    icon: <Network />,
    title: "Interconnexion",
    description: "Liaison sécurisée entre vos différents sites d'entreprise"
  },
  {
    icon: <Wifi />,
    title: "WiFi Pro",
    description: "Réseaux sans fil professionnels haute performance et sécurisés"
  }
];

export default function Telecom() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ModernSection background="gradient" padding="lg" className="relative">
        <div className="absolute inset-0 bg-[url('/assets/telecom.webp')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-8">
            <Signal className="w-4 h-4 mr-2" />
            Solutions télécom professionnelles
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Solutions
            <span className="block bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Télécom
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Optimisez vos communications d'entreprise avec nos solutions télécom modernes. 
            Téléphonie IP, connectivité haut débit et réseaux sécurisés.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ModernButton 
              href="/contact"
              variant="accent" 
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
            >
              Demander un devis
            </ModernButton>
            
            <ModernButton 
              href="tel:0450640233"
              variant="secondary" 
              size="lg"
              icon={<Phone />}
              iconPosition="left"
            >
              04 50 64 02 33
            </ModernButton>
          </div>
        </div>
      </ModernSection>

      {/* Stats Section */}
      <ModernSection background="white" padding="md">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4 group-hover:bg-green-600 transition-colors duration-300">
                <div className="text-green-600 group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* Solutions Grid */}
      <ModernSection background="gray" padding="lg">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Nos solutions télécom
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Des technologies modernes pour optimiser vos communications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {telecomSolutions.map((solution, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-2xl mb-4">
                <div className="text-green-600">
                  {solution.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
              <p className="text-slate-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Services */}
        <div className="grid lg:grid-cols-2 gap-6">
          {telecomServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              features={service.features}
              variant={activeService === index ? "featured" : "default"}
              className="cursor-pointer"
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
      </ModernSection>

      {/* Detailed Service View */}
      <ModernSection background="white" padding="lg">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                <Signal className="w-4 h-4 mr-2" />
                Service en détail
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {telecomServices[activeService].title}
              </h3>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {telecomServices[activeService].description}
              </p>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {telecomServices[activeService].benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <ModernButton 
                href="/contact"
                variant="accent"
                size="lg"
              >
                Demander un devis
              </ModernButton>
            </div>

            <div className="space-y-3">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                Fonctionnalités incluses
              </h4>
              {telecomServices[activeService].features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white transition-colors duration-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModernSection>

      {/* Partners Section */}
      <ModernSection background="gray" padding="md">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Nos partenaires opérateurs
          </h3>
          <p className="text-slate-600">
            Nous collaborons avec les meilleurs opérateurs français
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {operatorPartners.map((partner, index) => (
            <div key={index} className="bg-white p-6 rounded-xl text-center shadow-sm hover:shadow-lg transition-all duration-300 group">
              <div className="text-xl font-bold text-slate-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                {partner.name}
              </div>
              <p className="text-slate-600 text-sm">{partner.description}</p>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* CTA Section */}
      <ModernSection background="dark" padding="lg">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Optimisez vos communications
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Contactez nos experts télécom pour un audit gratuit et découvrez comment réduire 
            vos coûts tout en améliorant vos communications.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-stretch">
            <ModernButton 
              href="/contact"
              variant="accent" 
              size="lg"
              icon={<ArrowRight />}
              iconPosition="right"
              className="min-w-[200px] h-12"
            >
              Consultation gratuite
            </ModernButton>
            <ModernButton 
              href="tel:0450640233"
              variant="secondary" 
              size="lg"
              icon={<Phone />}
              iconPosition="left"
              className="min-w-[200px] h-12"
            >
              04 50 64 02 33
            </ModernButton>
          </div>
        </div>
      </ModernSection>
    </main>
  );
}

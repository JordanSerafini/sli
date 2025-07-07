"use client";

import { useState } from "react";
import { ModernSection, ServiceCard } from "@/components/ui";
import { 
  Shield, 
  Lock, 
  Eye, 
  AlertTriangle, 
  ShieldCheck, 
  Server,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Zap
} from "lucide-react";

const securityServices = [
  {
    id: "infrastructure",
    title: "Sécurité de l'Infrastructure",
    description: "Protection complète de votre infrastructure IT contre les menaces internes et externes avec des solutions de pointe.",
    image: "/assets/securite.webp",
    features: [
      "Pare-feu nouvelle génération (NGFW)",
      "Protection contre les intrusions (IPS/IDS)",
      "Sécurisation des serveurs et postes",
      "Monitoring de sécurité 24/7",
      "Audits de sécurité réguliers"
    ],
    benefits: [
      "Protection maximale",
      "Détection proactive",
      "Conformité assurée"
    ]
  },
  {
    id: "reseau",
    title: "Sécurité du Réseau",
    description: "Sécurisation avancée de vos réseaux avec segmentation, filtrage et surveillance en temps réel des flux de données.",
    image: "/assets/securite_info.webp",
    features: [
      "Segmentation réseau avancée",
      "VPN sécurisés site à site",
      "Filtrage web et contrôle d'accès",
      "WiFi d'entreprise sécurisé",
      "Analyse comportementale du trafic"
    ],
    benefits: [
      "Isolation des menaces",
      "Accès contrôlé",
      "Visibilité totale"
    ]
  },
  {
    id: "donnees",
    title: "Sécurité des Données",
    description: "Protection et chiffrement de vos données sensibles avec sauvegarde sécurisée et plan de continuité d'activité.",
    image: "/assets/cloud.webp",
    features: [
      "Chiffrement des données sensibles",
      "Sauvegarde sécurisée externalisée",
      "Plan de reprise d'activité (PRA)",
      "Contrôle des accès granulaire",
      "Archivage sécurisé long terme"
    ],
    benefits: [
      "Données protégées",
      "Récupération rapide",
      "Conformité RGPD"
    ]
  }
];

const securitySolutions = [
  {
    icon: <Shield />,
    title: "Pare-feu NGFW",
    description: "Protection réseau avancée avec inspection approfondie des paquets"
  },
  {
    icon: <Eye />,
    title: "SIEM/SOC",
    description: "Surveillance et analyse des événements de sécurité en temps réel"
  },
  {
    icon: <Lock />,
    title: "Chiffrement",
    description: "Protection des données en transit et au repos"
  },
  {
    icon: <AlertTriangle />,
    title: "Antivirus Pro",
    description: "Protection endpoint avancée contre les malwares"
  },
  {
    icon: <ShieldCheck />,
    title: "DLP",
    description: "Prévention de la fuite de données sensibles"
  },
  {
    icon: <Server />,
    title: "Sauvegarde",
    description: "Solutions de sauvegarde et récupération sécurisées"
  }
];

const statsData = [
  { value: "99.9%", label: "Disponibilité", icon: <TrendingUp /> },
  { value: "24/7", label: "Monitoring", icon: <Eye /> },
  { value: "0", label: "Failles majeures", icon: <Shield /> },
  { value: "<15min", label: "Temps de réaction", icon: <Zap /> }
];

const threatTypes = [
  {
    name: "Ransomware",
    description: "Protection contre le chiffrement malveillant",
    risk: "Critique"
  },
  {
    name: "Phishing",
    description: "Détection des tentatives d'hameçonnage",
    risk: "Élevé"
  },
  {
    name: "Malware",
    description: "Blocage des logiciels malveillants",
    risk: "Élevé"
  },
  {
    name: "Intrusion",
    description: "Prévention des accès non autorisés",
    risk: "Critique"
  }
];

export default function Securite() {
  const [activeService, setActiveService] = useState(0);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ModernSection background="gradient" padding="2xl" className="relative">
        <div className="absolute inset-0 bg-[url('/assets/securite.webp')] bg-cover bg-center opacity-10" />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-8">
            <Shield className="w-4 h-4 mr-2" />
            Solutions de cybersécurité
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
            Solutions
            <span className="block bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
              Sécurité
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            Protégez votre entreprise contre les cybermenaces avec nos solutions de sécurité avancées. 
            Infrastructure, réseaux et données sécurisés.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center">
              Audit de sécurité gratuit
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            
            <button className="bg-white/90 backdrop-blur text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-lg">
              Plan de sécurité
            </button>
          </div>
        </div>
      </ModernSection>

      {/* Stats Section */}
      <ModernSection background="white" padding="lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4 group-hover:bg-red-600 transition-colors duration-300">
                <div className="text-red-600 group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* Threats Section */}
      <ModernSection background="gray" padding="lg">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Menaces courantes
          </h2>
          <p className="text-slate-600">
            Nous vous protégeons contre les principales cybermenaces
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {threatTypes.map((threat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
              <div className={`inline-flex px-3 py-1 rounded-full text-xs font-medium mb-3 ${
                threat.risk === 'Critique' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {threat.risk}
              </div>
              <h3 className="font-bold text-slate-900 mb-2">{threat.name}</h3>
              <p className="text-slate-600 text-sm">{threat.description}</p>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* Solutions Grid */}
      <ModernSection background="white" padding="2xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Nos solutions de sécurité
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Une approche multicouche pour une protection complète
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {securitySolutions.map((solution, index) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-2xl mb-4">
                <div className="text-red-600">
                  {solution.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{solution.title}</h3>
              <p className="text-slate-600 leading-relaxed">{solution.description}</p>
            </div>
          ))}
        </div>

        {/* Detailed Services */}
        <div className="grid lg:grid-cols-3 gap-8">
          {securityServices.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              image={service.image}
              features={service.features}
              variant={index === 1 ? "featured" : "default"}
              className="cursor-pointer"
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>
      </ModernSection>

      {/* Detailed Service View */}
      <ModernSection background="gray" padding="2xl">
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4 mr-2" />
                Service en détail
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {securityServices[activeService].title}
              </h3>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {securityServices[activeService].description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {securityServices[activeService].benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-4 bg-red-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                En savoir plus
              </button>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                Fonctionnalités incluses
              </h4>
              {securityServices[activeService].features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ModernSection>

      {/* Partners Section */}
      <ModernSection background="white" padding="lg">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Nos partenaires sécurité
          </h3>
          <p className="text-slate-600">
            Nous collaborons avec les leaders de la cybersécurité
          </p>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 gap-8 max-w-md">
            <div className="flex items-center justify-center p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group">
              <img 
                src="/assets/stormshield.webp" 
                alt="Stormshield"
                className="h-12 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          </div>
        </div>
      </ModernSection>

      {/* CTA Section */}
      <ModernSection background="dark" padding="2xl">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Sécurisez votre entreprise
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Bénéficiez d'un audit de sécurité gratuit et découvrez les vulnérabilités 
            de votre infrastructure avant qu'il ne soit trop tard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-red-700 hover:to-orange-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Audit gratuit
            </button>
            <button className="bg-white/10 backdrop-blur text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 border border-white/20 hover:border-white/30 transition-all duration-200">
              04 50 64 02 33
            </button>
          </div>
        </div>
      </ModernSection>
    </main>
  );
}
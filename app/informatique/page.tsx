"use client";

import { useState, useEffect } from "react";
import { ModernSection, ServiceCard } from "@/components/ui";
import { ModernButton } from "@/components/ui/modernButton";
import { 
  Server, 
  Monitor, 
  Shield, 
  Cloud, 
  Users,
  ArrowRight,
  CheckCircle,
  Star
} from "lucide-react";

const servicesData = [
  {
    id: "infrastructure",
    title: "Infrastructure IT",
    description: "Solutions complètes pour votre infrastructure informatique avec du matériel performant et des serveurs haute disponibilité.",
    icon: <Server />,
    features: [
      "Matériel informatique dernière génération",
      "Serveurs haute performance et stockage sécurisé", 
      "Interconnexion de sites multiples",
      "Virtualisation avancée des infrastructures",
      "Monitoring et supervision 24/7"
    ],
    benefits: [
      "Performance optimisée",
      "Évolutivité garantie",
      "Sécurité renforcée"
    ]
  },
  {
    id: "environnement",
    title: "Environnement Utilisateur",
    description: "Un environnement de travail optimisé et sécurisé pour vos équipes avec des outils collaboratifs modernes.",
    icon: <Monitor />,
    features: [
      "Configuration et optimisation des postes de travail",
      "Protection antivirus et anti-malware avancée",
      "Gestion centralisée des accès et authentification",
      "Outils de collaboration moderne (Teams, Slack, etc.)",
      "Support et maintenance proactive"
    ],
    benefits: [
      "Productivité maximale",
      "Sécurité renforcée", 
      "Collaboration fluide"
    ]
  },
  {
    id: "hebergement",
    title: "Hébergement & Cloud",
    description: "Solutions cloud complètes avec sauvegarde automatique et hébergement web professionnel haute performance.",
    icon: <Cloud />,
    features: [
      "Sauvegarde automatique externalisée dans le cloud",
      "Solutions de sauvegarde locale pour récupération rapide",
      "Hébergement web haute performance et disponibilité",
      "Messagerie professionnelle complète et sécurisée",
      "Stockage cloud évolutif accessible partout"
    ],
    benefits: [
      "Disponibilité 99.9%",
      "Données sécurisées",
      "Accès universel"
    ]
  }
];

const statsData = [
  { value: "30+", label: "Années d'expérience", icon: <Star /> },
  { value: "500+", label: "Entreprises accompagnées", icon: <Users /> },
  { value: "99.9%", label: "Disponibilité garantie", icon: <CheckCircle /> },
  { value: "24/7", label: "Support technique", icon: <Shield /> }
];

const partnersLogos = [
  { name: "Dell", logo: "/assets/dell.webp" },
  { name: "Lenovo", logo: "/assets/lenovo.webp" },
  { name: "VMware", logo: "/assets/vmware.webp" },
  { name: "Stormshield", logo: "/assets/stormshield.webp" }
];

export default function Informatique() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ModernSection 
        background="gradient" 
        padding="2xl"
        className="relative"
      >
        <div className="absolute inset-0 bg-[url('/assets/infrastructure.webp')] bg-cover bg-center opacity-5" />
        <div className="relative z-10">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-8">
              <Monitor className="w-4 h-4 mr-2" />
              Solutions informatiques professionnelles
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
              Solutions
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Informatiques
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transformez votre infrastructure IT avec nos solutions sur mesure. 
              Performance, sécurité et innovation pour votre entreprise.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
                variant="secondary" 
                size="lg"
              >
                04 50 64 02 33
              </ModernButton>
            </div>
          </div>
        </div>
      </ModernSection>

      {/* Stats Section */}
      <ModernSection background="white" padding="lg">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-4 group-hover:bg-blue-600 transition-colors duration-300">
                <div className="text-blue-600 group-hover:text-white transition-colors duration-300">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl lg:text-4xl font-bold text-slate-900 mb-2">{stat.value}</div>
              <div className="text-slate-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* Services Section */}
      <ModernSection background="gray" padding="2xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Nos expertises
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Des solutions complètes pour accompagner votre transformation digitale
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              icon={service.icon}
              features={service.features}
              variant={index === 1 ? "featured" : "default"}
              className="cursor-pointer"
              onClick={() => setActiveService(index)}
            />
          ))}
        </div>

        {/* Detailed Service View */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                {servicesData[activeService].icon}
                <span className="ml-2">Service en détail</span>
              </div>
              
              <h3 className="text-3xl font-bold text-slate-900 mb-4">
                {servicesData[activeService].title}
              </h3>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {servicesData[activeService].description}
              </p>

              <div className="grid grid-cols-3 gap-4 mb-8">
                {servicesData[activeService].benefits.map((benefit, index) => (
                  <div key={index} className="text-center p-4 bg-blue-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <span className="text-sm font-medium text-slate-700">{benefit}</span>
                  </div>
                ))}
              </div>

             
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                Fonctionnalités incluses
              </h4>
              {servicesData[activeService].features.map((feature, index) => (
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
            Nos partenaires technologiques
          </h3>
          <p className="text-slate-600">
            Nous travaillons avec les leaders du marché
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center">
          {partnersLogos.map((partner, index) => (
            <div key={index} className="flex items-center justify-center p-6 bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 group">
              <img 
                src={partner.logo} 
                alt={partner.name}
                className="h-12 w-auto opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </ModernSection>

      {/* CTA Section */}
      <ModernSection background="dark" padding="2xl">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à transformer votre IT ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Contactez nos experts pour une consultation gratuite et découvrez comment optimiser votre infrastructure.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Consultation gratuite
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
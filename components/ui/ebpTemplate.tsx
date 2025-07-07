import { ModernSection } from '@/components/ui';
import { 
  Download, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Package,
  TrendingUp,
  Settings,
  Shield,
  Users,
  Award
} from 'lucide-react';
import Link from 'next/link';

interface EBPSoftware {
  title: string;
  subtitle: string;
  features: string[];
  pdfLink: string;
  popular?: boolean;
  price?: string;
  level: 'Essentiel' | 'Professionnel' | 'Expert';
}

interface EBPTemplateProps {
  title: string;
  description: string;
  softwares: EBPSoftware[];
  colorScheme?: 'blue' | 'green' | 'orange';
  category: string;
}

export function EBPTemplate({
  title,
  description,
  softwares,
  colorScheme = 'blue',
  category
}: EBPTemplateProps) {
  const colors = {
    blue: {
      badge: 'bg-blue-100 text-blue-700',
      button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      accent: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-200'
    },
    green: {
      badge: 'bg-green-100 text-green-700',
      button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      accent: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-200'
    },
    orange: {
      badge: 'bg-orange-100 text-orange-700',
      button: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
      accent: 'text-orange-600',
      bg: 'bg-orange-50',
      border: 'border-orange-200'
    }
  };

  const currentColors = colors[colorScheme];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case 'Essentiel': return <Package className="w-5 h-5" />;
      case 'Professionnel': return <TrendingUp className="w-5 h-5" />;
      case 'Expert': return <Award className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Essentiel': return 'bg-slate-100 text-slate-700';
      case 'Professionnel': return 'bg-blue-100 text-blue-700';
      case 'Expert': return 'bg-purple-100 text-purple-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ModernSection background="gradient" padding="2xl">
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 ${currentColors.badge} rounded-full text-sm font-medium mb-8`}>
            <Settings className="w-4 h-4 mr-2" />
            Logiciels EBP {category}
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className={`${currentColors.button} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center`}
            >
              Demander une démonstration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/formationCompta"
              className="bg-white/90 backdrop-blur text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-lg"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </ModernSection>

      {/* Software Comparison */}
      <ModernSection background="white" padding="2xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
            Choisissez votre solution EBP
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Des solutions adaptées à chaque besoin, de l'essentiel à l'expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {softwares.map((software, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                software.popular ? currentColors.border : 'border-slate-100'
              } ${software.popular ? 'transform scale-105' : 'hover:-translate-y-1'} relative`}
            >
              {software.popular && (
                <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 ${currentColors.badge} px-4 py-2 rounded-full text-sm font-semibold`}>
                  <Star className="w-4 h-4 inline mr-1" />
                  Plus populaire
                </div>
              )}

              <div className="text-center mb-6">
                <div className={`inline-flex items-center px-3 py-1 ${getLevelColor(software.level)} rounded-full text-sm font-medium mb-4`}>
                  {getLevelIcon(software.level)}
                  <span className="ml-2">{software.level}</span>
                </div>

                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  {software.title}
                </h3>
                
                <p className="text-slate-600 mb-4">
                  {software.subtitle}
                </p>

                {software.price && (
                  <div className="text-3xl font-bold text-slate-900 mb-4">
                    {software.price}
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-8">
                {software.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href={`/assets/${software.pdfLink}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${currentColors.button} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl w-full flex items-center justify-center`}
                >
                  <Download className="w-5 h-5 mr-2" />
                  Télécharger la fiche
                </a>
                
                <Link
                  href="/contact"
                  className="bg-slate-100 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-200 transition-all duration-200 w-full flex items-center justify-center"
                >
                  Demander un devis
                </Link>
              </div>
            </div>
          ))}
        </div>
      </ModernSection>

      {/* Why Choose EBP */}
      <ModernSection background="gray" padding="lg">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">
            Pourquoi choisir EBP ?
          </h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${currentColors.bg} rounded-2xl mb-4`}>
              <Shield className={`w-8 h-8 ${currentColors.accent}`} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Fiable et sécurisé</h4>
            <p className="text-slate-600 text-sm">Solutions éprouvées depuis plus de 30 ans</p>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${currentColors.bg} rounded-2xl mb-4`}>
              <Users className={`w-8 h-8 ${currentColors.accent}`} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Support expert</h4>
            <p className="text-slate-600 text-sm">Accompagnement personnalisé et formations</p>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${currentColors.bg} rounded-2xl mb-4`}>
              <Settings className={`w-8 h-8 ${currentColors.accent}`} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Personnalisable</h4>
            <p className="text-slate-600 text-sm">Adaptable à votre secteur d'activité</p>
          </div>

          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-16 h-16 ${currentColors.bg} rounded-2xl mb-4`}>
              <TrendingUp className={`w-8 h-8 ${currentColors.accent}`} />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">Évolutif</h4>
            <p className="text-slate-600 text-sm">Grandit avec votre entreprise</p>
          </div>
        </div>
      </ModernSection>

      {/* CTA Section */}
      <ModernSection background="dark" padding="2xl">
        <div className="text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Prêt à optimiser votre gestion ?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Contactez-nous pour une démonstration personnalisée et découvrez comment EBP 
            peut transformer votre gestion quotidienne.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/contact"
              className={`${currentColors.button} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            >
              Demander une démonstration
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            
            <Link
              href="/formationCompta"
              className="bg-white/90 backdrop-blur text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-lg"
            >
              Voir les formations
            </Link>
          </div>
        </div>
      </ModernSection>
    </main>
  );
}
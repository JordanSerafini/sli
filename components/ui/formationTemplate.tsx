import { ModernSection } from '@/components/ui';
import { 
  Download, 
  Clock, 
  Users, 
  Award, 
  CheckCircle, 
  BookOpen,
  ArrowRight,
  Calendar,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface FormationTemplateProps {
  title: string;
  subtitle: string;
  description: string;
  logoImage: string;
  formationImage: string;
  pdfUrl: string;
  duration: string;
  level: string;
  price: string;
  objectives: string[];
  program: string[];
  prerequisites?: string[];
  colorScheme?: 'blue' | 'green' | 'orange';
}

export function FormationTemplate({
  title,
  subtitle,
  description,
  logoImage,
  formationImage,
  pdfUrl,
  duration,
  level,
  price,
  objectives,
  program,
  prerequisites = [],
  colorScheme = 'blue'
}: FormationTemplateProps) {
  const colors = {
    blue: {
      badge: 'bg-blue-100 text-blue-700',
      button: 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700',
      accent: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    green: {
      badge: 'bg-green-100 text-green-700',
      button: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700',
      accent: 'text-green-600',
      bg: 'bg-green-50'
    },
    orange: {
      badge: 'bg-orange-100 text-orange-700',
      button: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700',
      accent: 'text-orange-600',
      bg: 'bg-orange-50'
    }
  };

  const currentColors = colors[colorScheme];

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <ModernSection background="gradient" padding="2xl">
        <div className="text-center">
          <div className={`inline-flex items-center px-4 py-2 ${currentColors.badge} rounded-full text-sm font-medium mb-8`}>
            <Award className="w-4 h-4 mr-2" />
            Formation certifiée Qualiopi
          </div>
          
          <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
            {title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            {subtitle}
          </p>

          {/* Logo EBP */}
          <div className="flex justify-center mb-8">
            <Image
              src={logoImage}
              alt="Logo EBP"
              width={300}
              height={200}
              className="rounded-xl shadow-lg"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${currentColors.button} text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center`}
            >
              <Download className="w-5 h-5 mr-2" />
              Télécharger le programme
            </a>
            
            <Link
              href="/contact"
              className="bg-white/90 backdrop-blur text-slate-700 px-8 py-4 rounded-lg font-semibold hover:bg-white border border-slate-200 hover:border-slate-300 transition-all duration-200 shadow-lg"
            >
              Demander un devis
            </Link>
          </div>
        </div>
      </ModernSection>

      {/* Formation Details */}
      <ModernSection background="white" padding="2xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">
              Programme de formation
            </h2>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              {description}
            </p>

            {/* Formation Info */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className={`${currentColors.bg} p-4 rounded-xl text-center`}>
                <Clock className={`w-6 h-6 ${currentColors.accent} mx-auto mb-2`} />
                <div className="font-semibold text-slate-900">{duration}</div>
                <div className="text-sm text-slate-600">Durée</div>
              </div>
              
              <div className={`${currentColors.bg} p-4 rounded-xl text-center`}>
                <Users className={`w-6 h-6 ${currentColors.accent} mx-auto mb-2`} />
                <div className="font-semibold text-slate-900">{level}</div>
                <div className="text-sm text-slate-600">Niveau</div>
              </div>
              
              <div className={`${currentColors.bg} p-4 rounded-xl text-center`}>
                <Award className={`w-6 h-6 ${currentColors.accent} mx-auto mb-2`} />
                <div className="font-semibold text-slate-900">{price}</div>
                <div className="text-sm text-slate-600">Tarif</div>
              </div>
            </div>

            {/* Objectives */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-slate-900 mb-4">
                Objectifs pédagogiques
              </h3>
              <div className="space-y-3">
                {objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-700">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Image
              src={formationImage}
              alt="Formation EBP"
              width={500}
              height={400}
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>
      </ModernSection>

      {/* Program Details */}
      <ModernSection background="gray" padding="2xl">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Program Content */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              Contenu détaillé du programme
            </h3>
            
            <div className="space-y-4">
              {program.map((item, index) => (
                <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex items-start space-x-3">
                    <div className={`w-6 h-6 ${currentColors.bg} ${currentColors.accent} rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5`}>
                      {index + 1}
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Prerequisites & Info */}
          <div className="space-y-8">
            {prerequisites.length > 0 && (
              <div>
                <h4 className="text-xl font-semibold text-slate-900 mb-4">
                  Prérequis
                </h4>
                <div className="space-y-2">
                  {prerequisites.map((prerequisite, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <BookOpen className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-600">{prerequisite}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-xl font-semibold text-slate-900 mb-4">
                Informations pratiques
              </h4>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">Dans nos locaux ou sur site</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">Planification selon vos disponibilités</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">04 50 64 02 33</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-slate-400" />
                  <span className="text-slate-600">formation@solution-logique.fr</span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/contact"
                  className={`${currentColors.button} text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl w-full flex items-center justify-center`}
                >
                  Demander un devis
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ModernSection>

      {/* Qualiopi Certification */}
      <ModernSection background="white" padding="lg">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Formation certifiée Qualiopi
              </h3>
              <p className="text-slate-600 mb-4">
                La certification qualité a été délivrée pour les catégories suivantes : 
                <strong> ACTIONS DE FORMATION</strong>
              </p>
              <p className="text-sm text-slate-500">
                Prise en charge possible par votre OPCO ou CPF
              </p>
            </div>
            
            <div className="flex justify-center">
              <Image
                src="/assets/logo-qualiopi.webp"
                alt="Certification Qualiopi"
                width={200}
                height={120}
                className="opacity-80"
              />
            </div>
          </div>
        </div>
      </ModernSection>
    </main>
  );
} 
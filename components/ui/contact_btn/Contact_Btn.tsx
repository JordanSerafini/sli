"use client";

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function Contact_Btn() {
  const [isExpanded, setIsExpanded] = useState(false);

  // Gestion de la touche Échap
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      };
    }
  }, [isExpanded]);

  const handleMainClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    } else {
      window.location.href = '/contact';
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 group">
      {/* Options expandues */}
      {isExpanded && (
        <div className="absolute bottom-20 right-0 space-y-3 animate-fade-in-up">
          {/* Email */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              Envoyer un email
            </span>
            <a
              href="mailto:site@solution-logique.fr"
              className="bg-accent-500 hover:bg-accent-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl border-2 border-white/20"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Téléphone */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              04 50 64 02 33
            </span>
            <a
              href="tel:0450640233"
              className="bg-primary-500 hover:bg-primary-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl border-2 border-white/20"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Télémaintenance */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-foreground px-3 py-2 rounded-lg text-sm font-medium shadow-lg border border-border opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              Support technique
            </span>
            <Link
              href="/telemaintenance"
              className="bg-secondary-600 hover:bg-secondary-700 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl border-2 border-white/20"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Bouton principal */}
      <div className="relative">
        {/* Cercle lumineux en arrière-plan */}
        <div className="absolute inset-0 gradient-primary rounded-full animate-pulse-subtle opacity-40 scale-110"></div>
        
        {/* Bouton principal */}
        <button
          onClick={handleMainClick}
          className="relative gradient-primary hover:from-primary-700 hover:to-accent-700 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group/btn border-2 border-white/20"
        >
          {/* Animation de rotation du texte */}
          <div className="absolute inset-0 rounded-full">
            <svg 
              className="w-full h-full animate-spin" 
              style={{ animationDuration: '12s' }} 
              viewBox="0 0 100 100"
            >
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text 
                fill="white" 
                fontSize="5.5" 
                fontWeight="600" 
                className="uppercase tracking-widest"
                opacity="0.9"
              >
                <textPath href="#circlePath" startOffset="0%">
                  • NOUS CONTACTER • ÊTRE RAPPELÉ • SUPPORT TECHNIQUE • 
                </textPath>
              </text>
            </svg>
          </div>

          {/* Icône centrale */}
          <div className="relative z-10 transition-transform duration-200 group-hover/btn:scale-110">
            {isExpanded ? (
              <ArrowRight className="w-6 h-6" />
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </div>

          {/* Effet de brillance au survol */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        </button>

        {/* Badge notification modernisé */}
        {!isExpanded && (
          <div className="absolute -top-2 -right-2 bg-error text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg border-2 border-white">
            !
          </div>
        )}
      </div>

      {/* Overlay pour fermer avec backdrop blur */}
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/10 backdrop-blur-sm -z-10 transition-all duration-200"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

export default Contact_Btn;

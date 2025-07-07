"use client";

import { useState } from 'react';
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';

function Contact_Btn() {
  const [isExpanded, setIsExpanded] = useState(false);

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
        <div className="absolute bottom-20 right-0 space-y-3 animate-in slide-in-from-bottom-5 duration-300">
          {/* Email */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              Envoyer un email
            </span>
            <a
              href="mailto:site@solution-logique.fr"
              className="bg-emerald-500 hover:bg-emerald-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>

          {/* Téléphone */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              04 50 64 02 33
            </span>
            <a
              href="tel:0450640233"
              className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            >
              <Phone className="w-5 h-5" />
            </a>
          </div>

          {/* Télémaintenance */}
          <div className="flex items-center space-x-3 group/item">
            <span className="bg-white/95 backdrop-blur-sm text-slate-800 px-3 py-2 rounded-lg text-sm font-medium shadow-lg opacity-0 group-hover/item:opacity-100 translate-x-2 group-hover/item:translate-x-0 transition-all duration-200 whitespace-nowrap">
              Support technique
            </span>
            <Link
              href="/telemaintenance"
              className="bg-purple-500 hover:bg-purple-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl"
            >
              <MessageCircle className="w-5 h-5" />
            </Link>
          </div>
        </div>
      )}

      {/* Bouton principal */}
      <div className="relative">
        {/* Cercle lumineux en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-30 scale-110"></div>
        
        {/* Bouton principal */}
        <button
          onClick={handleMainClick}
          onBlur={() => setIsExpanded(false)}
          className="relative bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl group/btn"
        >
          {/* Animation de rotation du texte */}
          <div className="absolute inset-0 rounded-full">
            <svg className="w-full h-full animate-spin" style={{ animationDuration: '10s' }} viewBox="0 0 100 100">
              <defs>
                <path
                  id="circlePath"
                  d="M 50,50 m -35,0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                />
              </defs>
              <text fill="white" fontSize="6" fontWeight="600" className="uppercase tracking-wider">
                <textPath href="#circlePath" startOffset="0%">
                  • NOUS CONTACTER • ÊTRE RAPPELÉ • SUPPORT TECHNIQUE 
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
        </button>

        {/* Badge notification (optionnel) */}
        {!isExpanded && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce">
            !
          </div>
        )}
      </div>

      {/* Overlay pour fermer */}
      {isExpanded && (
        <div
          className="fixed inset-0 -z-10"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
}

export default Contact_Btn;

"use client";

import { useState, useEffect } from 'react';
import { Phone, MessageCircle, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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
        <div className="absolute bottom-20 right-16 transform -translate-x-full space-y-3 transition-all duration-300 ease-out opacity-100 translate-y-0">
          {/* Bouton fermer */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsExpanded(false)}
              className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
              title="Fermer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Email */}
          <a
            href="mailto:site@solution-logique.fr"
            className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 flex items-center space-x-3 min-w-max"
            title="Envoyer un email"
          >
            <div className="bg-green-500 text-white p-2 rounded-full">
              <Mail className="w-4 h-4" />
            </div>
            <span className="font-medium">Email</span>
          </a>

          {/* Téléphone */}
          <a
            href="tel:0450640233"
            className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 flex items-center space-x-3 min-w-max"
            title="Appeler"
          >
            <div className="bg-blue-500 text-white p-2 rounded-full">
              <Phone className="w-4 h-4" />
            </div>
            <span className="font-medium">04 50 64 02 33</span>
          </a>

          {/* Télémaintenance */}
          <Link
            href="/telemaintenance"
            className="bg-white hover:bg-gray-50 text-gray-800 px-4 py-3 rounded-full shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl border border-gray-200 flex items-center space-x-3 min-w-max"
            title="Support technique"
          >
            <div className="bg-gray-600 text-white p-2 rounded-full">
              <MessageCircle className="w-4 h-4" />
            </div>
            <span className="font-medium">Support</span>
          </Link>
        </div>
      )}

      {/* Bouton principal */}
      <div className="relative">
        {/* Cercle lumineux en arrière-plan */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-full animate-pulse opacity-40 scale-110"></div>
        
        {/* Bouton principal */}
        <button
          onClick={handleMainClick}
          className="relative bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white p-4 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl group/btn border-2 border-white/20"
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
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold animate-bounce shadow-lg border-2 border-white">
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

import React from "react";
import Link from "next/link";
import { MapPin, Phone, Mail, ExternalLink } from "lucide-react";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    navigation: [
      { href: "/", label: "Accueil" },
      { href: "/logiciels", label: "Nos logiciels / Formations" },
      { href: "/nosServices", label: "Nos Services" },
      { href: "/telemaintenance", label: "Télémaintenance" },
      { href: "/contact", label: "Contactez-nous" },
    ],
    services: [
      { href: "/informatique", label: "Informatique" },
      { href: "/telecom", label: "Télécom" },
      { href: "/securite", label: "Sécurité" },
    ],
    legal: [
      { href: "/conditionsGeneralesVente", label: "Conditions Générales de Vente" },
    ]
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Solution Logique
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  Votre partenaire informatique depuis plus de 30 ans.
                  Solutions complètes pour PME, TPE et collectivités.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div className="text-slate-400">
                    <p>475 Route des Vernes</p>
                    <p>74370 Annecy</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a 
                    href="tel:+33450640233"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    04.50.64.02.33
                  </a>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                  <a 
                    href="mailto:contact@solution-logique.com"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    contact@solution-logique.com
                  </a>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Nos Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Télémaintenance externe */}
              <div className="pt-4 border-t border-slate-800">
                <a 
                  href="https://www.islonline.com/fr/fr/join/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <span>Accès télémaintenance</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* CTA Section */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold text-white">Besoin d'aide ?</h4>
              <div className="space-y-4">
                <p className="text-slate-400">
                  Notre équipe est à votre disposition pour vous accompagner.
                </p>
                
                <div className="space-y-3">
                  <Link 
                    href="/contact"
                    className="block w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-medium text-center hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Nous contacter
                  </Link>
                  
                  <Link 
                    href="/telemaintenance"
                    className="block w-full border border-slate-600 text-slate-300 px-6 py-3 rounded-lg font-medium text-center hover:border-slate-500 hover:text-white transition-colors duration-200"
                  >
                    Support technique
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-slate-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-slate-400 text-sm">
              © {currentYear} Solution Logique Informatique. Tous droits réservés.
            </div>
            
            <div className="flex items-center space-x-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 
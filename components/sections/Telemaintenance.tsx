import React from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { ArrowRight, Headphones, Monitor } from "lucide-react";

function Telemaintenance() {
  return (
    <Section padding="xl" className="bg-slate-50">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        
        {/* Left Content - Image */}
        <div className="relative order-2 lg:order-1">
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-20 blur-xl" />
            
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <Image
                alt="Assistance télémaintenance"
                src="/assets/assistance.webp"
                width={500}
                height={400}
                className="w-full h-auto rounded-2xl"
                priority
              />
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                  <span className="font-semibold">En ligne</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Text & CTA */}
        <div className="space-y-6 order-1 lg:order-2">
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-blue-600">
                <Monitor className="w-6 h-6" />
                <span className="font-semibold text-sm uppercase tracking-wide">Support technique</span>
              </div>
              
              <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
                Besoin d&apos;une aide en{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  télémaintenance ?
                </span>
              </h2>
            </div>

            <p className="text-xl text-slate-700 leading-relaxed">
                             Accédez à la télémaintenance pour que Solution Logique intervienne
               directement sur votre ordinateur. Notre équipe d&apos;experts est 
               disponible pour vous aider à résoudre vos problèmes informatiques
              rapidement et efficacement.
            </p>

            {/* Features list */}
            <div className="space-y-2">
              {[
                "Intervention immédiate",
                "Support sécurisé",
                "Résolution rapide",
                "Accompagnement personnalisé"
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
                  <span className="text-slate-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="space-y-3">
            <Link href="/telemaintenance">
              <Button size="xl" className="w-full sm:w-auto group">
                <Headphones className="mr-2 h-5 w-5" />
                Accéder à la télémaintenance
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="tel:+33450640233">
                <Button variant="outline" size="lg" className="group">
                  📞 04.50.64.02.33
                </Button>
              </Link>
              
              <Button variant="ghost" size="lg" className="group">
                <Monitor className="mr-2 h-5 w-5" />
                Guide d'installation
              </Button>
            </div>
          </div>

          {/* Trust indicator */}
          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center space-x-3 text-slate-600">
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-sm font-medium">Connexion sécurisée SSL</span>
              </div>
              <span className="text-slate-300">•</span>
              <span className="text-sm">Support 7j/7</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Telemaintenance; 
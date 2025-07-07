"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Button from "@/components/ui/Button";
import Section from "@/components/ui/Section";
import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animation d'entrée moderne
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(textRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(imageRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section 
      padding="xl" 
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50/30"
      containerSize="xl"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-500/5 to-transparent" />
      
      <div ref={heroRef} className="relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[600px]">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Logo SLI */}
            <div className="flex justify-center lg:justify-start">
              <Image
                alt="Solution Logique Informatique"
                src="/assets/sli.webp"
                width={300}
                height={150}
                priority
                className="h-auto w-auto max-w-[280px]"
              />
            </div>

            {/* Main Content */}
            <div className="space-y-6 text-center lg:text-left">
              <h1 
                ref={titleRef}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-slate-900 leading-tight"
              >
                Bienvenue chez{" "}
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Solution Logique
                </span>
              </h1>
              
              <h2 
                ref={subtitleRef}
                className="text-xl lg:text-2xl text-slate-600 font-medium"
              >
                Qui sommes-nous ?
              </h2>
              
              <p 
                ref={textRef}
                className="text-lg text-slate-700 leading-relaxed max-w-2xl"
              >
                L&apos;équipe de Solution Logique est à votre écoute pour réaliser vos projets informatiques.
                Depuis plus de 30 ans, nous avons toujours voulu marquer notre volonté d&apos;une forte 
                implantation locale en Rhône-Alpes.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link
                  href="/nosServices"
                  className="group inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 h-12 px-8 text-lg"
                >
                  Découvrir nos services
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                
                <Button variant="outline" size="lg" className="group">
                  <Phone className="mr-2 h-5 w-5" />
                  04.50.64.02.33
                </Button>
              </div>
            </div>
          </div>

          {/* Right Content - Card moderne */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-3xl p-8 lg:p-10 text-white shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-2xl lg:text-3xl font-bold">
                    Apporteur de solution informatique
                  </h3>
                  <p className="text-blue-100 text-lg leading-relaxed">
                    Intégrateur de solutions complètes et prestataire de services en conseils informatiques, 
                    nous innovons quotidiennement pour les PME, PMI, TPE, indépendants, collectivités et associations.
                  </p>
                </div>

                <div className="relative mt-8">
                  <Image
                    alt="Solution Informatique"
                    src="/assets/solution.webp"
                    width={500}
                    height={375}
                    className="w-full h-auto rounded-2xl shadow-lg"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default Hero; 
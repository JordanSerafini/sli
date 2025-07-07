"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import Section from "@/components/ui/Section";
import { ModernButton } from "@/components/ui/modernButton";
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
      
      // Animation d'entrée moderne et plus subtile
      tl.from(titleRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from(subtitleRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.4")
      .from(textRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
      }, "-=0.3")
      .from(imageRef.current, {
        x: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
      }, "-=0.6");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section 
      padding="lg" 
      className="relative overflow-hidden gradient-subtle"
      containerSize="xl"
    >
      {/* Background decoration subtile */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary-50/50 to-transparent" />
      
      <div ref={heroRef} className="relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[400px]">
          
          {/* Left Content */}
          <div className="space-y-6">
            {/* Logo SLI */}
            <div className="flex justify-center lg:justify-start">
              <Image
                alt="Solution Logique Informatique"
                src="/assets/sli.webp"
                width={280}
                height={140}
                priority
                className="h-auto w-auto max-w-[260px]"
              />
            </div>

            {/* Main Content avec espacements optimisés */}
            <div className="space-y-4 text-center lg:text-left">
              <h1 
                ref={titleRef}
                className="text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground leading-tight tracking-tight"
              >
                Bienvenue chez{" "}
                <span className="text-gradient">
                  Solution Logique
                </span>
              </h1>
              
              <h2 
                ref={subtitleRef}
                className="text-xl lg:text-2xl text-foreground-muted font-medium"
              >
                Qui sommes-nous ?
              </h2>
              
              <p 
                ref={textRef}
                className="text-lg text-foreground-muted leading-relaxed max-w-2xl"
              >
                L&apos;équipe de Solution Logique est à votre écoute pour réaliser vos projets informatiques.
                Depuis plus de 30 ans, nous avons toujours voulu marquer notre volonté d&apos;une forte 
                implantation locale en Rhône-Alpes.
              </p>

              {/* CTAs avec nouveaux boutons modernisés */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2">
                <Link href="/nosServices">
                  <ModernButton 
                    variant="accent" 
                    size="lg"
                    icon={<ArrowRight />}
                    iconPosition="right"
                  >
                    Découvrir nos services
                  </ModernButton>
                </Link>
                
                <ModernButton 
                  variant="secondary" 
                  size="lg"
                  icon={<Phone />}
                  iconPosition="left"
                >
                  04.50.64.02.33
                </ModernButton>
              </div>
            </div>
          </div>

          {/* Right Content - Card modernisée */}
          <div 
            ref={imageRef}
            className="relative"
          >
            <div className="gradient-primary rounded-3xl p-8 lg:p-10 text-white shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="space-y-4">
                <div className="space-y-3">
                  <h3 className="text-2xl lg:text-3xl font-bold leading-tight force-white-title">
                    Apporteur de solution informatique
                  </h3>
                  <p className="text-primary-100 text-lg leading-relaxed">
                    Intégrateur de solutions complètes et prestataire de services en conseils informatiques, 
                    nous innovons quotidiennement pour les PME, PMI, TPE, indépendants, collectivités et associations.
                  </p>
                </div>

                <div className="relative mt-6">
                  <Image
                    alt="Solution Informatique"
                    src="/assets/solution.webp"
                    width={500}
                    height={375}
                    className="w-full h-auto rounded-2xl shadow-lg opacity-95 hover:opacity-100 transition-opacity"
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
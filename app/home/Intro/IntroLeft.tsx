import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";

if (typeof window !== 'undefined') {
  gsap.registerPlugin(TextPlugin);
}

function IntroLeft() {
  const leftBotSideRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const leftBotSide = leftBotSideRef.current;

    if (!leftBotSide) return;

    const h1 = leftBotSide.querySelector("h1") as HTMLHeadingElement;
    const h2 = leftBotSide.querySelector("h2") as HTMLHeadingElement;
    const paragraphs = Array.from(
      leftBotSide.querySelectorAll<HTMLParagraphElement>("p")
    );

    const originalTexts = [
      "L'équipe de Solution Logique est à votre écoute pour réaliser vos projets informatiques.",
      "Depuis plus de 30 ans, nous avons toujours voulu marquer notre volonté, d'une forte implantation locale en Rhône-Alpes."
    ];

    // Réinitialiser les textes
    paragraphs.forEach((p, index) => {
      p.textContent = '';
      p.setAttribute('data-text', originalTexts[index]);
    });

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.set([h1, h2, ...paragraphs], { opacity: 0 })
      .to(h1, { opacity: 1, duration: 1 })
      .to(h2, { opacity: 1, duration: 1 }, "-=0.5");

    paragraphs.forEach((p, index) => {
      const text = p.getAttribute('data-text') || '';
      
      tl.to(p, {
        opacity: 1,
        duration: 0.5,
      }, `+=${index * 0.2}`)
      .to(p, {
        text: text,
        duration: text.length * 0.08,
        ease: "none",
        onStart: () => {
          p.classList.add('typing');
          if (index > 0) {
            paragraphs[index - 1].classList.remove('typing');
          }
        },
        onComplete: () => {
          if (index === paragraphs.length - 1) {
            p.classList.remove('typing');
            p.classList.add('typing-complete');
          }
        }
      }, "<");
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="flex-none w-2/5 max-w-[40%] h-full m-0 pr-5 flex flex-col items-center text-center justify-center relative 
                    max-[830px]:flex-1 max-[830px]:max-w-full max-[830px]:pr-0 
                    max-[414px]:flex-1 max-[414px]:max-w-full max-[414px]:pr-0">
      
      {/* Logo Section - left_top_side */}
      <div className="w-full mb-[30px] flex justify-center h-[15%]">
        <Image
          className="max-w-full h-auto text-center"
          alt="Logo Solution Logique Informatique"
          src="/assets/sli.webp"
          width={300}
          height={150}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      
      {/* Content Section - left_bot_side */}
      <div 
        className="w-full flex flex-col items-center gap-5 justify-center min-h-[400px] relative"
        ref={leftBotSideRef}
      >
        <h1 className="text-[2em] mb-5 opacity-0 m-0 p-0 text-main-color">
          Bienvenue chez Solution Logique
        </h1>
        
        <h2 className="text-[1.5em] mb-5 opacity-0 m-0 p-0 text-gray-500">
          Qui sommes-nous ?
        </h2>
        
        <p 
          data-text="" 
          className="text-[1.2em] leading-[1.5] text-center opacity-0 m-0 p-0"
        ></p>
        
        <p 
          data-text="" 
          className="text-[1.2em] leading-[1.5] text-center opacity-0 m-0 p-0"
        ></p>
      </div>
    </div>
  );
}

export default IntroLeft;
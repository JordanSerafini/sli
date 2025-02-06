import Image from "next/image";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import "./intro.scss";

if (typeof window !== "undefined") {
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
      "Depuis plus de 30 ans, nous avons toujours voulu marquer notre volonté d'une forte implantation locale en Rhône-Alpes."
    ];

    // Réinitialisation des textes
    paragraphs.forEach((p, index) => {
      p.textContent = "";
      p.setAttribute("data-text", originalTexts[index]);
      p.classList.add("typing"); // Ajoute le curseur au début
    });

    const tl = gsap.timeline({ defaults: { ease: "none" } });

    tl.set([h1, h2, ...paragraphs], { opacity: 0 })
      .to(h1, { opacity: 1, duration: 1 })
      .to(h2, { opacity: 1, duration: 1 }, "-=0.5");

    paragraphs.forEach((p, index) => {
      const text = p.getAttribute("data-text") || "";

      tl.to(
        p,
        {
          opacity: 1,
          duration: 0.5,
        },
        `+=${index * 0.2}`
      ).to(
        p,
        {
          text: text,
          duration: text.length * 0.045,
          ease: "none",
          onStart: () => {
            p.classList.add("typing");
            if (index > 0) {
              paragraphs[index - 1].classList.remove("typing");
              paragraphs[index - 1].classList.add("typing-hidden");
            }
          },
          onComplete: () => {
            if (index === paragraphs.length - 1) {
              p.classList.remove("typing");
              p.classList.add("typing-complete");
            }
          },
        },
        "<"
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="home_container_left_side">
      <div className="left_top_side">
        <Image
          className="device_sli"
          alt="Logo Solution Logique Informatique"
          src="/assets/sli.webp"
          width={300}
          height={150}
          style={{ width: "auto", height: "auto" }}
          priority
        />
      </div>
      <div className="left_bot_side" ref={leftBotSideRef}>
        <h1>Bienvenue chez Solution Logique</h1>
        <h2>Qui sommes-nous ?</h2>
        <p data-text="" className="left_bot_side_p"></p>
        <p data-text="" className="left_bot_side_p"></p>
      </div>
    </div>
  );
}

export default IntroLeft;

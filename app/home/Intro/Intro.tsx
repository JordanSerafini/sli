import React from "react";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import IntroLeft from "./IntroLeft";
import IntroRight from "./IntroRight";

import './intro.scss'

function Intro() {
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rightRef.current,
      { x: "100%", opacity: 0 },
      { x: "0%", opacity: 1, duration: 0.8, ease: "power3.out" }
    );
  }, []);

  return (
      <section className="home_container_both">
        <IntroLeft />
        <div ref={rightRef} className="intro_right_side">
          <IntroRight />
        </div>
      </section>
  );
}

export default Intro;

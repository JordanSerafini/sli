import React from "react";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import IntroLeft from "./IntroLeft";
import IntroRight from "./IntroRight";

function Intro() {
  const rightRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      rightRef.current,
      { x: "100%", opacity: 0 },
      { x: "10%", opacity: 1, duration: 5, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="container">
      <section className="home_container_both">
        <IntroLeft />
        <div ref={rightRef} className="home_container_both">
          <IntroRight />
        </div>
      </section>
    </div>
  );
}

export default Intro;

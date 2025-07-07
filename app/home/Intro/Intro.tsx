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
      { x: "0%", opacity: 1, duration: 2, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="container mx-auto">
      <section className="flex w-full my-[50px] mx-auto gap-20 items-center min-h-[500px] justify-center
                          max-[414px]:flex-col max-[414px]:min-h-auto max-[414px]:my-[30px]
                          max-[830px]:flex-col max-[830px]:min-h-auto max-[830px]:my-[40px]">
        
        <IntroLeft />
        
        <div ref={rightRef} className="opacity-0">
          <IntroRight />
        </div>
      </section>
    </div>
  );
}

export default Intro;

"use client";

import React from "react";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Telemaintenance from "@/components/sections/Telemaintenance";
import Partners from "@/components/sections/Partners";

function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Services />
      <Telemaintenance />
      <Partners />
    </main>
  );
}

export default Home;
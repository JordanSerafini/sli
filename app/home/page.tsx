"use client";

import Intro from "./Intro/Intro";
import Expertise from "./Expertise/Expertise";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "./home.scss";
import React from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import Link from "next/link";

function Home() {
  const partners = [
    "ebp.webp",
    "dell.webp",
    "stormshield.webp",
    "3cx.webp",
    "vmware.webp",
    "lenovo.webp",
    "oxatis.webp",
    "kyocera.webp",
  ];

  const iconWidth = 150;
  const iconSpacing = 95;
  const totalWidth = partners.length * (iconWidth + iconSpacing);
  const speed = totalWidth / 0.5;

  return (
    <main className="card_home_page">
      <Intro />
      <Expertise />
      <div className="container">
        <section className="home_conseils_sli">
          <div className="home_conseils_sli_left">
            <Image
              className="img_right_side responsive_img"
              alt="Assistance télémaintenance"
              src="/assets/assistance.webp"
              width={400}
              height={300}
              priority
            />
          </div>
          <div className="home_conseils_sli_right">
            <h1>Nous contacter</h1>
            <h2>Besoin d&apos;une aide en télémaintenance ?</h2>
            <p>
              Accédez à la télémaintenance pour que Solution Logique intervienne
              directement sur votre ordinateur.
            </p>

            <Link href="/telemaintenance" className="btn_help btn_help_right">
              Besoin d&apos;aide ?
            </Link>
          </div>
        </section>
        <h1>PARTENAIRE ASSOCIATIF :</h1>
      </div>
      <div className="home_carousel_partner">
        <Swiper
          modules={[Autoplay, FreeMode]}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={speed}
          loop={true}
          freeMode={true}
          grabCursor={false}
          slidesPerView="auto"
          spaceBetween={iconSpacing}
        >
          {[...partners, ...partners].map((imgSrc, index) => (
            <SwiperSlide key={index} className="partner_slide">
              <Image
                className="device_sli"
                alt={`Logo ${imgSrc}`}
                src={`/assets/${imgSrc}`}
                width={iconWidth}
                height={100}
                style={{
                  width: `${iconWidth}px`,
                  height: "100px",
                  objectFit: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </main>
  );
}

export default Home;

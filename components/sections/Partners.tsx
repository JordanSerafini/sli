import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, FreeMode } from "swiper/modules";
import Section from "@/components/ui/Section";

function Partners() {
  const partners = [
    { name: "EBP", logo: "ebp.webp" },
    { name: "Dell", logo: "dell.webp" },
    { name: "Stormshield", logo: "stormshield.webp" },
    { name: "3CX", logo: "3cx.webp" },
    { name: "VMware", logo: "vmware.webp" },
    { name: "Lenovo", logo: "lenovo.webp" },
    { name: "Oxatis", logo: "oxatis.webp" },
    { name: "Kyocera", logo: "kyocera.webp" },
  ];

  return (
    <Section padding="xl" className="bg-white overflow-hidden">
      <div className="text-center space-y-12">
        
        {/* Header */}
        <div className="space-y-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900">
            Nos partenaires de confiance
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Nous collaborons avec les leaders du marché pour vous offrir 
            les meilleures solutions technologiques
          </p>
        </div>

        {/* Partners Carousel */}
        <div className="relative overflow-hidden w-full">
          {/* Gradient masks pour un effet de fondu */}
          <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-white to-transparent z-10" />
          
          <Swiper
            modules={[Autoplay, FreeMode]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={3000}
            loop={true}
            freeMode={true}
            grabCursor={false}
            slidesPerView="auto"
            spaceBetween={40}
            centeredSlides={false}
            className="partners-swiper w-full overflow-hidden"
          >
            {/* Dupliquer les partenaires pour un défilement infini */}
            {[...partners, ...partners, ...partners].map((partner, index) => (
              <SwiperSlide key={`${partner.name}-${index}`} className="!w-auto flex-shrink-0">
                <div className="group flex items-center justify-center h-24 sm:h-36 px-4 sm:px-8">
                  <div className="relative transition-all duration-500 group-hover:scale-110">
                    <Image
                      alt={`Logo ${partner.name}`}
                      src={`/assets/${partner.logo}`}
                      width={160}
                      height={80}
                      className="h-12 sm:h-20 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                      style={{
                        maxHeight: "48px",
                        width: "auto",
                        minWidth: "80px",
                      }}
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Additional info */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <p className="text-slate-700 font-medium">
            Plus de <span className="text-blue-600 font-bold">30 ans</span> d'expérience 
            avec des partenaires technologiques de premier plan
          </p>
        </div>
      </div>

      <style jsx global>{`
        .partners-swiper {
          overflow: hidden !important;
          width: 100% !important;
        }
        
        .partners-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
        
        .partners-swiper .swiper-slide {
          width: auto !important;
          flex-shrink: 0 !important;
        }

        @media (max-width: 640px) {
          .partners-swiper .swiper-slide {
            max-width: 120px !important;
          }
        }
      `}</style>
    </Section>
  );
}

export default Partners; 
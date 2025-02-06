"use client";

import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./navbar.scss";

function Navbar() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768); // Si la largeur est inférieure ou égale à 768px, c'est mobile/tablette
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Vérifier la taille au chargement de la page

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        // Si l'écran est mobile, ne pas animer la navbar
        if (isMobile) {
          setIsVisible(true);
          gsap.to(".navigation_bar", { y: "0%", duration: 0 }); // Restaure la position de la navbar immédiatement
          return;
        }

        if (currentScrollY > lastScrollY && isVisible) {
          setIsVisible(false); 
          gsap.to(".navigation_bar", { y: "-100%", duration: 0.3 });
        } else if (currentScrollY < lastScrollY && !isVisible) {
          setIsVisible(true); 
          gsap.to(".navigation_bar", { y: "0%", duration: 0.3 });
        }

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible, isMobile]);

  return (
    <nav className="navigation_bar">
      <Link href="/">
        <Image
          alt="logo_solution_logique_informatique"
          src="/assets/logo.webp"
          width={150}
          height={50}
          priority
          className="logo"
        />
      </Link>
      <ul className="nav_links">
        <li>
          <Link href="/" className={pathname === "/" ? "active" : ""}>
            Accueil
          </Link>
        </li>
        <li className="link-logiciels">
          <Link href="/logiciels" className={pathname === "/logiciels" ? "active" : ""}>
            {isMobile ? "Logiciels" : "Nos logiciels EBP / Formations"}
          </Link>
        </li>
        <li className="deroulant">
          <Link href="/nosServices" className={pathname === "/nosServices" || pathname === "/informatique" || pathname === "/telecom" || pathname === "/securite" ? "active" : ""}>
            Nos Services &ensp;
          </Link>
          <ul className="sous">
            <li>
              <Link href="/informatique" className={pathname === "/informatique" ? "active" : ""}>
                Informatique
              </Link>
            </li>
            <li>
              <Link href="/telecom" className={pathname === "/telecom" ? "active" : ""}>
                Télécom
              </Link>
            </li>
            <li>
              <Link href="/securite" className={pathname === "/securite" ? "active" : ""}>
                Sécurité
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link href="/telemaintenance" className={pathname === "/telemaintenance" ? "active" : ""}>
            Télémaintenance
          </Link>
        </li>
        <li>
          <Link href="/contact" className={pathname === "/contact" ? "active" : ""}>
            Contactez-nous
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

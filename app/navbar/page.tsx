"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "./navbar.scss";

function Navbar() {
  const pathname = usePathname();
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollingDown, setScrollingDown] = useState(false);

  // Gérer le défilement
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollingDown(currentScrollY > lastScrollY); 
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navigation_bar ${scrollingDown ? "hide" : ""}`}>
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
            Nos logiciels EBP / Formations
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

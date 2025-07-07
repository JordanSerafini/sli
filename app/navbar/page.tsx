import React from "react";
import Link from "next/link";
import Image from "next/image";
import "./navbar.scss";

function Navbar() {
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
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/logiciels">Nos logiciels EBP / Formations</Link>
        </li>
        <li className="deroulant">
          <Link href="/nosServices">Nos Services &ensp;</Link>
          <ul className="sous">
            <li>
              <Link href="/informatique">Informatique</Link>
            </li>
            <li>
              <Link href="/telecom">Télécom</Link>
            </li>
            <li>
              <Link href="/securite">Sécurité</Link>
            </li>
          </ul>
        </li>
        <li>
              <Link href="/telemaintenance">Télémaintenance</Link>
            </li>
        <li>
          <Link href="/contact">Contactez-nous</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

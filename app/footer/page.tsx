import "./footer.scss";
import Link from "next/link";
import React from "react";

function Footer() {

  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_description">
          <li>
            <Link href="/">Accueil</Link>
          </li>
          <li>
            <Link href="/logiciels">Nos logiciels / Formations</Link>
          </li>
          <li>
            <Link href="/nosServices">Nos Services</Link>
          </li>
          <a href="https://www.islonline.com/fr/fr/join/" target="_blank" rel="noopener noreferrer">
            Télémaintenance
          </a>
          <li>
            <Link href="/contact">Contactez nous</Link>
          </li>
        </div>
        <div className="copyright_sli">
          <p>475 Route des Vernes,</p>
          <p>74370 Annecy</p>
          <p>04.50.64.02.33</p>
        </div>
        <div className="copyright_sli">
          <p>
            <Link href="/conditionsGeneralesVente">
              Conditions Générales de Vente
            </Link>
          </p>
        </div>
        <div className="copyright_sli">
          <p>
            Solution Logique Informatique © 2022 - {year}
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

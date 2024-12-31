import "./footer.scss";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer_description">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <Link to="/logicielsEbp">
            <li>Nos logiciels / Formations</li>
          </Link>
          <Link to="/nosServices">
            <li>Nos Services</li>
          </Link>
          <a href="https://www.islonline.com/fr/fr/join/" target="blank">
            Télémaintenance
          </a>
          <Link to="/contact">
            <li>Contactez nous</li>
          </Link>
        </div>
        <div className="copyright_sli">
          <p>475 Route des Vernes,</p>
          <p>74370 Annecy</p>
          <p>04.50.64.02.33</p>
        </div>
        <div className="copyright_sli">
          <Link to="/conditionsGeneralesVente">
            <p className="copyright_sli_bot">Conditions générales Vente</p>
          </Link>
        </div>
        <div className="copyright_sli">
          <p className="copyright_sli_bot">
            Solution Logique Informatique © 2024
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

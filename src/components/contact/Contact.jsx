import React  from "react";
import "./contact.scss";

function Contact() {
  return (
    <div className="container">
      <div className="home_conseils_sli">
        <div className="home_conseils_sli_left">
          <img
            className="img_right_side"
            alt="logo_solution_logique_informatique"
            src="assets/assistance.webp"
          ></img>
        </div>
        <div className="home_conseils_sli_right">
          <h1>Besoin de plus d'informations ?</h1>
          <a
            href="mailto:ebp@solution-logique.fr"
            className="btn_help btn_help_right"
            target="blank"
          >
            Envoyez un mail
          </a>
        </div>
      </div>
      <div className="contact_form_sli">
        <iframe title="iframe_sli_map"
          className="google_map_sli"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2774.5863184807336!2d6.126918815830903!3d45.93956730961823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b8fac0b9e7fbf%3A0x857a5fad72b9eb0!2sSolution%20Logique%20Informatique!5e0!3m2!1sfr!2sfr!4v1651504531648!5m2!1sfr!2sfr"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        
      </div>
    </div>
  );
}

export default Contact;

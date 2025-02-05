import Image from "next/image";
import "./formationcompta.scss";
import React from "react";

function FormationCompta() {
  return (
    <div className="container">
      <h1>FORMATION AU LOGICIEL EBP COMPTABILITE</h1>
      <div className="logo_formation">
        <Image
          className="device_sli"
          alt="logo_solution_logique_informatique"
          src="/assets/EBP_Compta-Gesco.PNG"
          width={300}
          height={300} 
        />
      </div>
      <div className="home_conseils_sli">
        <div className="home_conseils_sli_left">
          <Image
            className="img_right_side"
            alt="logo_solution_logique_informatique"
            src="/assets/formations_ebp.webp"
            width={400}
            height={300}
          />
        </div>
        <div className="home_conseils_sli_right">
          <h1>Notre programme Comptabilité</h1>
          <h2>Vous voulez en savoir plus ?</h2>
          <p>
            Accédez à notre programme EBP comptabilité, une formation complète
            et personnalisée pour enrichir vos compétences.
          </p>
          <a
            href="/assets/Programme_Comptabilite_NivInitial.pdf"
            className="btn_help btn_help_right"
            target="_blank"
            rel="noopener noreferrer"
          >
            En savoir plus
          </a>
        </div>
      </div>
    </div>
  );
}

export default FormationCompta;

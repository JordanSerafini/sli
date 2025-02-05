import Image from "next/image";
import "./formationcommerciale.scss";
import React from "react";

function FormationCommerciale() {
  return (
    <div className="container">
      <h1>FORMATION AU LOGICIEL EBP GESTION COMMERCIALE</h1>
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
          <h1>Notre programme Gestion commerciale</h1>
          <h2>Vous voulez en savoir plus ?</h2>
          <p>
            Accédez à notre programme EBP Gestion commerciale, une formation
            complète et personnalisée pour enrichir vos compétences.
          </p>
          <a
            href="/assets/Programme_GestionCommerciale_NivInitial.pdf" // Place le PDF dans "public/assets"
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

export default FormationCommerciale;

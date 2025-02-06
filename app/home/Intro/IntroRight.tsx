import "./intro.scss";
import Image from "next/image";
import React from "react";

function IntroRight() {
  return (
    <div className="home_container_right_side">
      
      {/* Contenu Texte */}
      <div className="right_content">
        <h1>Apporteur de solution informatique</h1>
        <p>
          Intégrateur de solutions complètes et prestataire de services en conseils informatiques, 
          nous innovons quotidiennement pour les PME, PMI, TPE, indépendants, collectivités et associations.
        </p>
      </div>

      {/* Contenu Image */}
      <div className="right_image">
        <Image
          className="img_right_side"
          alt="Solution Informatique"
          src="/assets/solution.webp"
          width={300}
          height={375}
          style={{ width: "100%", height: "auto" }}
          priority
        />
      </div>
    </div>
  );
}

export default IntroRight;
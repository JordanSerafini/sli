"use client";

import React, { useState } from "react";
import "./telemaintenance.scss";

function ISLInput() {
  const [code, setCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim() === "") {
      alert("Veuillez entrer un code valide.");
      return;
    }
    // Redirection avec le bon format d'URL incluant le #
    const url = `https://www.islonline.com/fr/fr/join/#${code}`;
    window.open(url, "_blank");
  };

  return (
    <div className="isl-container">
      <h2>Connexion à la télémaintenance</h2>
      <p>
        Entrez votre code de connexion pour permettre à notre équipe
        d&apos;accéder à votre session.
      </p>
      <form onSubmit={handleSubmit} className="isl-form">
        <label htmlFor="code">Code de connexion :</label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez le code ISL"
          required
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default ISLInput;

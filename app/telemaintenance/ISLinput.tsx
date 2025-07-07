"use client";

import { useState } from "react";
import "./telemaintenance.scss";

export default function IslClient() {
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      alert("Veuillez entrer un code valide.");
      return;
    }

    // Appel à l'API locale pour télécharger le fichier
    const downloadUrl = `/api/islClient?code=${code}`;
    const a = document.createElement("a");
    a.href = downloadUrl;
    a.download = `isl-client-${code}.exe`;
    a.click();
  };

  return (
    <div className="isl-container">
      <h2>Connexion à la télémaintenance</h2>
      <p>
        Entrez votre code de connexion pour télécharger l&apos;application ISL
        spécifique.
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
        <button type="submit">Télécharger</button>
      </form>
    </div>
  );
}

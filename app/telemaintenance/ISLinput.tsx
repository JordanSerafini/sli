"use client";

import { useState } from "react";
import "./telemaintenance.scss";

export default function IslClient() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Veuillez entrer un code valide.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Appel à l'API locale pour télécharger le fichier
      const downloadUrl = `/api/islClient?code=${code}`;
      
      // Créer un lien de téléchargement
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `isl-light-client-${code}.exe`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      // Message de succès
      setError(null);
      
    } catch (err) {
      setError("Erreur lors du téléchargement. Veuillez réessayer.");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="isl-container">
      <h2>Connexion à la télémaintenance</h2>
      <div className="isl-instructions">
        <p>
          <strong>Instructions :</strong>
        </p>
        <ol>
          <li>Entrez votre code de connexion ci-dessous</li>
          <li>Téléchargez l&apos;application ISL Light Client</li>
          <li>Lancez l&apos;application téléchargée</li>
          <li>Entrez le même code dans l&apos;application</li>
          <li>Cliquez sur "Se connecter"</li>
        </ol>
      </div>
      
      <form onSubmit={handleSubmit} className="isl-form">
        <label htmlFor="code">Code de connexion :</label>
        <input
          type="text"
          id="code"
          name="code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Entrez le code ISL (ex: 123456789)"
          required
          disabled={isLoading}
        />
        
        {error && (
          <div className="error-message" style={{ color: 'red', marginTop: '10px' }}>
            {error}
          </div>
        )}
        
        <button type="submit" disabled={isLoading || !code.trim()}>
          {isLoading ? "Téléchargement..." : "Télécharger ISL Light Client"}
        </button>
      </form>
      
      <div className="isl-help">
        <p>
          <strong>Problème de téléchargement ?</strong><br />
          Vous pouvez aussi télécharger directement depuis{" "}
          <a 
            href="https://www.islonline.com/downloads/isl-light-client.htm" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            le site officiel ISL Online
          </a>
        </p>
      </div>
    </div>
  );
}

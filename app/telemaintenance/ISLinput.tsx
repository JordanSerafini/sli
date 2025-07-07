"use client";

import { useState } from "react";
import { ModernCard } from "@/components/ui/modernCard";
import { ModernButton } from "@/components/ui/modernButton";
import { Input } from "@/components/ui/Input";
import { Download, ExternalLink, Shield, Monitor } from "lucide-react";

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
      const downloadUrl = `/api/islClient?code=${code}`;
      
      const a = document.createElement("a");
      a.href = downloadUrl;
      a.download = `isl-light-client-${code}.exe`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      setError(null);
      
    } catch (err) {
      setError("Erreur lors du téléchargement. Veuillez réessayer.");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Carte principale avec le formulaire */}
      <ModernCard variant="elevated" size="lg">
        <div className="text-center space-y-6">
          {/* Icône et titre */}
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-primary-100 rounded-2xl flex items-center justify-center">
              <Monitor className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">
              Connexion à la télémaintenance
            </h2>
          </div>

          {/* Formulaire */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label htmlFor="code" className="block text-sm font-medium text-foreground mb-2">
                Code de connexion
              </label>
              <Input
                type="text"
                id="code"
                name="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Entrez le code ISL (ex: 123456789)"
                required
                disabled={isLoading}
                className="text-center text-lg tracking-widest font-mono"
              />
            </div>
            
            {error && (
              <div className="bg-error/10 border border-error/20 rounded-lg p-3">
                <p className="text-error text-sm font-medium">{error}</p>
              </div>
            )}
            
            <ModernButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading || !code.trim()}
              loading={isLoading}
              icon={<Download />}
              iconPosition="left"
              className="w-full"
            >
              Télécharger ISL Light Client
            </ModernButton>
          </form>
        </div>
      </ModernCard>

      {/* Instructions */}
      <ModernCard variant="outline">
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-600" />
            </div>
            <h3 className="text-lg font-semibold text-foreground">Instructions</h3>
          </div>
          
          <ol className="space-y-2 text-foreground-muted">
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">1</span>
              <span>Entrez votre code de connexion ci-dessus</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">2</span>
              <span>Téléchargez l'application ISL Light Client</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
              <span>Lancez l'application téléchargée</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</span>
              <span>Entrez le même code dans l'application</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">5</span>
              <span>Cliquez sur "Se connecter"</span>
            </li>
          </ol>
        </div>
      </ModernCard>

      {/* Aide alternative */}
      <ModernCard variant="glass" className="bg-accent-50/50 border-accent-200">
        <div className="text-center space-y-3">
          <h4 className="font-semibold text-foreground">Problème de téléchargement ?</h4>
          <p className="text-sm text-foreground-muted">
            Vous pouvez aussi télécharger directement depuis le site officiel
          </p>
          <ModernButton
            variant="outline"
            size="sm"
            icon={<ExternalLink />}
            iconPosition="right"
            href="https://www.islonline.com/downloads/isl-light-client.htm"
            className="mt-2"
          >
            Site officiel ISL Online
          </ModernButton>
        </div>
      </ModernCard>
    </div>
  );
}

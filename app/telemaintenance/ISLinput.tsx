"use client";
import React, { useState } from "react";
import { ModernCard } from "@/components/ui/modernCard";
import { ModernButton } from "@/components/ui/modernButton";
import { Input } from "@/components/ui/Input";
import { ExternalLink, Shield, Monitor, CheckCircle } from "lucide-react";

export default function IslClient() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [islJoinUrl, setIslJoinUrl] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) {
      setError("Veuillez entrer un code valide.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setIslJoinUrl(null);
    setDownloadSuccess(false);

    try {
      // Redirection directe vers ISL avec le code
      const islJoinUrl = `https://www.islonline.com/fr/fr/join/#${code}`;
      
      // Ouvrir dans un nouvel onglet
      window.open(islJoinUrl, '_blank');
      
      setDownloadSuccess(true);
      
      // Réinitialiser le message de succès après 8 secondes
      setTimeout(() => {
        setDownloadSuccess(false);
      }, 8000);
      
    } catch (err) {
      setError("Erreur lors de la redirection. Veuillez réessayer.");
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
              <div className="bg-error/10 border border-error/20 rounded-lg p-4 space-y-3">
                <p className="text-error text-sm font-medium">{error}</p>
                {islJoinUrl && (
                  <ModernButton
                    variant="outline"
                    size="sm"
                    onClick={() => window.open(islJoinUrl, '_blank')}
                    icon={<ExternalLink />}
                    iconPosition="right"
                    className="w-full"
                  >
                    Accéder directement à ISL Online
                  </ModernButton>
                )}
              </div>
            )}

            {downloadSuccess && (
              <div className="bg-success/10 border border-success/20 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <p className="text-success text-sm font-medium">
                    Redirection effectuée ! ISL Online va se lancer automatiquement dans le nouvel onglet.
                  </p>
                </div>
              </div>
            )}
            
            <ModernButton
              type="submit"
              variant="primary"
              size="lg"
              disabled={isLoading || !code.trim()}
              loading={isLoading}
              icon={<ExternalLink />}
              iconPosition="left"
              className="w-full"
            >
              Se connecter via ISL Online
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
              <span>Cliquez sur "Se connecter" pour accéder à ISL Online</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">3</span>
              <span>ISL va automatiquement détecter votre code et lancer l'application</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">4</span>
              <span>Suivez les instructions sur la page ISL pour télécharger le client</span>
            </li>
            <li className="flex items-start space-x-3">
              <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0 mt-0.5">5</span>
              <span>Lancez l'application et la connexion se fera automatiquement</span>
            </li>
          </ol>
        </div>
      </ModernCard>

      {/* Information sécurité */}
      <ModernCard variant="glass" className="bg-success-50/50 border-success-200">
        <div className="text-center space-y-3">
          <div className="flex items-center justify-center space-x-2">
            <Shield className="w-5 h-5 text-success-600" />
            <h4 className="font-semibold text-foreground">Connexion sécurisée</h4>
          </div>
          <p className="text-sm text-foreground-muted">
            Vous êtes redirigé directement vers ISL Online avec votre code de connexion pour une expérience optimale et sécurisée.
          </p>
        </div>
      </ModernCard>
    </div>
  );
}

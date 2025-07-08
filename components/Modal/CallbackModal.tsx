import React, { useState } from 'react';
import Button from '../ui/Button';
import { Input } from '../ui/Input';
import { HoneypotField, useHoneypot } from '../security/HoneypotField';
import { getApiUrl } from '../../lib/utils';

const CallbackModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [status, setStatus] = useState<string | null>(null);
    
    // 🛡️ Protection honeypot contre les bots
    const { honeypotValue, setHoneypotValue, isBot, resetHoneypot } = useHoneypot();

    if (!isOpen) return null;
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // 🛡️ VÉRIFICATION HONEYPOT - Bot détecté
        if (isBot()) {
            setStatus("Erreur de validation. Veuillez réessayer.");
            resetHoneypot();
            setTimeout(() => setStatus(null), 2000);
            return;
        }
        
        setStatus("Envoi en cours...");

        try {
            // NOTE: This is a mock API call. Replace with your actual API endpoint.
            const response = await fetch(getApiUrl('/api/callback'), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone: phoneNumber }),
            });

            if (response.ok) {
                setStatus("Nous vous rappellerons bientôt !");
                setPhoneNumber("");
                setTimeout(() => {
                    onClose();
                    setStatus(null);
                }, 2000);
            } else {
                setStatus("Erreur lors de l'envoi. Veuillez réessayer.");
            }
        } catch {
            setStatus("Erreur réseau. Veuillez vérifier votre connexion.");
        }
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
        <div className="relative w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale">
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                aria-label="Fermer"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onClose();
                    }
                }}
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">Demande de rappel</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6" role="form">
                {/* 🛡️ Champ honeypot invisible pour piéger les bots */}
                <HoneypotField 
                    value={honeypotValue} 
                    onChange={setHoneypotValue} 
                    fieldName="company"
                />
                
                <div>
                    <label htmlFor="phone" className="sr-only">Votre numéro de téléphone</label>
                    <Input
                        type="tel"
                        id="phone"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="Votre numéro de téléphone"
                        required
                        className="w-full text-center"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <Button type="submit" className="w-full">
                        Me faire rappeler
                    </Button>
                    <Button type="button" variant="ghost" onClick={onClose}>
                        Annuler
                    </Button>
                </div>
            </form>
            {status && (
                <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">{status}</p>
            )}
        </div>
      </div>
    );
};

// Add this to your globals.css or a relevant CSS file
/*
@keyframes fade-in-scale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-fade-in-scale {
  animation: fade-in-scale 0.3s ease-out forwards;
}
*/

export default CallbackModal;
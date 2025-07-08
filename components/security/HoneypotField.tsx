'use client';

import React from 'react';

interface HoneypotFieldProps {
  value: string;
  onChange: (value: string) => void;
  fieldName?: string;
}

/**
 * Composant Honeypot - Champ invisible pour piéger les bots
 * Les bots automatiques remplissent souvent tous les champs, y compris les champs cachés
 * Si ce champ est rempli, c'est probablement un bot
 */
export const HoneypotField: React.FC<HoneypotFieldProps> = ({ 
  value, 
  onChange, 
  fieldName = 'website' 
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: '-9999px',
        top: '-9999px',
        opacity: 0,
        pointerEvents: 'none',
        height: 0,
        overflow: 'hidden',
        zIndex: -1,
      }}
      aria-hidden="true"
    >
      <label htmlFor={fieldName}>
        Laissez ce champ vide (anti-spam)
      </label>
      <input
        type="text"
        id={fieldName}
        name={fieldName}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="off"
        tabIndex={-1}
        placeholder="Ne pas remplir"
        // Attributs supplémentaires pour confondre les bots
        data-lpignore="true"
        data-form-type="other"
      />
    </div>
  );
};

/**
 * Hook pour gérer l'état honeypot
 */
export const useHoneypot = (initialValue = '') => {
  const [honeypotValue, setHoneypotValue] = React.useState(initialValue);
  
  // Fonction pour vérifier si le honeypot a été rempli (= bot détecté)
  const isBot = React.useCallback(() => {
    return honeypotValue.trim().length > 0;
  }, [honeypotValue]);

  // Fonction pour réinitialiser le honeypot
  const resetHoneypot = React.useCallback(() => {
    setHoneypotValue('');
  }, []);

  return {
    honeypotValue,
    setHoneypotValue,
    isBot,
    resetHoneypot,
  };
}; 
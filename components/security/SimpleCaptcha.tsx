'use client';

import React, { useState, useEffect } from 'react';

interface CaptchaProps {
  onVerify: (isValid: boolean) => void;
  onReset?: () => void;
  difficulty?: 'easy' | 'medium' | 'hard';
  className?: string;
}

interface MathProblem {
  question: string;
  answer: number;
}

/**
 * Composant CAPTCHA mathématique simple
 * Alternative légère aux services tiers comme hCaptcha/reCAPTCHA
 */
export const SimpleCaptcha: React.FC<CaptchaProps> = ({
  onVerify,
  onReset,
  difficulty = 'easy',
  className = '',
}) => {
  const [problem, setProblem] = useState<MathProblem>({ question: '', answer: 0 });
  const [userAnswer, setUserAnswer] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  /**
   * Générer un problème mathématique basé sur la difficulté
   */
  const generateProblem = (): MathProblem => {
    let num1: number, num2: number, operation: string, answer: number;

    switch (difficulty) {
      case 'easy':
        // Addition simple (1-10)
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        operation = '+';
        answer = num1 + num2;
        break;

      case 'medium':
        // Addition, soustraction ou multiplication simple
        num1 = Math.floor(Math.random() * 15) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        const ops = ['+', '-', '×'];
        operation = ops[Math.floor(Math.random() * ops.length)];
        
        switch (operation) {
          case '+':
            answer = num1 + num2;
            break;
          case '-':
            // S'assurer que le résultat est positif
            if (num1 < num2) [num1, num2] = [num2, num1];
            answer = num1 - num2;
            break;
          case '×':
            num2 = Math.floor(Math.random() * 5) + 1; // Garder les multiplications simples
            answer = num1 * num2;
            break;
          default:
            answer = num1 + num2;
        }
        break;

      case 'hard':
        // Problèmes plus complexes
        const complexOps = ['+', '-', '×', '÷'];
        operation = complexOps[Math.floor(Math.random() * complexOps.length)];
        
        if (operation === '÷') {
          // Division avec résultat entier
          answer = Math.floor(Math.random() * 10) + 1;
          num1 = answer * (Math.floor(Math.random() * 8) + 2);
          num2 = num1 / answer;
          [num1, num2] = [num2, num1]; // Inverser pour la présentation
        } else {
          num1 = Math.floor(Math.random() * 20) + 1;
          num2 = Math.floor(Math.random() * 15) + 1;
          
          switch (operation) {
            case '+':
              answer = num1 + num2;
              break;
            case '-':
              if (num1 < num2) [num1, num2] = [num2, num1];
              answer = num1 - num2;
              break;
            case '×':
              answer = num1 * num2;
              break;
            default:
              answer = num1 + num2;
          }
        }
        break;

      default:
        num1 = 1;
        num2 = 1;
        operation = '+';
        answer = 2;
    }

    return {
      question: `${num1} ${operation} ${num2} = ?`,
      answer,
    };
  };

  /**
   * Réinitialiser le CAPTCHA avec un nouveau problème
   */
  const resetCaptcha = () => {
    const newProblem = generateProblem();
    setProblem(newProblem);
    setUserAnswer('');
    setIsVerified(false);
    setAttempts(0);
    setIsLocked(false);
    onReset?.();
  };

  /**
   * Vérifier la réponse de l'utilisateur
   */
  const checkAnswer = () => {
    if (isLocked) return;

    const numericAnswer = parseInt(userAnswer.trim(), 10);
    const isCorrect = numericAnswer === problem.answer;

    if (isCorrect) {
      setIsVerified(true);
      onVerify(true);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Bloquer après 3 tentatives incorrectes
      if (newAttempts >= 3) {
        setIsLocked(true);
        setTimeout(() => {
          resetCaptcha();
        }, 5000); // Débloquer après 5 secondes
      } else {
        // Générer un nouveau problème après une tentative incorrecte
        setTimeout(() => {
          const newProblem = generateProblem();
          setProblem(newProblem);
          setUserAnswer('');
        }, 1000);
      }
      
      onVerify(false);
    }
  };

  /**
   * Gérer la soumission du formulaire
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    checkAnswer();
  };

  /**
   * Initialiser avec un problème au chargement
   */
  useEffect(() => {
    resetCaptcha();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  return (
    <div className={`captcha-container p-4 border border-gray-300 rounded-lg bg-gray-50 ${className}`}>
      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          🤖 Vérification anti-robot
        </label>
        
        {isLocked ? (
          <div className="text-center">
            <p className="text-red-600 font-medium">Trop de tentatives incorrectes</p>
            <p className="text-sm text-gray-500">Veuillez patienter 5 secondes...</p>
          </div>
        ) : isVerified ? (
          <div className="text-center">
            <div className="inline-flex items-center text-green-600">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Vérification réussie !
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="text-center">
              <p className="text-lg font-mono bg-white p-3 rounded border">
                {problem.question}
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Votre réponse"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!userAnswer.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Vérifier
              </button>
            </div>
            
            {attempts > 0 && !isVerified && (
              <p className="text-sm text-red-600">
                Réponse incorrecte ({attempts}/3 tentatives)
              </p>
            )}
            
            <button
              type="button"
              onClick={resetCaptcha}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              🔄 Nouveau problème
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

/**
 * Hook pour gérer l'état du CAPTCHA
 */
export const useCaptcha = (required = true) => {
  const [isVerified, setIsVerified] = useState(!required);
  const [showCaptcha, setShowCaptcha] = useState(required);

  const handleVerify = (verified: boolean) => {
    setIsVerified(verified);
  };

  const resetCaptcha = () => {
    setIsVerified(!required);
    setShowCaptcha(required);
  };

  return {
    isVerified,
    showCaptcha,
    handleVerify,
    resetCaptcha,
  };
}; 
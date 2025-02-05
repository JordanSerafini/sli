import React, { useState, useEffect } from "react";
import "./Typewriter.scss";

interface TypewriterParagraphsProps {
  texts: string[]; // Liste des paragraphes à afficher
  speed?: number; // Vitesse d'écriture par caractère
}

const TypewriterParagraphs: React.FC<TypewriterParagraphsProps> = ({ texts, speed = 50 }) => {
  const [currentIndex, setCurrentIndex] = useState(0); // Index du paragraphe en cours
  const [currentText, setCurrentText] = useState(""); // Texte en cours d'écriture
  const [isWriting, setIsWriting] = useState(false); // Contrôle si l'écriture est en cours

  useEffect(() => {
    if (currentIndex < texts.length) {
      let charIndex = 0;
      setCurrentText(""); // Réinitialise le texte du paragraphe courant
      setIsWriting(true);

      const typingInterval = setInterval(() => {
        if (charIndex < texts[currentIndex].length) {
          setCurrentText((prev) => prev + texts[currentIndex][charIndex]);
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setIsWriting(false);

          // Passe au paragraphe suivant après une petite pause
          setTimeout(() => {
            setCurrentIndex((prev) => prev + 1);
          }, 500);
        }
      }, speed);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex, texts, speed]);

  return (
    <div className="typewriter-paragraphs">
      {texts.slice(0, currentIndex).map((text, index) => (
        <p key={index}>{text}</p> // Affiche les paragraphes déjà terminés
      ))}
      {isWriting && <p>{currentText}</p>} {/* Affiche le paragraphe en cours */}
    </div>
  );
};

export default TypewriterParagraphs;

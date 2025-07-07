import { FormationTemplate } from '@/components/ui';

export default function FormationCompta() {
  return (
    <FormationTemplate
      title="Formation EBP Comptabilité"
      subtitle="Maîtrisez parfaitement le logiciel EBP Comptabilité et optimisez votre gestion comptable"
      description="Notre formation EBP Comptabilité vous permettra d'acquérir une maîtrise complète du logiciel. De la saisie des écritures à l'édition des états comptables, vous apprendrez toutes les fonctionnalités essentielles pour une gestion comptable efficace."
      logoImage="/assets/EBP_Compta-Gesco.PNG"
      formationImage="/assets/formations_ebp.webp"
      pdfUrl="/assets/Programme_Comptabilite_NivInitial.pdf"
      duration="3 jours"
      level="Débutant à intermédiaire"
      price="Sur devis"
      objectives={[
        "Maîtriser les bases de la comptabilité dans EBP",
        "Paramétrer et personnaliser le logiciel",
        "Effectuer la saisie comptable au quotidien",
        "Réaliser les opérations de fin de période",
        "Éditer les états comptables réglementaires",
        "Gérer la TVA et les déclarations fiscales"
      ]}
      program={[
        "Découverte de l'interface et paramétrage initial",
        "Création et gestion du plan comptable",
        "Saisie des écritures comptables",
        "Rapprochement bancaire et lettrage",
        "Gestion des immobilisations",
        "TVA et déclarations fiscales",
        "Clôture d'exercice et états de synthèse",
        "Sauvegarde et archivage des données"
      ]}
      prerequisites={[
        "Connaissances de base en comptabilité générale",
        "Utilisation courante de Windows",
        "Notions de base en informatique"
      ]}
      colorScheme="blue"
    />
  );
}

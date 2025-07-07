import { FormationTemplate } from '@/components/ui';
import React from 'react';

export default function FormationBatiment() {
  return (
    <FormationTemplate
      title="Formation EBP Gestion Bâtiment"
      subtitle="Maîtrisez la gestion de vos chantiers avec EBP Bâtiment Pro"
      description="Formation spécialisée pour les professionnels du BTP. Apprenez à gérer efficacement vos devis, chantiers, planning et facturation avec EBP Bâtiment. Une solution complète adaptée aux spécificités du secteur."
      logoImage="/assets/EBP_Batiment.PNG"
      formationImage="/assets/formations_ebp.webp"
      pdfUrl="/assets/Programme_GestionBatiment_NivInitial.pdf"
      duration="3 jours"
      level="Spécialisé BTP"
      price="Sur devis"
      objectives={[
        "Paramétrer EBP Bâtiment selon votre activité",
        "Créer des devis détaillés avec métrés",
        "Gérer le planning et l'avancement des chantiers",
        "Maîtriser la facturation et situations de travaux",
        "Suivre la rentabilité de vos chantiers",
        "Gérer les sous-traitants et fournisseurs"
      ]}
      program={[
        "Paramétrage spécifique BTP et bibliothèques d'ouvrages",
        "Création de devis et métrés détaillés",
        "Gestion des chantiers et planning",
        "Suivi d'avancement et situations de travaux",
        "Facturation et attachements",
        "Gestion des approvisionnements chantier",
        "Sous-traitance et co-traitance",
        "Analyse de rentabilité et tableaux de bord"
      ]}
      prerequisites={[
        "Expérience dans le secteur du BTP",
        "Connaissances en gestion de chantiers",
        "Maîtrise de base de l'informatique"
      ]}
      colorScheme="orange"
    />
  );
}

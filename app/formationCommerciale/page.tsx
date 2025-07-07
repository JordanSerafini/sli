import { FormationTemplate } from '@/components/ui';
import React from 'react';

export default function FormationCommerciale() {
  return (
    <FormationTemplate
      title="Formation EBP Gestion Commerciale"
      subtitle="Optimisez votre gestion commerciale avec EBP et boostez votre activité"
      description="Apprenez à maîtriser toutes les fonctionnalités d'EBP Gestion Commerciale pour gérer efficacement vos ventes, achats, stocks et relations clients. Une formation complète pour transformer votre approche commerciale."
      logoImage="/assets/EBP_Compta-Gesco.PNG"
      formationImage="/assets/formations_ebp.webp"
      pdfUrl="/assets/Programme_GestionCommerciale_NivInitial.pdf"
      duration="3 jours"
      level="Débutant à confirmé"
      price="Sur devis"
      objectives={[
        "Paramétrer EBP Gestion Commerciale selon vos besoins",
        "Gérer efficacement vos fichiers clients et fournisseurs",
        "Maîtriser le processus de vente complet",
        "Optimiser la gestion des stocks et approvisionnements",
        "Éditer devis, factures et documents commerciaux",
        "Analyser vos performances commerciales"
      ]}
      program={[
        "Installation et paramétrage du logiciel",
        "Création des fichiers clients et fournisseurs",
        "Gestion du catalogue articles et tarifs",
        "Cycle de vente : devis, commandes, livraisons, factures",
        "Gestion des achats et des stocks",
        "Encaissements et règlements",
        "États et statistiques commerciales",
        "Liaison avec la comptabilité"
      ]}
      prerequisites={[
        "Connaissances de base en gestion commerciale",
        "Maîtrise de l'environnement Windows",
        "Expérience en gestion d'entreprise recommandée"
      ]}
      colorScheme="green"
    />
  );
}

import { EBPTemplate } from '@/components/ui';

export default function EBPGestionCo() {
  return (
    <EBPTemplate
      title="EBP Gestion Commerciale"
      description="Optimisez votre gestion commerciale avec les solutions EBP dédiées aux ventes, achats, stocks et relation client. Des outils puissants pour développer votre chiffre d'affaires et fidéliser votre clientèle avec une gestion commerciale professionnelle et intuitive."
      category="Gestion Commerciale"
      colorScheme="green"
      softwares={[
        {
          title: "EBP Gestion Commerciale ACTIV",
          subtitle: "L'essentiel pour débuter en gestion commerciale",
          level: "Essentiel",
          features: [
            "Gestion clients et fournisseurs",
            "Catalogue articles et tarifs",
            "Devis et factures simples",
            "Suivi des stocks de base",
            "Statistiques commerciales"
          ],
          pdfLink: "ebp-logiciel-gestion-commerciale-activ-2022.pdf"
        },
        {
          title: "EBP Gestion Commerciale PRO",
          subtitle: "La solution complète pour professionnels",
          level: "Professionnel",
          popular: true,
          features: [
            "Gestion commerciale complète",
            "Cycle de vente intégral",
            "Gestion avancée des stocks",
            "Encaissements et règlements",
            "CRM et relances clients",
            "Tableaux de bord commerciaux"
          ],
          pdfLink: "ebp-logiciel-gestion-commerciale-pro-2022.pdf"
        },
        {
          title: "EBP Gestion Commerciale ELITE",
          subtitle: "L'excellence pour les experts du commerce",
          level: "Expert",
          features: [
            "Toutes fonctionnalités PRO incluses",
            "Multi-sociétés et multi-devises",
            "Gestion multi-magasins",
            "Personnalisation avancée",
            "API et connecteurs e-commerce",
            "Workflow et automatisations",
            "Reporting et analytics avancés"
          ],
          pdfLink: "ebp-logiciel-gestion-commerciale-elite-2022.pdf"
        }
      ]}
    />
  );
}

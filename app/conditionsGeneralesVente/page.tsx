import React from "react";

function ConditionsGeneralesVente() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* En-tête principal */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Conditions Générales de Vente
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez nos conditions générales de vente et de prestations de services
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sommaire collant */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <nav className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
                <h2 className="text-xl font-bold text-blue-600 mb-6 text-center">
                  📋 Sommaire
                </h2>
                <ul className="space-y-2 text-sm">
                  <li>
                    <a href="#article1" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 1 – Définitions
                    </a>
                  </li>
                  <li>
                    <a href="#article2" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 2 – Objet
                    </a>
                  </li>
                  <li>
                    <a href="#article3" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 3 – Conditions générales d'exécution
                    </a>
                  </li>
                  <li>
                    <a href="#article4" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 4 – Obligations du Prestataire
                    </a>
                  </li>
                  <li>
                    <a href="#article5" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 5 – Obligations du Client
                    </a>
                  </li>
                  <li>
                    <a href="#article6" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 6 – Prix et conditions de paiement
                    </a>
                  </li>
                  <li>
                    <a href="#article7" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 7 – Contrat de maintenance
                    </a>
                  </li>
                  <li>
                    <a href="#article7-1" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 7-1 – Durée des contrats
                    </a>
                  </li>
                  <li>
                    <a href="#article7-2" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 7-2 – Révision des prix
                    </a>
                  </li>
                  <li>
                    <a href="#article7-3" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 7-3 – Exclusions
                    </a>
                  </li>
                  <li>
                    <a href="#article8" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8 – Logiciel
                    </a>
                  </li>
                  <li>
                    <a href="#article8-1" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8-1 – Contrat maintenance EBP
                    </a>
                  </li>
                  <li>
                    <a href="#article8-2" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8-2 – Exclusion
                    </a>
                  </li>
                  <li>
                    <a href="#article8-3" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8-3 – Accès aux logiciels
                    </a>
                  </li>
                  <li>
                    <a href="#article8-4" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8-4 – Obligation du client
                    </a>
                  </li>
                  <li>
                    <a href="#article8-5" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 8-5 – Limitations de Responsabilité
                    </a>
                  </li>
                  <li>
                    <a href="#article9" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 9 – Conditions particulières
                    </a>
                  </li>
                  <li>
                    <a href="#article10" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 10 – Pénalités
                    </a>
                  </li>
                  <li>
                    <a href="#article11" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 11 – Vente de matériels
                    </a>
                  </li>
                  <li>
                    <a href="#article12" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 12 – Loi informatique et libertés
                    </a>
                  </li>
                  <li>
                    <a href="#article13" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 13 – Territoire
                    </a>
                  </li>
                  <li>
                    <a href="#article14" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 14 – Nullité
                    </a>
                  </li>
                  <li>
                    <a href="#article15" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 15 – Loi applicable
                    </a>
                  </li>
                  <li>
                    <a href="#article16" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 16 – Tribunaux compétents
                    </a>
                  </li>
                  <li>
                    <a href="#article17" className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 hover:translate-x-1">
                      Article 17 – Règlement des litiges
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Contenu principal */}
          <div className="lg:col-span-3">
            <div className="space-y-8">
              {/* Section d'introduction */}
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    CONDITIONS GÉNÉRALES DE VENTES ET DE PRESTATIONS DE SERVICES
                  </h2>
                  <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                    Applicables au 1er décembre 2011 et modifiables sans préavis
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">ENTRE LES PARTIES :</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-bold text-blue-600 mb-2">Le Client</h4>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <h4 className="font-bold text-blue-600 mb-2">Société Solution Logique</h4>
                      <p className="text-sm text-gray-600">
                        Sarl au capital social de 15 000 Euros<br />
                        RCS Annecy : 379 868 540<br />
                        475 route des Vernes 74370 Pringy<br />
                        <span className="font-semibold">Prestataire Solution Logique</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">ÉTANT PRÉALABLEMENT EXPOSÉ QUE :</h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="mb-4">
                      La société <span className="font-semibold text-blue-600">Solution logique</span> est une société de prestations de services informatiques divers tels que, notamment, dépannage, installation de logiciels et de matériels, assistance, formation, maintenance… et ce auprès des entreprises, professions libérales, administrations.
                    </p>
                    <p className="mb-4">
                      La société <span className="font-semibold text-blue-600">Solution logique</span> réalise de la vente de produits informatiques (ordinateur, imprimante, logiciels…) sur commande.
                    </p>
                    <p className="mb-4">L'offre de prestations de service de la société <span className="font-semibold text-blue-600">Solution logique</span> se décline comme suit :</p>
                    <div className="grid md:grid-cols-2 gap-3 mt-4">
                      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-blue-500">
                        <span className="text-sm">Installation et intervention (service à la carte)</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-green-500">
                        <span className="text-sm">Contrat en temps partagé (CTP)</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-purple-500">
                        <span className="text-sm">Contrat de maintenance matériel ou logiciel</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-orange-500">
                        <span className="text-sm">Contrat pack cartouche</span>
                      </div>
                      <div className="bg-white rounded-lg p-3 shadow-sm border-l-4 border-red-500">
                        <span className="text-sm">Contrat de maintenance EBP</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 1 */}
              <div id="article1" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                  Article 1 – Définitions
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p><strong>Conditions générales de Vente et de Services :</strong> le présent acte.</p>
                  <p><strong>Parties :</strong> le Client et Solution logique.</p>
                  <p><strong>Matériels :</strong> les marchandises commandées et livrées par Solution logique au Client.</p>
                  <p><strong>Prestation :</strong> toute intervention de Solution logique au domicile du Client ou en ses locaux professionnels.</p>
                  <p><strong>Installation ou Intervention :</strong> une intervention de Solution logique au domicile ou dans les locaux professionnels du Client afin de dépanner un ordinateur, une imprimante, un périphérique, Internet, un réseau…, installer un nouveau matériel ou logiciel, éradiquer un virus… et ce de façon ponctuelle (« service à la carte ») ou dans le cadre de l'achat d'un « Contrat en temps partagé » CTP.</p>
                  <p><strong>Contrat en temps partagé :</strong> un nombre d'heures de services de Solution logique acheté par le Client pour les besoins informatiques de ce dernier. Ce crédit d'intervention est géré par le Client à sa convenance et peut être utilisé pour toute opération logicielle ou matérielle, pour toute formation informatique, pour tout autre type d'assistance informatique.</p>
                  <p><strong>Vente de matériels :</strong> la commande et la livraison de matériels tels que logiciel, serveur, ordinateur, imprimante, firewall … par Solution logique au Client.</p>
                </div>
              </div>

              {/* Article 2 */}
              <div id="article2" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  Article 2 – Objet
                </h3>
                <div className="text-gray-700 leading-relaxed">
                  <p>Les Conditions générales de Vente et de Services ont pour objet d'organiser le cadre dans lequel le Client sollicite Solution logique afin d'obtenir une intervention, une installation, un Contrat en temps partagé ou une vente de matériels…</p>
                </div>
              </div>

              {/* Article 3 */}
              <div id="article3" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  Article 3 – Conditions générales d'exécution
                </h3>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <p>Les Prestations sont destinées à assister, conseiller, informer, former le Client, toutes autres personnes du même foyer ou tout subordonné du Client ; à aider à l'installation, la configuration des équipements appartenant au Client ou lui étant vendu par Solution logique ; à aider à résoudre les pannes de ces mêmes équipements.</p>
                  
                  <p>Les Prestations sont réalisées sur le lieu de résidence du Client s'il est particulier ou en ses locaux professionnels s'il s'agit d'une personne morale.</p>
                  
                  <p>Le Client se doit d'être à jour des licences d'exploitation des logiciels installés sur ses différents équipements et doit être à même de fournir tous les documents des fabricants et/ou distributeurs et/ou fournisseurs nécessaires à la réalisation des Prestations. Il n'est en aucun cas du rôle de Solution logique de vérifier cet élément.</p>
                  
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <h4 className="font-bold text-yellow-800 mb-2">⚠️ Mise en garde</h4>
                    <div className="space-y-3 text-yellow-700">
                      <p>Solution logique ne pourra assurer ses Prestations, si l'environnement physique des équipements est non-conforme aux prescriptions du constructeur et/ou distributeur et/ou fournisseur aux règles de sécurité ; si les équipements ont fait état d'une manipulation anormale (volontaire ou non) ayant modifié leurs environnements physiques ; en cas d'évènement accidentel, de force majeure ou d'une cause exonératoire limitant partiellement ou totalement l'accès aux équipements.</p>
                      
                      <p>Solution logique peut immédiatement cesser d'assurer la ou les Prestations en cours, si de l'avis raisonnable de l'intervenant, les conditions de travail au domicile ou dans les locaux professionnels du Client risquent de mettre sa sécurité en danger.</p>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <h4 className="font-bold text-red-800 mb-2">🛡️ Responsabilité des données</h4>
                    <div className="space-y-3 text-red-700">
                      <p>Le client est seul responsable des données présentes sur ses équipements. Par conséquent, il prendra toutes les précautions nécessaires pour assurer la sauvegarde de ses données personnelles. Cela signifie que les opérations de sauvegarde, quelles qu'elles soient, sont à la charge du client et non de Solution Logique.</p>
                      
                      <p>La responsabilité de Solution Logique ne peut être engagée en cas de perte totale ou partielle de données de quelque nature que ce soit.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 4 */}
              <div id="article4" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">4</span>
                  Article 4 – Obligations du Prestataire
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <p>Solution logique s'engage à fournir les moyens humains nécessaires à l'accomplissement des Prestations définies à l'Article 1 de Conditions Générales de Vente et de Services.</p>
                  
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                    <h4 className="font-bold text-blue-800 mb-2">Exonération de responsabilité</h4>
                    <p className="text-blue-700">Le Client est informé que la réalisation des Prestations entraîne une rupture de la garantie du constructeur et/ou du distributeur auprès duquel le Client a acquis ses équipements et à laquelle ne se substitue en aucun cas une garantie de Solution logique.</p>
                  </div>
                  
                  <p>De convention expresse entre les parties, Solution logique n'est soumis, au titre des présentes qu'à une <strong>obligation de moyen</strong> et en aucun cas à une obligation de résultats. Solution logique intervient uniquement sur demande expresse du Client, aussi en aucun cas Solution logique ne peut être tenu responsable des dommages directs et/ou indirects, matériels ou immatériels.</p>
                </div>
              </div>

              {/* Article 5 */}
              <div id="article5" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">5</span>
                  Article 5 – Obligations du Client
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Environnement</h4>
                      <p className="text-green-700 text-sm">Établir et entretenir un environnement physique des équipements conforme aux spécifications des fabricants</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Documentation</h4>
                      <p className="text-green-700 text-sm">Tenir à disposition l'ensemble de la documentation technique et numéros de licences</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Frais</h4>
                      <p className="text-green-700 text-sm">Prendre en charge les frais d'électricité, connexions internet et usure des consommables</p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-bold text-green-800 mb-2">✅ Information</h4>
                      <p className="text-green-700 text-sm">Informer au mieux Solution logique en cas de panne pour une intervention efficace</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article 6 */}
              <div id="article6" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">6</span>
                  Article 6 – Prix et conditions de paiement
                </h3>
                <div className="space-y-6 text-gray-700 leading-relaxed">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-bold text-amber-800 mb-2">💰 Tarification</h4>
                    <p className="text-amber-700">Tous les prix communiqués par Solution logique sont facturés selon les tarifs en vigueur au jour de la commande. Un forfait minimum sera facturé au Client selon la distance entre notre adresse (475 route des Vernes 74370 ANNECY) et l'adresse de livraison.</p>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">📅 Délai de paiement</h4>
                    <p className="text-blue-700">Sauf dispositions contraires, le délai de paiement des sommes dues est fixé au maximum le <strong>trentième jour</strong> suivant la date de réception des marchandises ou d'exécution de la prestation demandée (c. com. Art. L.441-6).</p>
                  </div>
                  
                  <p>Les versements effectués avant la livraison ou la facturation du matériel sont considérés comme acompte à valoir sur le prix définitif.</p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2">⚠️ Règlements échelonnés</h4>
                    <p className="text-red-700">Dans le cas de règlements échelonnés, le non-paiement d'une seule échéance rendra immédiatement exigible la totalité du solde restant dû, sans qu'il soit besoin d'une mise en demeure.</p>
                  </div>
                </div>
              </div>

              {/* Articles 7, 8 et suivants */}
              <div id="article7" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7</span>
                  Article 7 – Contrat de maintenance : Matériel ou logiciel
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-bold text-green-800 mb-2">🔧 Objet</h4>
                    <p className="text-green-700">Le bon fonctionnement du matériel et des programmes sont garanties pour la durée mentionnée sur le(s) contrat(s) signé(s) par le client. Cette garantie couvre les vices cachés de construction pendant un an et les défauts de matière, mais ne couvre pas les « bugs » des éditeurs de logiciels.</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2">⚠️ Résiliation anticipée</h4>
                    <p className="text-red-700">En cas de résiliation par anticipation, le client s'engage à indemniser Solution Logique. Dans tous les cas de résiliation survenant avant l'expiration du contrat, le client procédera au paiement d'une indemnité égale à la totalité des montants dus jusqu'à la date d'expiration de la période contractée (maximum de cinq ans).</p>
                  </div>
                  
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <h4 className="font-bold text-amber-800 mb-2">💰 Contrats spécifiques</h4>
                    <p className="text-amber-700">Pour les contrats CTP, pack cartouche ou maintenance hors pièces détachées : paiement en totalité en cas de résiliation anticipée. Montant minimum de 895 € HT par an sera facturé.</p>
                  </div>
                </div>
              </div>

              <div id="article7-1" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7.1</span>
                  Article 7-1 – Durée des contrats de maintenance ou abonnement
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">📅 Durée</h4>
                    <p className="text-blue-700">La durée de base du contrat est mentionnée pour une durée irrévocable maximum de <strong>CINQ ANS</strong>. À l'expiration, il sera renouvelé automatiquement pour la même durée par tacite reconduction.</p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-bold text-yellow-800 mb-2">📬 Dénonciation</h4>
                    <p className="text-yellow-700">Toute dénonciation se fera par lettre recommandée A.R reçue effectivement par l'autre partie au moins <strong>90 jours</strong> avant l'expiration de la durée initiale.</p>
                  </div>
                </div>
              </div>

              <div id="article7-2" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7.2</span>
                  Article 7-2 – Révision des prix
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h4 className="font-bold text-purple-800 mb-2">📈 Augmentation tarifaire</h4>
                    <p className="text-purple-700">À l'issue de la première période, le vendeur se réserve le droit d'augmenter ses tarifs. Si les modifications entraînent une hausse ≤ 10% du tarif en vigueur, l'augmentation s'appliquera de plein droit.</p>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-bold text-red-800 mb-2">💳 Conditions de paiement</h4>
                    <p className="text-red-700">Les factures sont payables au comptant, à réception et sans escompte. En cas de non-paiement et huit jours après mise en demeure, le contrat pourra être résilié.</p>
                  </div>
                </div>
              </div>

              <div id="article7-3" className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                  <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">7.3</span>
                  Article 7-3 – Exclusions des contrats de maintenance
                </h3>
                <div className="space-y-4 text-gray-700 leading-relaxed">
                  <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded">
                    <h4 className="font-bold text-red-800 mb-2">🚫 Exclusions</h4>
                    <div className="space-y-2 text-red-700">
                      <p>• Les virus et tous les problèmes qui en découlent</p>
                      <p>• Tout piratage informatique ou risque cyber</p>
                      <p>• Toutes erreurs ou mauvaises manipulations de l'utilisateur</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-bold text-blue-800 mb-2">✅ Prestations possibles</h4>
                    <p className="text-blue-700">Ces prestations pourront être effectuées par Solution Logique sur bon de commande validé et accepté par le client.</p>
                  </div>
                </div>
              </div>

              {/* Articles restants (8-17) */}
              {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17].map((num) => (
                <div key={num} id={`article${num}`} className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h3 className="text-2xl font-bold text-blue-600 mb-6 flex items-center">
                    <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">{num}</span>
                    Article {num} – {
                      num === 8 ? 'Logiciel' :
                      num === 9 ? 'Conditions particulières' :
                      num === 10 ? 'Pénalités' :
                      num === 11 ? 'Conditions d\'exécution propres à la commande et à la vente de matériels' :
                      num === 12 ? 'Loi informatique et libertés' :
                      num === 13 ? 'Territoire' :
                      num === 14 ? 'Nullité' :
                      num === 15 ? 'Loi applicable' :
                      num === 16 ? 'Tribunaux compétents et règlements des différends' :
                      'Règlement des litiges'
                    }
                  </h3>
                  <div className="text-gray-700 leading-relaxed">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                      <p className="text-gray-600 italic">
                        {num === 8 ? 'Conditions spécifiques relatives aux logiciels et leur maintenance.' :
                         num >= 12 ? 'Dispositions légales et juridictionnelles applicables aux présentes conditions générales.' :
                         'Conditions et obligations spécifiques relatives à cette section.'}
                      </p>
                      <p className="text-sm text-gray-500 mt-2">
                        Pour le contenu détaillé de cet article, veuillez vous référer au document contractuel complet.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Footer de contact */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl text-white p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Des questions sur nos CGV ?</h3>
                <p className="mb-6 text-blue-100">
                  Notre équipe est à votre disposition pour toute clarification concernant nos conditions générales de vente.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                  <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                    <span className="text-sm">📍 475 route des Vernes, 74370 Pringy</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur rounded-lg px-4 py-2">
                    <span className="text-sm">📞 Contactez-nous pour plus d'informations</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConditionsGeneralesVente;

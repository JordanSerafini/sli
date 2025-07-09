# 🚀 Guide de Déploiement - Site Next.js sur OVH
$env:NEXT_EXPORT="true"; npm run build

## 📋 Vue d'ensemble

Ce guide explique comment déployer le site Next.js sur votre serveur OVH de deux manières :
- **Déploiement manuel** via FileZilla
- **Déploiement automatique** via GitHub Actions

## 🛠️ Configuration du projet

Le projet est configuré pour l'export statique grâce à :
- Script `export` dans `package.json`
- Configuration conditionnelle dans `next.config.ts`
- Variable d'environnement `NEXT_EXPORT=true`
- Optimisation des images avec Next.js `<Image />`

## 📤 Méthode 1 : Déploiement Manuel (FileZilla)

### Prérequis
- FileZilla installé et configuré pour votre serveur OVH
- Accès aux identifiants FTP de votre hébergement

### Étapes

#### 1. Construction du site
```powershell
# Sur Windows (PowerShell)
$env:NEXT_EXPORT="true"; npm run build

# Sur Linux/Mac
NEXT_EXPORT=true npm run build
```

**✅ Build réussi :** 25 pages générées sans warning

#### 2. Vérification des fichiers
Après la construction, vérifiez que le dossier `out/` a été créé avec :
- `index.html` (page d'accueil)
- Dossier `_next/` (assets JS/CSS optimisés)
- Dossier `assets/` (images optimisées)
- Pages HTML pour tous les services (25 pages au total)

#### 3. Upload via FileZilla
1. **Sauvegarder l'ancien site** (recommandé)
   - Télécharger le contenu actuel de `/www` vers votre ordinateur

2. **Nettoyer le serveur**
   - Sélectionner tout le contenu dans `/www` sur le serveur
   - Supprimer les fichiers existants

3. **Transférer les nouveaux fichiers**
   - Ouvrir le dossier `out/` local
   - Sélectionner **tout le contenu** du dossier `out/` (pas le dossier lui-même)
   - Glisser-déposer vers `/www` sur le serveur
   - Attendre la fin du transfert (~210kB de JS + assets)

4. **Vérification**
   - S'assurer que `index.html` est à la racine de `/www`
   - Tester le site web
   - Vérifier que les images s'affichent correctement

## 🤖 Méthode 2 : Déploiement Automatique (GitHub Actions)

### Configuration

#### 1. Secrets GitHub à configurer
Dans les paramètres de votre repository GitHub, ajoutez :

```
FTP_HOST=your-ovh-ftp-host.com
FTP_USERNAME=your-ftp-username
FTP_PASSWORD=your-ftp-password
FTP_TARGET_DIR=/www
```

#### 2. Variables d'environnement (optionnel)
```
SITE_URL=https://solution-logique.fr
```

### Utilisation

#### Déploiement automatique
Le déploiement se déclenche automatiquement :
- À chaque push sur la branche `master`
- Le workflow `deploy-ftp.yml` se lance automatiquement
- Build + Test + Lint + Export + Upload FTP

#### Déploiement manuel
Vous pouvez aussi déclencher manuellement :
1. Aller dans l'onglet "Actions" de votre repository
2. Sélectionner "🚀 Deploy to OVH Cloud via FTP"
3. Cliquer sur "Run workflow"
4. Choisir la branche (généralement `master`)

#### Mode test (dry-run)
Pour tester sans déployer réellement :
- Le workflow est actuellement en mode `dry-run: true`
- Pour déployer réellement, mettre `dry-run: false` dans `deploy-ftp.yml`

### Workflow de développement

#### Auto-merge dev → master
Le fichier `merge-dev-to-master.yml` permet :
- Merge automatique de `dev` vers `master` à chaque push sur `dev`
- Détection automatique des conflits
- Notification en cas de problème

## 📁 Structure après déploiement

```
/www/
├── index.html                    # Page d'accueil
├── _next/                        # Assets Next.js optimisés
│   ├── static/
│   │   ├── chunks/               # JavaScript chunks (210kB)
│   │   └── css/                  # Styles optimisés
│   └── ...
├── assets/                       # Images optimisées (.webp)
│   ├── dell.webp
│   ├── stormshield.webp
│   ├── infrastructure.webp
│   └── ...
├── contact.html                  # Page contact (10.8kB)
├── informatique.html             # Page informatique (4.17kB)
├── securite.html                 # Page sécurité (4.48kB)
├── nosServices.html              # Page services (183B)
└── [autres-pages].html           # 25 pages au total
```

## ⚠️ Points d'attention

### Avant le déploiement
- [ ] Tester le build en local : `npm run build`
- [ ] Vérifier que tous les liens internes fonctionnent
- [ ] S'assurer que les images sont optimisées (Next.js Image)
- [ ] Valider le contenu avec `npm run lint`
- [ ] Lancer les tests avec `npm run test`

### Problèmes courants

#### Build qui échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules .next out
npm install
$env:NEXT_EXPORT="true"; npm run build
```

#### Images qui ne s'affichent pas
- ✅ **Résolu** : Utilisation du composant `<Image />` de Next.js
- Vérifier que `images: { unoptimized: true }` est dans `next.config.ts`
- S'assurer que les chemins d'images sont relatifs

#### Liens brisés
- Utiliser `trailingSlash: true` dans la config
- Préférer des liens relatifs aux liens absolus

#### Warnings de linting
- ✅ **Résolu** : Plus de warnings sur `<img>` vs `<Image />`
- Tous les composants utilisent maintenant `<Image />` optimisé

## 📊 Performance après optimisation

**Tailles optimisées :**
- Page d'accueil : 188B + 302kB JS partagé
- Page contact : 10.8kB 
- Page informatique : 4.17kB
- Page sécurité : 4.48kB
- JavaScript partagé : 210kB total
- **25 pages** générées automatiquement

## 🔧 Maintenance

### Mise à jour du site
1. Faire les modifications dans le code
2. Tester en local avec `npm run dev`
3. Vérifier le build avec `npm run build`
4. Commit et push sur la branche appropriée
5. Le déploiement se fait automatiquement (si configuré)

### Surveillance
- Vérifier régulièrement que le site fonctionne
- Surveiller les logs GitHub Actions en cas de problème
- Garder une sauvegarde des fichiers importants
- Monitorer les performances et la vitesse de chargement

## 📞 Aide

En cas de problème :
1. Vérifier les logs GitHub Actions
2. Tester le build en local avec la commande exacte
3. Comparer avec la version précédente fonctionnelle  
4. Vérifier la configuration FTP sur OVH
5. S'assurer que les images sont bien dans `/public/assets/`

## 🚀 Améliorations récentes

### ✅ Optimisations effectuées
- **Images optimisées** : Remplacement de `<img>` par `<Image />` Next.js
- **Build sans warnings** : Tous les problèmes de linting résolus
- **Performance améliorée** : Optimisation automatique des images
- **Export statique** : Configuration robuste pour OVH

### 📝 **Notes importantes :**
- ✅ **Build testé et fonctionnel** - 25 pages générées sans erreur
- ⚠️ Le workflow GitHub Actions est en mode test (`dry-run: true`)
- 🔧 Modifier `dry-run: false` pour activer le déploiement réel
- 💾 Conserver toujours une sauvegarde avant déploiement
- 🖼️ Toutes les images sont maintenant optimisées avec Next.js 
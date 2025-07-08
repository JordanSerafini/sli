# 🚀 Guide de Déploiement - Site Next.js sur OVH

## 📋 Vue d'ensemble

Ce guide explique comment déployer le site Next.js sur votre serveur OVH de deux manières :
- **Déploiement manuel** via FileZilla
- **Déploiement automatique** via GitHub Actions

## 🛠️ Configuration du projet

Le projet est configuré pour l'export statique grâce à :
- Script `export` dans `package.json`
- Configuration conditionnelle dans `next.config.ts`
- Variable d'environnement `NEXT_EXPORT=true`

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

#### 2. Vérification des fichiers
Après la construction, vérifiez que le dossier `out/` a été créé avec :
- `index.html` (page d'accueil)
- Dossier `_next/` (assets JS/CSS)
- Dossier `assets/` (images)
- Autres pages HTML

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
   - Attendre la fin du transfert

4. **Vérification**
   - S'assurer que `index.html` est à la racine de `/www`
   - Tester le site web

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
├── index.html              # Page d'accueil
├── _next/                  # Assets Next.js (CSS, JS)
│   ├── static/
│   └── ...
├── assets/                 # Images et médias
├── contact.html            # Page contact
├── nosServices.html        # Page services
└── ...                     # Autres pages
```

## ⚠️ Points d'attention

### Avant le déploiement
- [ ] Tester le build en local : `npm run build`
- [ ] Vérifier que tous les liens internes fonctionnent
- [ ] S'assurer que les images sont optimisées
- [ ] Valider le contenu avec `npm run lint`

### Problèmes courants

#### Build qui échoue
```bash
# Nettoyer et réinstaller
rm -rf node_modules .next out
npm install
npm run export
```

#### Images qui ne s'affichent pas
- Vérifier que `images: { unoptimized: true }` est dans `next.config.ts`
- S'assurer que les chemins d'images sont relatifs

#### Liens brisés
- Utiliser `trailingSlash: true` dans la config
- Préférer des liens relatifs aux liens absolus

## 🔧 Maintenance

### Mise à jour du site
1. Faire les modifications dans le code
2. Tester en local avec `npm run dev`
3. Commit et push sur la branche appropriée
4. Le déploiement se fait automatiquement (si configuré)

### Surveillance
- Vérifier régulièrement que le site fonctionne
- Surveiller les logs GitHub Actions en cas de problème
- Garder une sauvegarde des fichiers importants

## 📞 Aide

En cas de problème :
1. Vérifier les logs GitHub Actions
2. Tester le build en local
3. Comparer avec la version précédente fonctionnelle
4. Vérifier la configuration FTP sur OVH

---

📝 **Notes importantes :**
- Le workflow GitHub Actions est actuellement en mode test (`dry-run: true`)
- Modifier `dry-run: false` pour activer le déploiement réel
- Conserver toujours une sauvegarde avant déploiement 
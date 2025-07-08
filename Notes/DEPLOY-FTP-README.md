# 🚀 Pipeline CI/CD - Déploiement FTP vers OVH Cloud

## 📖 Vue d'ensemble

Ce pipeline GitHub Actions automatise le déploiement de votre site Next.js vers un serveur OVH Cloud via FTP. Il se déclenche automatiquement à chaque push sur la branche `master` et peut également être lancé manuellement.

## 🔄 Fonctionnement du pipeline

### Déclencheurs
- **Automatique** : Push sur la branche `master`
- **Manuel** : Via l'interface GitHub Actions avec option `skip-deploy`

### Étapes du workflow

1. **📦 Build** :
   - Installation des dépendances
   - Vérification du code (linting)
   - Exécution des tests
   - Génération des fichiers statiques (export Next.js)
   - Upload des artifacts de build

2. **🌐 Deploy** :
   - Téléchargement des fichiers de build
   - Validation des secrets FTP
   - Déploiement via FTPS sécurisé
   - Exclusion automatique des fichiers inutiles

3. **📢 Notification** :
   - Rapport du statut de déploiement
   - Gestion des erreurs

## ⚙️ Configuration des secrets GitHub

### Secrets obligatoires à configurer dans GitHub

Allez dans **Settings > Secrets and variables > Actions** de votre dépôt :

```
FTP_HOST=ftp.votre-domaine.fr
FTP_USERNAME=votre-username
FTP_PASSWORD=votre-mot-de-passe
FTP_TARGET_DIR=/www/  (ou le répertoire cible sur votre serveur)
```

### Secrets optionnels

```
SITE_URL=https://votre-site.fr  (pour l'environnement de production)
```

## 🖥️ Prérequis côté serveur OVH

### Configuration FTP requise

1. **Accès FTP activé** :
   - Connectez-vous à votre espace client OVH
   - Activez l'accès FTP dans la section "Hébergement web"

2. **Protocole FTPS** :
   - Le workflow utilise FTPS (FTP sécurisé) sur le port 21
   - Assurez-vous que FTPS est activé sur votre hébergement

3. **Permissions de fichiers** :
   - Vérifiez que votre utilisateur FTP a les droits d'écriture
   - Le répertoire cible doit être accessible en écriture

4. **Structure des répertoires** :
   ```
   /
   ├── www/          ← Répertoire web principal (ou public_html/)
   ├── logs/
   └── private/
   ```

### Informations de connexion OVH

Vous pouvez trouver vos informations FTP dans :
- **Espace client OVH** > **Hébergements web** > **Votre hébergement** > **FTP-SSH**

## 🎛️ Utilisation

### Déploiement automatique
```bash
git add .
git commit -m "feat: nouvelle fonctionnalité"
git push origin master
```

### Déploiement manuel avec skip
1. Allez dans **Actions** de votre dépôt GitHub
2. Cliquez sur **🚀 Deploy to OVH Cloud via FTP**
3. Cliquez sur **Run workflow**
4. Cochez **Skip deployment** si vous voulez juste tester le build

### Désactivation temporaire
Pour désactiver le déploiement sans supprimer le workflow :
1. Décommentez la ligne `# dry-run: true` dans le fichier `.github/workflows/deploy-ftp.yml`
2. Ou utilisez l'option "Skip deployment" lors d'un déclenchement manuel

## 🔧 Configuration avancée

### Modification du répertoire de build
Si vous changez le dossier de sortie, modifiez dans le workflow :
```yaml
path: out/  # Changez 'out' par votre dossier
```

### Exclusions de fichiers
Ajoutez des patterns dans la section `exclude` :
```yaml
exclude: |
  **/.git*
  **/node_modules/**
  **/.env*
  **/vos-fichiers-à-exclure/**
```

### Test en mode dry-run
Décommentez cette ligne pour tester sans déployer :
```yaml
# dry-run: true  → dry-run: true
```

## 🐛 Dépannage

### Erreurs courantes

1. **Secrets manquants** :
   ```
   ❌ FTP_HOST secret is missing
   ```
   → Vérifiez que tous les secrets sont configurés dans GitHub

2. **Erreur de connexion FTP** :
   ```
   Error: connect ECONNREFUSED
   ```
   → Vérifiez l'adresse du serveur et que le FTP est activé

3. **Permissions refusées** :
   ```
   Error: 550 Permission denied
   ```
   → Vérifiez les droits de votre utilisateur FTP et le répertoire cible

4. **Build failed** :
   ```
   Error: Command failed: npm run export
   ```
   → Vérifiez que votre code compile localement avec `npm run export`

### Vérifications locales

Avant de déclencher le workflow, testez localement :
```bash
npm ci
npm run lint
npm run test
npm run export
ls -la out/  # Vérifiez que les fichiers sont générés
```

## 📁 Structure des fichiers modifiés

```
sli/
├── .github/
│   └── workflows/
│       └── deploy-ftp.yml          ← Workflow principal
├── Notes/
│   └── DEPLOY-FTP-README.md        ← Cette documentation
├── next.config.ts                  ← Config export statique
└── package.json                    ← Script 'export' ajouté
```

## 🚦 Statuts de déploiement

- ✅ **Success** : Build et déploiement réussis
- ⏭️ **Skipped** : Déploiement ignoré (skip-deploy activé)
- ❌ **Failed** : Erreur de build ou de déploiement
- ⚠️ **Warning** : Statut inconnu

Le workflow est maintenant prêt ! 🎉 
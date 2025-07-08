# ✅ Checklist d'activation du déploiement

## 📋 Avant d'activer le déploiement

### 🔐 1. Configuration des secrets GitHub
- [ ] Aller dans **Settings > Secrets and variables > Actions**
- [ ] Ajouter `FTP_HOST` (ex: `ftp.solution-logique.fr`)
- [ ] Ajouter `FTP_USERNAME` (votre nom d'utilisateur FTP OVH)
- [ ] Ajouter `FTP_PASSWORD` (votre mot de passe FTP OVH)
- [ ] Ajouter `FTP_TARGET_DIR` (ex: `/www/` ou `/public_html/`)

### 🖥️ 2. Vérification serveur OVH
- [ ] Accès FTP activé dans l'espace client OVH
- [ ] FTPS (FTP sécurisé) disponible
- [ ] Répertoire cible accessible en écriture
- [ ] Test de connexion FTP manuel réussi

### 🧪 3. Tests locaux
```bash
# Tests obligatoires avant activation
npm ci                    # ✅ Installation des dépendances
npm run lint             # ✅ Vérification du code
npm run test             # ✅ Tests unitaires
npm run export           # ✅ Génération des fichiers statiques
ls -la out/              # ✅ Vérification des fichiers générés
```

## 🚀 Activation étape par étape

### Option 1: Test avec dry-run (recommandé)
1. Décommentez `dry-run: true` dans `.github/workflows/deploy-ftp.yml`
2. Faites un push sur master
3. Vérifiez les logs dans GitHub Actions
4. Si tout va bien, re-commentez `dry-run: true`

### Option 2: Déploiement manuel
1. Allez dans **Actions** > **🚀 Deploy to OVH Cloud via FTP**
2. Cliquez **Run workflow**
3. Laissez **Skip deployment** sur `false`
4. Surveillez les logs en temps réel

### Option 3: Déploiement automatique
1. Faites un simple push sur master
2. Le workflow se déclenche automatiquement
3. Surveillez la progression dans l'onglet **Actions**

## 🔍 Vérifications post-déploiement

- [ ] Site accessible à l'URL de production
- [ ] Toutes les pages se chargent correctement
- [ ] Assets statiques (images, CSS, JS) fonctionnels
- [ ] Pas d'erreurs 404 ou 500

## ⚠️ En cas de problème

### Rollback rapide
Si le déploiement échoue ou casse le site :
1. Remettez l'ancien site via FTP manuel
2. Investigez les logs du workflow GitHub
3. Corrigez le problème localement
4. Re-testez avec `npm run export`

### Désactivation d'urgence
Pour stopper les déploiements automatiques :
1. Ajoutez `dry-run: true` dans le workflow
2. Ou supprimez temporairement le fichier `.github/workflows/deploy-ftp.yml`

## 📞 Support

- 📚 Documentation complète : `Notes/DEPLOY-FTP-README.md`
- 🔧 Configuration workflow : `.github/workflows/deploy-ftp.yml`
- ⚙️ Configuration Next.js : `next.config.ts`

---

**✨ Une fois cette checklist complétée, votre pipeline CI/CD sera opérationnel !** 
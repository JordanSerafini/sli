# Test des variables Mailjet après redémarrage
curl -s http://localhost:3000/api/test-env | jq '.'

# Si les variables sont OK, vous devriez voir :
# {
#   "hasPublicKey": true,
#   "hasPrivateKey": true,
#   "publicKeyPreview": "1c3083ed...",
#   "privateKeyPreview": "95b2bb38...",
#   "timestamp": "..."
# }

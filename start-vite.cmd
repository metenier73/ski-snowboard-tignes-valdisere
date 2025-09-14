@echo off
echo Démmarrage du serveur Vite...
set NODE_OPTIONS=--openssl-legacy-provider
npx vite --port 3000 --host 0.0.0.0 --force

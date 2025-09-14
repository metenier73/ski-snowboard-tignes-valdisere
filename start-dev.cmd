@echo off
echo Démmarrage du serveur de développement...
set NODE_OPTIONS=--openssl-legacy-provider
npx vite --host 0.0.0.0 --port 3000 --debug

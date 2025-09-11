@echo off
echo Démarrage de l'application...
set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

:: Vérification de Node.js
echo Vérification de Node.js...
node -v
if %errorlevel% neq 0 (
    echo Erreur: Node.js n'est pas installé ou n'est pas dans le PATH.
    pause
    exit /b 1
)

:: Installation des dépendances
echo Installation des dépendances...
npm install
if %errorlevel% neq 0 (
    echo Erreur lors de l'installation des dépendances.
    pause
    exit /b 1
)

:: Démarrage de l'application
echo Démarrage de l'application avec Vite...
npx vite --host 0.0.0.0 --port 4000 --debug
if %errorlevel% neq 0 (
    echo Erreur lors du démarrage de l'application.
    pause
    exit /b 1
)

pause

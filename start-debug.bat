@echo off
echo === Démarrage de l'application en mode debug ===

echo.
echo [1/5] Vérification de Node.js...
node -v
if %errorlevel% neq 0 (
    echo ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo.
echo [2/5] Vérification de npm...
npm -v
if %errorlevel% neq 0 (
    echo ERREUR: npm n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo.
echo [3/5] Vérification du port 4000...
netstat -ano | findstr :4000 >nul
if %errorlevel% equ 0 (
    echo ERREUR: Le port 4000 est déjà utilisé
    echo Liste des processus utilisant le port 4000:
    netstat -ano | findstr :4000
    echo.
    echo Pour libérer le port, exécutez: taskkill /F /PID <PID>
    pause
    exit /b 1
) else (
    echo Le port 4000 est disponible
)

echo.
echo [4/5] Nettoyage du cache Vite...
if exist node_modules\.vite (
    rmdir /s /q node_modules\.vite
    echo Cache Vite nettoyé
) else (
    echo Aucun cache Vite à nettoyer
)

echo.
echo [5/5] Démarrage de l'application...
echo.
echo =========================================
echo L'application devrait démarrer maintenant...
echo Si rien ne s'affiche ci-dessous, il y a un problème avec l'exécution de Vite
echo =========================================
echo.

set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

call npx vite --host 0.0.0.0 --port 4000 --debug

if %errorlevel% neq 0 (
    echo.
    echo =========================================
    echo ERREUR: Le démarrage de l'application a échoué
    echo Code de sortie: %errorlevel%
    echo =========================================
    pause
    exit /b 1
)

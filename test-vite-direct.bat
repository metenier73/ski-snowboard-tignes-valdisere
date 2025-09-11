@echo off
setlocal enabledelayedexpansion

echo === Test de démarrage de Vite ===
echo Date: %date% %time%
echo Répertoire: %CD%
echo.

:: Vérifier si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

echo Node.js version:
node -v
echo.

echo npm version:
npm -v
echo.

:: Vérifier si le port 4000 est utilisé
echo Vérification du port 4000...
netstat -ano | findstr :4000
if %ERRORLEVEL% equ 0 (
    echo ERREUR: Le port 4000 est déjà utilisé
    pause
    exit /b 1
)

echo.
echo Démarrage de Vite avec une configuration minimale...
echo.

:: Démarrer Vite avec une configuration minimale
set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

node node_modules/vite/bin/vite.js --config vite.minimal.js --host 0.0.0.0 --port 4000 --debug

if %ERRORLEVEL% equ 0 (
    echo Vite s'est arrêté avec succès (code: %ERRORLEVEL%)
) else (
    echo ERREUR: Vite s'est arrêté avec le code %ERRORLEVEL%
)

pause

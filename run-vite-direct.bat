@echo off
setlocal enabledelayedexpansion

echo === Démarrage de Vite en mode debug ===
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

:: Afficher les versions
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

:: Démarrer Vite avec une configuration minimale
echo.
echo Démarrage de Vite avec une configuration minimale...
echo.

set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

:: Créer un fichier de configuration Vite minimal
(
  echo import { defineConfig } from 'vite'
  echo import react from '@vitejs/plugin-react'
  echo
echo export default defineConfig({
  echo   plugins: [react()],
  echo   server: {
  echo     port: 4000,
  echo     open: true,
  echo     host: true,
  echo     strictPort: true
  echo   },
  echo   clearScreen: false,
  echo   logLevel: 'info'
  echo })
) > temp-vite.config.js

:: Exécuter Vite avec la configuration minimale
node --trace-warnings node_modules/vite/bin/vite.js --config temp-vite.config.js --host 0.0.0.0 --port 4000 --debug

:: Nettoyer
if exist temp-vite.config.js del temp-vite.config.js

if %ERRORLEVEL% equ 0 (
    echo Vite s'est arrêté avec succès (code: %ERRORLEVEL%)
) else (
    echo ERREUR: Vite s'est arrêté avec le code %ERRORLEVEL%
)

pause

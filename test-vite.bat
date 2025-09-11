@echo off
set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

echo Test de démarrage de Vite...
echo Date: %date% %time%

:: Essayer de démarrer Vite avec sortie directe
npx vite --config vite.simple.js --host 0.0.0.0 --port 4000 --debug

if %ERRORLEVEL% neq 0 (
    echo Erreur lors du démarrage de Vite. Code de sortie: %ERRORLEVEL%
) else (
    echo Vite démarré avec succès.
)

pause

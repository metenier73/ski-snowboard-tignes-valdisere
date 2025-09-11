@echo off
setlocal enabledelayedexpansion

set TIMESTAMP=%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%
set TIMESTAMP=!TIMESTAMP: =0!
set LOG_FILE=vite-debug-!TIMESTAMP!.log

echo Enregistrement des logs dans !LOG_FILE!...

echo === DÉMARRAGE À %date% %time% === > "!LOG_FILE!"
echo Répertoire: %CD% >> "!LOG_FILE!"
echo Commande: node --trace-warnings node_modules/vite/bin/vite.js --host 0.0.0.0 --port 4000 --debug >> "!LOG_FILE!"

echo.
echo Démarrage de Vite avec journalisation...
echo Les logs seront enregistrés dans: !LOG_FILE!
echo.

set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

node --trace-warnings node_modules/vite/bin/vite.js --host 0.0.0.0 --port 4000 --debug >> "!LOG_FILE!" 2>&1

if %ERRORLEVEL% equ 0 (
    echo Vite s'est arrêté avec succès (code: %ERRORLEVEL%)
) else (
    echo ERREUR: Vite s'est arrêté avec le code %ERRORLEVEL%
)

echo.
echo Voir le fichier de log pour plus de détails: !LOG_FILE!
pause

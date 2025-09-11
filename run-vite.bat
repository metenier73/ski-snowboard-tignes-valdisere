@echo off
setlocal enabledelayedexpansion

echo === Démarrage de Vite avec logging ===
echo Date: %date% %time%
echo Répertoire: %CD%
echo Node: %PROGRAMFILES%\nodejs\node.exe

:: Vérifier si Node.js est installé
where node >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERREUR: Node.js n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

:: Vérifier si npm est installé
where npm >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo ERREUR: npm n'est pas installé ou n'est pas dans le PATH
    pause
    exit /b 1
)

:: Vérifier si le port 4000 est utilisé
netstat -ano | findstr :4000 >nul
if %ERRORLEVEL% equ 0 (
    echo ERREUR: Le port 4000 est déjà utilisé
    echo Liste des processus utilisant le port 4000:
    netstat -ano | findstr :4000
    echo.
    echo Pour libérer le port, exécutez: taskkill /F /PID <PID>
    pause
    exit /b 1
)

:: Créer un fichier de log avec horodatage
set LOG_FILE=vite-debug-%date:~-4,4%%date:~-10,2%%date:~-7,2%-%time:~0,2%%time:~3,2%%time:~6,2%.log
set LOG_FILE=!LOG_FILE: =0!

echo.
echo Démarrage de Vite...
echo Les logs seront enregistrés dans: !LOG_FILE!
echo.

echo ====== CONFIGURATION ====== > "!LOG_FILE!"
echo Date: %date% %time% >> "!LOG_FILE!"
echo Répertoire: %CD% >> "!LOG_FILE!"
echo Node: %PROGRAMFILES%\nodejs\node.exe >> "!LOG_FILE!"
echo Node version: >> "!LOG_FILE!"
node -v >> "!LOG_FILE!" 2>&1
echo npm version: >> "!LOG_FILE!"
npm -v >> "!LOG_FILE!" 2>&1
echo =========================== >> "!LOG_FILE!"
echo. >> "!LOG_FILE!"

:: Démarrer Vite avec redirection de la sortie
set NODE_OPTIONS=--max-old-space-size=4096
set DEBUG=vite:*

call npx vite --config vite.simple.js --host 0.0.0.0 --port 4000 --debug >> "!LOG_FILE!" 2>&1

:: Vérifier le code de sortie
if %ERRORLEVEL% equ 0 (
    echo Vite s'est arrêté avec succès (code: %ERRORLEVEL%)
) else (
    echo ERREUR: Vite s'est arrêté avec le code %ERRORLEVEL%
)

echo.
echo Voir le fichier de log pour plus de détails: !LOG_FILE!
pause

@echo off
setlocal enabledelayedexpansion

echo === Test Node.js ===

echo Test 1: Version de Node.js
node -v
echo.

echo Test 2: Sortie simple
echo console.log("Ceci est un test"); > test.js
node test.js
del test.js
echo.

echo Test 3: Création de fichier
echo Contenu du test > test-file.txt
type test-file.txt
del test-file.txt
echo.

echo Test 4: Vérification du répertoire
cd
echo Répertoire courant: %CD%
cd /d %~dp0
echo Répertoire du script: %CD%
echo.

echo Test 5: Exécution d'une commande avec redirection
echo console.log("Test de sortie"); > test-out.js
node test-out.js > output.txt 2>&1
type output.txt
del test-out.js output.txt
echo.

echo Test 6: Vérification des variables d'environnement
echo NODE_OPTIONS: %NODE_OPTIONS%
echo PATH: %PATH%
echo.

echo Test 7: Vérification de l'accès au système de fichiers
if exist package.json (
    echo Le fichier package.json existe
) else (
    echo ERREUR: Le fichier package.json n'existe pas
)
echo.

echo Test 8: Exécution d'une commande avec délai
echo console.log("Début du test"); setTimeout(() => console.log("Fin du test"), 1000); > test-timeout.js
node test-timeout.js
del test-timeout.js
echo.

echo === Fin des tests ===
pause

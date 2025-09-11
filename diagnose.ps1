Write-Host "=== Démarrage du diagnostic ===" -ForegroundColor Cyan

# Vérification de la version de Node.js
Write-Host "`n=== Vérification de Node.js ===" -ForegroundColor Yellow
$nodeVersion = node -v
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ Node.js est installé (version: $nodeVersion)" -ForegroundColor Green
} else {
    Write-Host "✗ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérification de npm
Write-Host "`n=== Vérification de npm ===" -ForegroundColor Yellow
$npmVersion = npm -v
if ($LASTEXITCODE -eq 0) {
    Write-Host "✓ npm est installé (version: $npmVersion)" -ForegroundColor Green
} else {
    Write-Host "✗ npm n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
    exit 1
}

# Vérification des dépendances
Write-Host "`n=== Vérification des dépendances ===" -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ Le dossier node_modules existe" -ForegroundColor Green
} else {
    Write-Host "✗ Le dossier node_modules n'existe pas. Installation des dépendances..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host "✗ Erreur lors de l'installation des dépendances" -ForegroundColor Red
        exit 1
    }
}

# Vérification du port 4000
Write-Host "`n=== Vérification du port 4000 ===" -ForegroundColor Yellow
$portInUse = Test-NetConnection -ComputerName localhost -Port 4000 -InformationLevel Quiet
if ($portInUse) {
    Write-Host "✗ Le port 4000 est déjà utilisé" -ForegroundColor Red
    Write-Host "Essayez de libérer le port ou d'utiliser un port différent en modifiant vite.config.js" -ForegroundColor Yellow
} else {
    Write-Host "✓ Le port 4000 est disponible" -ForegroundColor Green
}

# Nettoyage du cache Vite
Write-Host "`n=== Nettoyage du cache Vite ===" -ForegroundColor Yellow
if (Test-Path "node_modules/.vite") {
    Remove-Item -Recurse -Force "node_modules/.vite" -ErrorAction SilentlyContinue
    Write-Host "✓ Cache Vite nettoyé" -ForegroundColor Green
} else {
    Write-Host "✓ Aucun cache Vite à nettoyer" -ForegroundColor Green
}

# Démarrage de l'application en mode debug
Write-Host "`n=== Démarrage de l'application en mode debug ===" -ForegroundColor Yellow
$env:DEBUG = 'vite:*'
$process = Start-Process -FilePath "node" -ArgumentList "--trace-warnings", "node_modules/vite/bin/vite.js", "--host", "0.0.0.0", "--port", "4000", "--debug" -NoNewWindow -PassThru

# Attendre un peu pour voir les logs
Start-Sleep -Seconds 5

# Vérifier si le processus est toujours en cours d'exécution
if ($process.HasExited) {
    Write-Host "✗ Le processus s'est arrêté avec le code de sortie: $($process.ExitCode)" -ForegroundColor Red
    Write-Host "Veuillez vérifier les messages d'erreur ci-dessus." -ForegroundColor Yellow
} else {
    Write-Host "✓ L'application semble démarrée" -ForegroundColor Green
    Write-Host "Essayez d'ouvrir http://localhost:4000 dans votre navigateur" -ForegroundColor Cyan
    Write-Host "Appuyez sur Ctrl+C pour arrêter l'application" -ForegroundColor Yellow
    
    # Attendre que l'utilisateur appuie sur une touche
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    
    # Arrêter le processus
    Stop-Process -Id $process.Id -Force
}

Write-Host "`n=== Diagnostic terminé ===" -ForegroundColor Cyan

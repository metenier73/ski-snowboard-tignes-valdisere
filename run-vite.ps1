# Script pour exécuter Vite avec capture de sortie détaillée

# Configuration
$env:DEBUG = 'vite:*'
$env:NODE_OPTIONS = '--max-old-space-size=4096'

# Chemin vers le binaire Vite
$viteBin = "./node_modules/.bin/vite"

# Vérifier si le binaire Vite existe
if (-not (Test-Path $viteBin)) {
    Write-Host "Le binaire Vite n'a pas été trouvé dans node_modules/.bin/vite" -ForegroundColor Red
    exit 1
}

# Afficher les informations de débogage
Write-Host "=== Configuration ===" -ForegroundColor Cyan
Write-Host "Node: $(node -v)"
Write-Host "npm: $(npm -v)"
Write-Host "Vite: $(node $viteBin --version)"
Write-Host "DEBUG: $env:DEBUG"
Write-Host "NODE_OPTIONS: $env:NODE_OPTIONS"
Write-Host "===================" -ForegroundColor Cyan

# Exécuter Vite avec capture de sortie
Write-Host "Démarrage de Vite..." -ForegroundColor Yellow
Write-Host "===================" -ForegroundColor Cyan

# Créer un fichier de log
$logFile = "vite-debug-$(Get-Date -Format 'yyyyMMdd-HHmmss').log"

# Exécuter Vite avec redirection de sortie
$process = Start-Process -FilePath "node" `
    -ArgumentList $viteBin, "--config", "vite.simple.js", "--host", "0.0.0.0", "--port", "4000", "--debug" `
    -NoNewWindow `
    -PassThru `
    -RedirectStandardOutput ".\$logFile" `
    -RedirectStandardError ".\vite-error.log"

# Attendre un peu pour permettre le démarrage
Start-Sleep -Seconds 5

# Vérifier si le processus est toujours en cours d'exécution
if ($process.HasExited) {
    Write-Host "Vite s'est arrêté avec le code de sortie: $($process.ExitCode)" -ForegroundColor Red
    Write-Host "Veuillez vérifier les fichiers de log:"
    Write-Host "- Sortie standard: $logFile"
    Write-Host "- Erreurs: vite-error.log"
} else {
    Write-Host "Vite semble démarré (PID: $($process.Id))" -ForegroundColor Green
    Write-Host "Sortie enregistrée dans: $logFile"
    Write-Host "Essayez d'ouvrir http://localhost:4000 dans votre navigateur" -ForegroundColor Cyan
    Write-Host "Appuyez sur une touche pour arrêter..." -ForegroundColor Yellow
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    Stop-Process -Id $process.Id -Force
}

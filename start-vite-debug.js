const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Démarrage du serveur Vite avec débogage...');

// Vérifier si le fichier de configuration existe
const configFile = path.join(__dirname, 'vite.config.js');
if (!fs.existsSync(configFile)) {
  console.error('Erreur: Fichier de configuration Vite introuvable');
  process.exit(1);
}

// Options pour le processus enfant
const options = {
  cwd: __dirname,
  stdio: 'inherit',
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--max-old-space-size=4096',
    DEBUG: 'vite:*',
    FORCE_COLOR: '1',
  },
};

// Démarrer Vite
const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '3000', '--debug'], options);

vite.on('error', (error) => {
  console.error('Erreur lors du démarrage de Vite:', error);
});

vite.on('close', (code) => {
  console.log(`Vite s'est arrêté avec le code ${code}`);
});

// Capturer les signaux de terminaison
process.on('SIGINT', () => {
  console.log('Arrêt du serveur...');
  vite.kill();
  process.exit();
});

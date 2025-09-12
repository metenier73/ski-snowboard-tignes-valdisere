// Script de démarrage personnalisé pour Vite
const { spawn } = require('child_process');
const path = require('path');

console.log('Démarrage de Vite avec des options de débogage...');

// Options pour le processus enfant
const options = {
  cwd: __dirname,
  stdio: 'inherit', // Afficher la sortie dans la console actuelle
  shell: true,
  env: {
    ...process.env,
    NODE_OPTIONS: '--trace-warnings',
    DEBUG: 'vite:*',
    FORCE_COLOR: '1',
  },
};

// Démarrer Vite
const viteProcess = spawn('npx', ['vite', '--debug', '--host', '0.0.0.0', '--port', '4000'], options);

// Gérer les événements du processus
viteProcess.on('error', (error) => {
  console.error('Erreur lors du démarrage de Vite:');
  console.error(error);
  process.exit(1);
});

viteProcess.on('close', (code) => {
  console.log(`Vite s'est arrêté avec le code ${code}`);
  process.exit(code);
});

// Afficher un message si le processus est toujours en cours d'exécution après 5 secondes
setTimeout(() => {
  if (!viteProcess.killed) {
    console.log('Vite semble fonctionner...');
  }
}, 5000);

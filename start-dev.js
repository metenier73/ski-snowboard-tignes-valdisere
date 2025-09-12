const { spawn } = require('child_process');

console.log('Démarrage du serveur de développement...');

const vite = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '3000'], {
  stdio: 'inherit',
  shell: true
});

vite.on('error', (error) => {
  console.error('Erreur lors du démarrage du serveur:', error);
});

vite.on('close', (code) => {
  console.log(`Le serveur s'est arrêté avec le code ${code}`);
});

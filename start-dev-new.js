const { spawn } = require('child_process');
const path = require('path');

// Configuration
const config = {
  port: 3000,
  host: '0.0.0.0',
  open: true,
  debug: true,
  env: {
    ...process.env,
    NODE_ENV: 'development',
    VITE_APP_ENV: 'development'
  }
};

// Démarrer Vite
console.log('Démarrage du serveur de développement...');
console.log(`- Port: ${config.port}`);
console.log(`- Hôte: ${config.host}`);
console.log(`- Mode: ${config.env.NODE_ENV}`);

const viteProcess = spawn('npx', ['vite', '--port', config.port, '--host', config.host], {
  stdio: 'inherit',
  shell: true,
  env: config.env
});

viteProcess.on('error', (error) => {
  console.error('Erreur lors du démarrage du serveur:', error);
});

viteProcess.on('close', (code) => {
  console.log(`Le serveur s'est arrêté avec le code ${code}`);
});

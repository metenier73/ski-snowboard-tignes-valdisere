// Test minimaliste de Vite
console.log('Démarrage du test Vite...');

const { createServer } = require('vite');

async function startServer() {
  try {
    console.log('Création du serveur Vite...');
    const server = await createServer({
      configFile: false, // Ne pas charger de fichier de configuration
      root: __dirname,
      server: {
        port: 4000,
        strictPort: true,
        host: '0.0.0.0',
        open: true,
      },
      plugins: [
        require('@vitejs/plugin-react')(),
      ],
    });

    console.log('Démarrage du serveur Vite...');
    await server.listen();
    
    server.printUrls();
    console.log('Serveur Vite démarré avec succès!');
    
  } catch (error) {
    console.error('Erreur lors du démarrage du serveur Vite:');
    console.error(error);
    process.exit(1);
  }
}

startServer();

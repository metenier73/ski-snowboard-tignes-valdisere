const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const PUBLIC_PATH = path.join(__dirname, 'public');

// Créer le serveur HTTP
const server = http.createServer((req, res) => {
  console.log(`Requête reçue: ${req.url}`);
  
  // Gérer la racine
  if (req.url === '/') {
    const filePath = path.join(PUBLIC_PATH, 'index.html');
    serveFile(res, filePath, 'text/html');
    return;
  }
  
  // Gérer les autres fichiers
  const filePath = path.join(PUBLIC_PATH, req.url);
  const extname = path.extname(filePath);
  let contentType = 'text/html';
  
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;      
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.svg':
      contentType = 'image/svg+xml';
      break;
  }
  
  serveFile(res, filePath, contentType);
});

// Fonction utilitaire pour servir des fichiers
function serveFile(res, filePath, contentType) {
  fs.readFile(filePath, (error, content) => {
    if (error) {
      if(error.code === 'ENOENT') {
        // Fichier non trouvé
        res.writeHead(404);
        res.end('Fichier non trouvé');
        console.error(`Fichier non trouvé: ${filePath}`);
      } else {
        // Erreur du serveur
        res.writeHead(500);
        res.end(`Désolé, une erreur est survenue: ${error.code}`);
        console.error(`Erreur lors de la lecture du fichier ${filePath}: ${error.code}`);
      }
    } else {
      // Succès
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      console.log(`Fichier servi: ${filePath}`);
    }
  });
}

// Démarrer le serveur
server.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
  console.log(`Répertoire public: ${PUBLIC_PATH}`);
});

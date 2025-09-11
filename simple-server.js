const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 4000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const server = http.createServer((req, res) => {
    console.log(`Requête reçue pour: ${req.url}`);
    
    let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'test.html' : req.url);
    
    // Vérifier si le fichier existe
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            console.error(`Fichier non trouvé: ${filePath}`);
            res.statusCode = 404;
            res.end('Fichier non trouvé');
            return;
        }
        
        // Lire et servir le fichier
        fs.readFile(filePath, (err, content) => {
            if (err) {
                console.error(`Erreur de lecture du fichier: ${filePath}`, err);
                res.statusCode = 500;
                res.end('Erreur de lecture du fichier');
                return;
            }
            
            // Définir le type de contenu en fonction de l'extension du fichier
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
            
            res.setHeader('Content-Type', contentType);
            res.end(content, 'utf-8');
        });
    });
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    console.log(`Répertoire public: ${PUBLIC_DIR}`);
    console.log('Appuyez sur Ctrl+C pour arrêter le serveur');
});

// Gestion des erreurs
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Le port ${PORT} est déjà utilisé. Veuillez libérer le port ou en spécifier un autre.`);
    } else {
        console.error('Erreur du serveur:', error);
    }
    process.exit(1);
});

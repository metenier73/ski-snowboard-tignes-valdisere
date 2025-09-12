const express = require('express');
const path = require('path');
const app = express();
const PORT = 8080;

// Servir les fichiers statiques du dossier 'dist'
app.use(express.static(path.join(__dirname, 'dist')));

// Toutes les requêtes GET renvoient vers index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

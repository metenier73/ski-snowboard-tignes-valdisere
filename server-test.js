const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Servir les fichiers statiques du dossier public
app.use(express.static(path.join(__dirname, 'public')));

// Route de test
app.get('/test', (req, res) => {
  res.send('Le serveur fonctionne !');
});

// Gérer les routes SPA
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Serveur de test en cours d'exécution sur http://localhost:${port}`);
});

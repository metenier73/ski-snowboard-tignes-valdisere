// Images de la galerie (chemins locaux)
const basePath = ''; // Chemin de base vide car les images sont servies depuis la racine du site
const galleryImages = [
  // Chemins des images disponibles dans le dossier public
  `${basePath}/images/gallery/montagne.jpg`,
  `${basePath}/images/gallery/tignes1.png`,
  `${basePath}/images/gallery/tignes2.png`,
  `${basePath}/images/gallery/tignes3.png`,
  `${basePath}/images/gallery/tignes.png`,
  `${basePath}/images/gallery/tignes (5).png`
  // montagne1.jpg n'existe pas, elle a été supprimée de la liste
];

// Fonction pour obtenir une image de la galerie
export const getGalleryImage = (index) => {
  return galleryImages[index % galleryImages.length];
};

export const galleryAltTexts = [
  'Paysage montagneux enneigé',
  'Vue panoramique sur les montagnes',
  'Station de ski Tignes',
  'Paysage hivernal à Tignes',
  'Domaine skiable de Tignes',
  'Tignes sous la neige'
];

// Nombre total d'images disponibles
export const totalImages = galleryImages.length;

// Images de la galerie (chemins locaux)
const galleryImages = [
  '/images/gallery/montagne.jpg',
  '/images/gallery/aig.JPG',
  '/images/gallery/bel.JPG',
  '/images/gallery/tignes1.png',
  '/images/gallery/tignes2.png',
  '/images/gallery/tignes3.png',
  '/images/gallery/tignes.png',
  '/images/gallery/tignes1.png',
  '/images/gallery/tignes2.png',
  '/images/gallery/tignes3.png',
  '/images/gallery/tignes (5).png',
  '/images/gallery/pep.JPG',
  '/images/gallery/pepi.JPG',
  '/images/gallery/ros.JPG'
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
  'Pistes de ski ensoleillées',
  'Vue aérienne de la station',
  'Paysage alpin en hiver',
  'Télésiège de Tignes',
  'Poudreuse fraîche sur les pistes',
  'Panorama montagneux hivernal'
];

// Nombre total d'images disponibles
export const totalImages = galleryImages.length;

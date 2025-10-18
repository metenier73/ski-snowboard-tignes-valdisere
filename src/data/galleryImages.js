// Images de la galerie (chemins locaux)
const basePath = '/ski-snowboard-tignes-valdisere';
const galleryImages = [
  `${basePath}/images/gallery/montagne.jpg`,
  `${basePath}/images/gallery/aig.JPG`,
  `${basePath}/images/gallery/bel.JPG`,
  `${basePath}/images/gallery/tignes1.png`,
  `${basePath}/images/gallery/tignes2.png`,
  `${basePath}/images/gallery/tignes3.png`,
  `${basePath}/images/gallery/tignes.png`,
  `${basePath}/images/gallery/tignes1.png`,
  `${basePath}/images/gallery/tignes2.png`,
  `${basePath}/images/gallery/tignes3.png`,
  `${basePath}/images/gallery/tignes (5).png`,
  `${basePath}/images/gallery/pep.JPG`,
  `${basePath}/images/gallery/pepi.JPG`,
  `${basePath}/images/gallery/ros.JPG`
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

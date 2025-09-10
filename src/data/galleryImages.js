// Images de la galerie (directement des URLs fiables)
const galleryImages = [
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Montagnes enneigées impressionnantes
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', // Vue panoramique des Alpes
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',  // Cimes enneigées au lever du soleil
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',  // Paysage alpin hivernal
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80'   // Montagnes majestueuses
];

// Fonction pour obtenir une image de la galerie
export const getGalleryImage = (index) => {
  return galleryImages[index % galleryImages.length];
};

export const galleryAltTexts = [
  'Montagnes enneigées impressionnantes sous un ciel bleu',
  'Vue panoramique des Alpes en hiver',
  'Cimes enneigées des Alpes au lever du soleil',
  'Paysage alpin hivernal avec forêt enneigée',
  'Montagnes majestueuses sous un ciel dégagé'
];

// Nombre total d'images disponibles
export const totalImages = galleryImages.length;

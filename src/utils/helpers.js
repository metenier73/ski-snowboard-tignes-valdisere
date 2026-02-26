// Utilitaires pour l'application

// Fonction pour vérifier si un lien est actif
export const isActiveLink = (href, currentHash) => {
  if (!href || href === '#') return false;
  return href === currentHash;
};

// Fonction pour formater le numéro de téléphone
export const formatPhoneNumber = (phone) => {
  return phone.replace(/(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5');
};

// Fonction pour générer les classes CSS conditionnelles
export const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

// Fonction pour créer des délais animés
export const createDelay = (index, baseDelay = 100) => {
  return {
    style: {
      animationDelay: `${index * baseDelay}ms`
    }
  };
};

// Fonction pour générer une couleur de fond basée sur l'index
export const getGradientColor = (index) => {
  const gradients = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600',
    'from-orange-500 to-red-600',
    'from-pink-500 to-rose-600',
    'from-indigo-500 to-blue-600',
    'from-yellow-500 to-orange-600'
  ];
  return gradients[index % gradients.length];
};

// Fonction pour tronquer le texte
export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Fonction pour formater la date
export const formatDate = (date, locale = 'fr-FR') => {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Fonction pour générer un ID unique
export const generateId = (prefix = 'id') => {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
};

// Fonction pour valider un email
export const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

// Fonction pour créer des objets de traduction
export const createTranslation = (fr, en) => ({
  fr,
  en
});

// Fonction pour obtenir la traduction actuelle
export const getTranslation = (translations, currentLang) => {
  return translations[currentLang] || translations.fr;
};

export default {
  isActiveLink,
  formatPhoneNumber,
  cn,
  createDelay,
  getGradientColor,
  truncateText,
  formatDate,
  generateId,
  isValidEmail,
  createTranslation,
  getTranslation
};

/**
 * Configuration SEO pour le site de l'école de ski
 * Contient les métadonnées pour les différentes pages
 */

export const siteConfig = {
  title: "École de Ski Tignes - Val d'Isère | Cours Privés & Collectifs",
  titleTemplate: "%s | École de Ski Tignes - Val d'Isère",
  description: "Monitrice diplômée d'État propose des cours de ski et snowboard sur le domaine de l'Espace Killy. Débutants à experts, enfants et adultes. Réservez votre cours personnalisé !",
  siteUrl: "https://votresite.com",
  defaultImage: "/images/og-default.jpg",
  twitter: {
    handle: "@votrecompte",
    site: "@votresite",
    cardType: "summary_large_image",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "École de Ski Tignes - Val d'Isère",
  },
};

// Métadonnées spécifiques à chaque page
export const pageMetadata = {
  home: {
    title: "Accueil",
    description: "Cours de ski et snowboard avec une monitrice diplômée à Tignes et Val d'Isère. Pour tous niveaux, de l'initiation au hors-piste.",
    url: "/",
    image: "/images/og-home.jpg",
  },
  gallery: {
    title: "Galerie Photos",
    description: "Découvrez nos paysages à couper le souffle et nos cours de ski sur le domaine de l'Espace Killy.",
    url: "/gallery",
    image: "/images/og-gallery.jpg",
  },
  about: {
    title: "À Propos",
    description: "Découvrez mon parcours et mon approche pédagogique pour des cours de ski et snowboard personnalisés à Tignes et Val d'Isère.",
    url: "/a-propos",
    image: "/images/og-about.jpg",
  },
  contact: {
    title: "Contact",
    description: "Réservez votre cours de ski ou snowboard à Tignes - Val d'Isère. Réponse rapide garantie !",
    url: "/contact",
    image: "/images/og-contact.jpg",
  },
};

// Données structurées pour le balisage schema.org
export const structuredData = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "name": "École de Ski Tignes - Val d'Isère",
  "description": "Cours de ski et snowboard avec une monitrice diplômée sur le domaine de l'Espace Killy.",
  "image": "https://votresite.com/images/logo.jpg",
  "telephone": "+33X XX XX XX XX",
  "email": "contact@votresite.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Rue des Pistes",
    "addressLocality": "Tignes",
    "postalCode": "73320",
    "addressCountry": "FR"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 45.4698,
    "longitude": 6.9114
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ],
      "opens": "08:30",
      "closes": "17:00"
    }
  ],
  "priceRange": "€€"
};

// Mots-clés principaux pour le référencement
export const keywords = [
  "cours de ski tignes",
  "cours snowboard val d'isère",
  "moniteur esf tignes",
  "leçons particulières ski",
  "stage ski enfant tignes",
  "hors-piste espace killy",
  "cours snowboard débutant",
  "monitrice diplômée esf",
  "location matériel ski tignes",
  "école de ski française",
  "cours privé ski",
  "apprendre à skier",
  "stage de ski adulte",
  "ski alpin tignes",
  "val d'isère ski school"
];

// Configuration pour le sitemap
export const sitemapConfig = {
  siteUrl: "https://votresite.com",
  generateRobotsTxt: true,
  exclude: ['/admin/*', '/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/admin', '/api'],
      },
    ],
  },
};

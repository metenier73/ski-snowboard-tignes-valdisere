/**
 * Base de connaissances pour le système RAG
 * Contient toutes les informations structurées sur le ski, les cours, les stations, etc.
 */

export const knowledgeBase = [
  // Informations sur Myriam
  {
    id: 'myriam-profile',
    category: 'monitrice',
    title: 'Profil de Myriam',
    content: `Myriam est une monitrice de ski diplômée avec plus de 20 ans d'expérience à Val d'Isère et Tignes. Elle enseigne le ski alpin et le snowboard aux enfants et aux adultes. Sa pédagogie personnalisée et son expertise en sécurité en montagne font d'elle une référence dans l'Espace Killy. Elle a formé plus de 4500 clients satisfaits.`,
    keywords: ['myriam', 'monitrice', 'diplômée', 'expérience', 'pédagogie'],
    metadata: {
      experience: '20+ ans',
      clients: '4500+',
      specialites: ['ski alpin', 'snowboard', 'hors-piste']
    }
  },

  // Services de cours
  {
    id: 'ski-lessons',
    category: 'services',
    title: 'Cours de Ski Alpin',
    content: `Les cours de ski alpin sont adaptés à tous les niveaux : Débutant (apprendre les bases en confiance), Intermédiaire (améliorer technique et fluidité), Avancé (perfectionnement et pistes rouges/noires). Chaque cours offre un suivi individuel pour une progression personnalisée. Les cours se déroulent à Tignes et Val d'Isère sur l'Espace Killy.`,
    keywords: ['ski', 'alpin', 'cours', 'débutant', 'intermédiaire', 'avancé', 'progression'],
    metadata: {
      niveaux: ['débutant', 'intermédiaire', 'avancé'],
      lieux: ['Tignes', 'Val d\'Isère', 'Espace Killy']
    }
  },

  {
    id: 'snowboard-lessons',
    category: 'services',
    title: 'Cours de Snowboard',
    content: `Les cours de snowboard couvrent tous les niveaux : Initiation (équilibre et premières descentes), Perfectionnement (virages frontside/backside, carving), Freestyle & hors-piste. L'enseignement est adapté selon les conditions météo et les niveaux pour une expérience sécurisée.`,
    keywords: ['snowboard', 'cours', 'initiation', 'perfectionnement', 'freestyle', 'hors-piste'],
    metadata: {
      niveaux: ['initiation', 'perfectionnement', 'freestyle'],
      techniques: ['frontside', 'backside', 'carving']
    }
  },

  {
    id: 'off-piste',
    category: 'services',
    title: 'Hors-piste Sécurisé',
    content: `Exploration sécurisée du domaine hors des pistes balisées. Inclut la découverte du hors-piste encadrée, l'apprentissage des techniques spécifiques, et la sécurité avec lecture du terrain. Équipement de sécurité recommandé : DVA, pelle, sonde.`,
    keywords: ['hors-piste', 'sécurité', 'terrain', 'DVA', 'pelle', 'sonde', 'avalanche'],
    metadata: {
      equipement: ['DVA', 'pelle', 'sonde'],
      securite: true
    }
  },

  // Informations sur les stations
  {
    id: 'tignes-info',
    category: 'stations',
    title: 'Station de Tignes',
    content: `Tignes est située à 2100m d'altitude et fait partie de l'Espace Killy avec Val d'Isère. La station ouvre généralement fin novembre et ferme début mai. Elle offre 300km de pistes, 75 remontées mécaniques, et un domaine skiable de 1550m à 3456m. Le glacier de la Grande Motte permet le ski d'été.`,
    keywords: ['tignes', 'altitude', 'espace killy', 'pistes', 'remontées', 'glacier'],
    metadata: {
      altitude: '2100m',
      pistes: '300km',
      remontees: '75',
      domaine: '1550m-3456m'
    }
  },

  {
    id: 'val-disere-info',
    category: 'stations',
    title: 'Station de Val d\'Isère',
    content: `Val d'Isère est située à 1850m d'altitude dans la vallée de la Tarentaise. Elle fait partie de l'Espace Killy avec Tignes. La station ouvre généralement début décembre et ferme début mai. Elle offre 300km de pistes, 78 remontées mécaniques, et un domaine skiable de 1550m à 3456m. Réputée pour ses pistes noires et son village authentique.`,
    keywords: ['val disere', 'altitude', 'tarentaise', 'pistes noires', 'village'],
    metadata: {
      altitude: '1850m',
      pistes: '300km',
      remontees: '78',
      domaine: '1550m-3456m'
    }
  },

  // Tarifs et réservation
  {
    id: 'tarifs-2025-2026',
    category: 'tarifs',
    title: 'Tarifs Hiver 2025-2026',
    content: `Les tarifs varient selon les périodes : Semaine 49 (30/11-06/12) : 79€/h, 495€/jour. Semaine 50 (07/12-13/12) : 89€/h, 522€/jour. Périodes de vacances scolaires et fêtes : tarifs majorés. Remise de 8% pour les cours d'après-midi. Créneaux disponibles : 09:00-13:00 et 13:00-16:30.`,
    keywords: ['tarifs', 'prix', 'cours', 'horaire', 'remise', 'vacances'],
    metadata: {
      periode: '2025-2026',
      remise: '8%',
      creneaux: ['09:00-13:00', '13:00-16:30']
    }
  },

  {
    id: 'politique-annulation',
    category: 'reservation',
    title: 'Politique d\'Annulation',
    content: `Annulation flexible : 21+ jours : remboursement 95%, pas de paiement. 14-20 jours : remboursé 50%, si non rebooké paiement 50%. ≤13 jours : pas de remboursement, si non rebooké paiement 100%. Le calendrier se rouvre automatiquement en cas d'annulation.`,
    keywords: ['annulation', 'remboursement', 'politique', 'flexible', 'calendrier'],
    metadata: {
      flexible: true,
      delais: ['21+ jours', '14-20 jours', '≤13 jours']
    }
  },

  // Conseils techniques
  {
    id: 'technique-ski',
    category: 'technique',
    title: 'Techniques de Ski',
    content: `Techniques fondamentales : appuis progressifs, regard loin devant, rythme régulier. Pour les débutants : équilibre, chasse-neige, virages élémentaires. Intermédiaires : parallélisme, carving, vitesse. Avancés : virages courts, slalom, freestyle.`,
    keywords: ['technique', 'ski', 'appuis', 'virages', 'carving', 'freestyle'],
    metadata: {
      niveaux: ['débutant', 'intermédiaire', 'avancé'],
      techniques: ['appuis', 'virages', 'carving']
    }
  },

  {
    id: 'technique-snowboard',
    category: 'technique',
    title: 'Techniques de Snowboard',
    content: `Techniques de base : posture centrée, dissociation épaules/bassin. Débutants : équilibre, glisse, premiers virages. Intermédiaires : virages frontside/backside, carving. Avancés : freestyle, grabs, rotations.`,
    keywords: ['snowboard', 'posture', 'virages', 'frontside', 'backside', 'freestyle'],
    metadata: {
      niveaux: ['débutant', 'intermédiaire', 'avancé'],
      techniques: ['posture', 'virages', 'carving', 'freestyle']
    }
  },

  // Équipement et sécurité
  {
    id: 'equipement-ski',
    category: 'equipement',
    title: 'Équipement de Ski',
    content: `Équipement de base : skis adaptés au niveau, chaussures de ski, bâtons, casque obligatoire, lunettes de soleil. Pour le hors-piste : DVA (Détecteur de Victimes d'Avalanches), pelle, sonde. Recommandé : sac airbag, gilet airbag, kit de premiers secours.`,
    keywords: ['équipement', 'skis', 'chaussures', 'casque', 'DVA', 'airbag'],
    metadata: {
      obligatoire: ['casque', 'lunettes'],
      horsPiste: ['DVA', 'pelle', 'sonde'],
      recommande: ['airbag', 'kit secours']
    }
  },

  {
    id: 'securite-montagne',
    category: 'securite',
    title: 'Sécurité en Montagne',
    content: `Règles de sécurité : consulter le bulletin d'avalanche, ne jamais partir seul en hors-piste, informer quelqu'un de son itinéraire, respecter les zones sécurisées, adapter l'itinéraire aux conditions météo. En cas d'accident : composer le 112.`,
    keywords: ['sécurité', 'avalanche', 'hors-piste', 'itinéraire', '112', 'urgences'],
    metadata: {
      regles: ['bulletin avalanche', 'ne pas partir seul', 'informer'],
      urgence: '112'
    }
  },

  // Météo et conditions
  {
    id: 'meteo-conseils',
    category: 'meteo',
    title: 'Conseils Météo',
    content: `Conseils selon les conditions : matin (pentes ensoleillées), après-midi (neiges plus souples). Consulter les bulletins météo avant de partir. En cas de brouillard : rester sur les pistes balisées. Temps variable : prévoir plusieurs couches de vêtements.`,
    keywords: ['météo', 'conditions', 'soleil', 'brouillard', 'vêtements', 'bulletins'],
    metadata: {
      moment: ['matin', 'après-midi'],
      conditions: ['soleil', 'brouillard', 'variable']
    }
  },

  // Contact et réservation
  {
    id: 'contact-info',
    category: 'contact',
    title: 'Informations de Contact',
    content: `Contact : Email meteniermyriam@yahoo.fr, Téléphone +33 7 68 10 61 07, Adresse Val d'Isère, France. Réservation via le site maison sport ou contact direct. Disponible pour questions et conseils personnalisés.`,
    keywords: ['contact', 'email', 'téléphone', 'réservation', 'maison sport'],
    metadata: {
      email: 'meteniermyriam@yahoo.fr',
      telephone: '+33 7 68 10 61 07',
      adresse: 'Val d\'Isère, France'
    }
  }
];

/**
 * Fonction pour rechercher dans la base de connaissances
 */
export function searchKnowledgeBase(query, maxResults = 5) {
  const normalizedQuery = query.toLowerCase().trim();
  
  return knowledgeBase
    .map(doc => {
      let score = 0;
      
      // Recherche dans le titre
      if (doc.title.toLowerCase().includes(normalizedQuery)) {
        score += 10;
      }
      
      // Recherche dans le contenu
      if (doc.content.toLowerCase().includes(normalizedQuery)) {
        score += 5;
      }
      
      // Recherche dans les mots-clés
      const keywordMatches = doc.keywords.filter(keyword => 
        keyword.toLowerCase().includes(normalizedQuery) ||
        normalizedQuery.includes(keyword.toLowerCase())
      );
      score += keywordMatches.length * 3;
      
      // Recherche par catégorie
      if (doc.category.toLowerCase().includes(normalizedQuery)) {
        score += 2;
      }
      
      return { ...doc, score };
    })
    .filter(doc => doc.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, maxResults);
}

/**
 * Fonction pour obtenir des documents par catégorie
 */
export function getDocumentsByCategory(category) {
  return knowledgeBase.filter(doc => doc.category === category);
}

/**
 * Fonction pour obtenir un document par ID
 */
export function getDocumentById(id) {
  return knowledgeBase.find(doc => doc.id === id);
}




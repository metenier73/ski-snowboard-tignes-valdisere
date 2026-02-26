// Constantes pour l'application

// Données des bars par station
export const BARS_DATA = {
  tignes: {
    valClaret: {
      title: {
        fr: 'Val Claret - Après-ski & Music Bars 🔥',
        en: 'Val Claret - Après-Ski & Music Bars 🔥'
      },
      icon: '🍻',
      bars: [
        {
          name: 'The Corridor | Bar & Restaurant',
          description: {
            fr: 'Après-ski classique • Bières pression • Snacks • Musique • 4,7/5',
            en: 'Classic après-ski • Draft beers • Snacks • Music • 4.7/5'
          },
          icon: '🎿',
          rating: '4.7/5'
        },
        {
          name: 'Cocorico Après Ski',
          description: {
            fr: 'Concept après-ski original • Terrasse • Piste de danse • 4,1/5',
            en: 'Original après-ski concept • Terrace • Dance floor • 4.1/5'
          },
          icon: '🎉',
          rating: '4.1/5'
        },
        {
          name: 'The Whitney Bar',
          description: {
            fr: 'Bar convivial • Ouvert en début et fin de soirée • Bonne ambiance • 4,5/5',
            en: 'Friendly bar • Open early and late evening • Good atmosphere • 4.5/5'
          },
          icon: '🍻',
          rating: '4.5/5'
        }
      ]
    },
    leLac: {
      title: {
        fr: 'Le Lac - Bars Animés 🍹',
        en: 'Le Lac - Lively Bars 🍹'
      },
      icon: '🏖️',
      bars: [
        {
          name: 'Le Studio',
          description: {
            fr: 'Bar à cocktails • Ambiance chic • Vue sur le lac • 4,6/5',
            en: 'Cocktail bar • Chic atmosphere • Lake view • 4.6/5'
          },
          icon: '🍸',
          rating: '4.6/5'
        },
        {
          name: 'Bar intérieur',
          description: {
            fr: 'Bar cosy • Feu de cheminée • Ambiance montagne • 4,4/5',
            en: 'Cozy bar • Fireplace • Mountain atmosphere • 4.4/5'
          },
          icon: '🔥',
          rating: '4.4/5'
        }
      ]
    }
  },
  valdisere: {
    center: {
      title: {
        fr: 'Centre-Ville - Bars Traditionnels 🍷',
        en: 'Downtown - Traditional Bars 🍷'
      },
      icon: '🏘️',
      bars: [
        {
          name: 'Bar Le 153',
          description: {
            fr: 'Bar historique • Ambiance authentique • Vins locaux • 4,5/5',
            en: 'Historic bar • Authentic atmosphere • Local wines • 4.5/5'
          },
          icon: '🍷',
          rating: '4.5/5'
        },
        {
          name: 'La Doudou',
          description: {
            fr: 'Bar sportif • Bières artisanales • Ambiance conviviale • 4,3/5',
            en: 'Sports bar • Craft beers • Friendly atmosphere • 4.3/5'
          },
          icon: '🍺',
          rating: '4.3/5'
        }
      ]
    }
  }
};

// Données des sports complexes
export const SPORTS_COMPLEXES = {
  tignes: {
    leLagon: {
      name: {
        fr: 'Le Lagon Tignes — Centre Aqua-Sportif & Bien-être',
        en: 'Le Lagon Tignes — Aquatic Sports & Wellness Center'
      },
      icon: '🏊',
      features: [
        {
          fr: 'Piscine olympique intérieure/extérieure',
          en: 'Olympic indoor/outdoor pool'
        },
        {
          fr: 'Espace bien-être avec sauna et hammam',
          en: 'Wellness area with sauna and hammam'
        },
        {
          fr: 'Salle de sport équipée',
          en: 'Fully equipped fitness room'
        }
      ],
      activities: [
        {
          fr: 'Natation et aquagym',
          en: 'Swimming and aqua gym'
        },
        {
          fr: 'Séances de remise en forme',
          en: 'Fitness sessions'
        },
        {
          fr: 'Détente et bien-être',
          en: 'Relaxation and wellness'
        }
      ]
    }
  },
  valdisere: {
    sportsComplex: {
      name: {
        fr: 'Sports Complex Val-d\'Isère — Centre Aqua-Sportif & Bien-être',
        en: 'Val-d\'Isère Sports Complex — Aquatic Sports & Wellness Center'
      },
      icon: '🏋️‍♀️',
      features: [
        {
          fr: 'Piscine couverte avec toboggans',
          en: 'Indoor pool with water slides'
        },
        {
          fr: 'Centre de remise en forme moderne',
          en: 'Modern fitness center'
        },
        {
          fr: 'Espace détente avec jacuzzi',
          en: 'Relaxation area with jacuzzi'
        }
      ],
      activities: [
        {
          fr: 'Cours de natation',
          en: 'Swimming lessons'
        },
        {
          fr: 'Entraînement sportif',
          en: 'Sports training'
        },
        {
          fr: 'Séances de relaxation',
          en: 'Relaxation sessions'
        }
      ]
    }
  }
};

// Constantes pour les animations
export const ANIMATION_DURATIONS = {
  fast: 'duration-200',
  normal: 'duration-300',
  slow: 'duration-500',
  slower: 'duration-700'
};

// Constantes pour les couleurs
export const COLORS = {
  primary: {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    orange: 'from-orange-500 to-orange-600'
  },
  gradient: {
    ocean: 'from-blue-400 via-cyan-400 to-teal-400',
    sunset: 'from-orange-400 via-red-400 to-pink-400',
    forest: 'from-green-400 via-emerald-400 to-teal-400',
    mountain: 'from-gray-400 via-blue-400 to-indigo-400'
  }
};

// Constantes pour les breakpoints
export const BREAKPOINTS = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px'
};

export default {
  BARS_DATA,
  SPORTS_COMPLEXES,
  ANIMATION_DURATIONS,
  COLORS,
  BREAKPOINTS
};

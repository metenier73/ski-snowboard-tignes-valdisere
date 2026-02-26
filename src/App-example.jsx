// Exemple d'utilisation des composants factorisés dans App.jsx

import React, { useState, useEffect } from 'react';
import { 
  Navigation, 
  Footer, 
  ContactInfo, 
  ServiceCard, 
  BarSection, 
  SportsComplexSection,
  BARS_DATA,
  SPORTS_COMPLEXES,
  isActiveLink
} from './components';

// Dans le composant App principal
const App = () => {
  const [currentLang, setCurrentLang] = useState('fr');
  const [currentHash, setCurrentHash] = useState('#home');
  const translations = {
    fr: {
      title: "Myriam Val d'Isère - Tignes - Les Arcs",
      subtitle: 'Votre solution professionnelle pour des vacances de rêves',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        contact: 'Contact'
      },
      contact: {
        title: 'Contactez-moi',
        description: 'Prêt à démarrer vos vacances ? Contactez-moi dès aujourd\'hui.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: "Val d'Isère, France"
      }
    },
    en: {
      title: "Myriam Val d'Isère - Tignes - Les Arcs",
      subtitle: 'Your professional solution for dream holidays',
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        contact: 'Contact'
      },
      contact: {
        title: 'Contact Me',
        description: 'Ready to start your holidays? Contact me today.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: 'Val d\'Isère, France'
      }
    }
  };

  const t = translations[currentLang];

  // Utilisation du composant Navigation factorisé
  const renderNavigation = () => (
    <Navigation 
      currentLang={currentLang}
      setCurrentLang={setCurrentLang}
      translations={translations}
    />
  );

  // Utilisation du composant ContactInfo factorisé
  const renderContactSection = () => (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t.contact.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t.contact.description}
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <ContactInfo 
            email={t.contact.email}
            phone={t.contact.phone}
            address={t.contact.address}
            currentLang={currentLang}
          />
        </div>
      </div>
    </section>
  );

  // Utilisation du composant BarSection factorisé
  const renderBarsSection = () => (
    <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12 text-center">
          {currentLang === 'fr' ? 'Bars et Vie Nocturne' : 'Bars & Nightlife'}
        </h2>
        
        <div className="space-y-8">
          {/* Section Val Claret */}
          <BarSection 
            title={BARS_DATA.tignes.valClaret.title[currentLang]}
            icon={BARS_DATA.tignes.valClaret.icon}
            bars={BARS_DATA.tignes.valClaret.bars.map(bar => ({
              ...bar,
              description: bar.description[currentLang]
            }))}
          />
          
          {/* Section Le Lac */}
          <BarSection 
            title={BARS_DATA.tignes.leLac.title[currentLang]}
            icon={BARS_DATA.tignes.leLac.icon}
            bars={BARS_DATA.tignes.leLac.bars.map(bar => ({
              ...bar,
              description: bar.description[currentLang]
            }))}
          />
        </div>
      </div>
    </section>
  );

  // Utilisation du composant SportsComplexSection factorisé
  const renderSportsComplexesSection = () => (
    <SportsComplexSection 
      title={currentLang === 'fr' ? 'Sports Complexes' : 'Sports Complexes'}
      subtitle={currentLang === 'fr' 
        ? 'Découvrez nos équipements sportifs de pointe' 
        : 'Discover our state-of-the-art sports facilities'
      }
      complexes={[
        {
          ...SPORTS_COMPLEXES.tignes.leLagon,
          name: SPORTS_COMPLEXES.tignes.leLagon.name[currentLang],
          features: SPORTS_COMPLEXES.tignes.leLagon.features.map(f => f[currentLang]),
          activities: SPORTS_COMPLEXES.tignes.leLagon.activities.map(a => a[currentLang])
        },
        {
          ...SPORTS_COMPLEXES.valdisere.sportsComplex,
          name: SPORTS_COMPLEXES.valdisere.sportsComplex.name[currentLang],
          features: SPORTS_COMPLEXES.valdisere.sportsComplex.features.map(f => f[currentLang]),
          activities: SPORTS_COMPLEXES.valdisere.sportsComplex.activities.map(a => a[currentLang])
        }
      ]}
      variant="featured"
    />
  );

  // Utilisation du composant Footer factorisé
  const renderFooter = () => (
    <Footer 
      title={t.title}
      subtitle={t.subtitle}
      currentLang={currentLang}
    />
  );

  return (
    <div className="min-h-screen bg-white">
      {renderNavigation()}
      
      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              {t.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {t.subtitle}
            </p>
          </div>
        </section>

        {renderSportsComplexesSection()}
        {renderBarsSection()}
        {renderContactSection()}
      </main>
      
      {renderFooter()}
    </div>
  );
};

export default App;

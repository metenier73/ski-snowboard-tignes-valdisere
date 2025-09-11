import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages';
import { siteConfig, pageMetadata } from '@/config/seo';

// Import des composants
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Gallery from '@/components/gallery';
import Weather from '@/components/Weather';
import Contact from '@/components/Contact';

// Import des icônes
import { Mountain, Compass, Snowflake, CloudRain, CloudSun, Cloudy, CloudHail, CloudLightning, Sun } from 'lucide-react';

const AppContent = () => {
  const [currentLang, setCurrentLang] = useState('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weather, setWeather] = useState({ tignes: null, val: null });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fonction pour obtenir l'URL d'une image de la galerie
  const getCarouselImage = (index) => getGalleryImage(index);

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Traductions
  const translations = {
    fr: {
      title: "Myriam Val d'Isère - Tignes",
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        gallery: 'Galerie',
        contact: 'Contact',
      },
      hero: {
        title: 'Cours de Ski & Snowboard',
        description: "Des cours personnalisés pour tous les niveaux dans les stations de Tignes et Val d'Isère.",
        cta: 'Réserver vos cours'
      }
    },
    en: {
      title: "Myriam Val d'Isère - Tignes",
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        gallery: 'Gallery',
        contact: 'Contact',
      },
      hero: {
        title: 'Ski & Snowboard Lessons',
        description: "Personalized lessons for all levels in Tignes and Val d'Isère resorts.",
        cta: 'Book your lessons'
      }
    }
  };

  const t = translations[currentLang];
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Fonction pour obtenir l'icône météo
  const getWeatherIcon = (weatherCode) => {
    const iconMap = {
      0: Sun,        1: CloudSun,   2: CloudSun,   3: Cloudy,    45: CloudFog,
      48: CloudFog,  51: CloudRain, 53: CloudRain, 55: CloudRain, 56: CloudHail,
      57: CloudHail, 61: CloudRain, 63: CloudRain, 65: CloudRain, 66: CloudHail,
      67: CloudHail, 71: Snowflake, 73: Snowflake, 75: Snowflake, 77: Snowflake,
      80: CloudRain, 81: CloudRain, 82: CloudRain, 85: Snowflake, 86: Snowflake,
      95: CloudLightning, 96: CloudLightning, 99: CloudLightning
    };
    
    const IconComponent = iconMap[weatherCode] || CloudSun;
    return <IconComponent className="h-6 w-6 text-blue-500" />;
  };

  return (
    <>
      <Helmet>
        <title>{pageMetadata.home.title} | {siteConfig.title}</title>
        <meta name="description" content={pageMetadata.home.description} />
        <meta property="og:title" content={`${pageMetadata.home.title} | ${siteConfig.title}`} />
        <meta property="og:description" content={pageMetadata.home.description} />
        <meta property="og:image" content={new URL(pageMetadata.home.image, siteConfig.siteUrl).toString()} />
        <meta property="og:url" content={siteConfig.siteUrl} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Header 
          currentLang={currentLang} 
          setCurrentLang={setCurrentLang} 
          t={t} 
          isMenuOpen={isMenuOpen} 
          setIsMenuOpen={setIsMenuOpen} 
        />

        <main>
          <Hero 
            t={t} 
            currentSlide={currentSlide} 
            nextSlide={nextSlide} 
            prevSlide={prevSlide} 
            getCarouselImage={getCarouselImage} 
            galleryAltTexts={galleryAltTexts} 
            totalImages={totalImages} 
          />

          <Services t={t} />
          
          <Gallery />
          
          <Weather 
            weather={weather} 
            currentLang={currentLang} 
            getWeatherIcon={getWeatherIcon} 
          />
          
          <Contact t={t} />
        </main>
      </div>
    </>
  );
};

export default AppContent;

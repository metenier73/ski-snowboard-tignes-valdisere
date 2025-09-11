import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages';
import OptimizedGallery from '@/components/gallery/OptimizedGallery';
import {
  BookOpen,
  Calendar,
  ChevronDown,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Compass,
  ImagePlus,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  ShieldAlert,
  Snowflake,
  Sun,
  X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import './App.css';

// Composant principal du contenu de l'application
const AppContent = () => {
  const [currentLang, setCurrentLang] = useState('fr');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [weather, setWeather] = useState({ tignes: null, val: null });
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Fonction pour obtenir l'URL d'une image de la galerie
  const getCarouselImage = (index) => {
    return getGalleryImage(index);
  };

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
  };

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  // Traductions
  const t = {
    title: "Myriam Val d'Isère - Tignes",
    subtitle: 'Votre solution professionnelle pour des vacances de rêve',
    nav: {
      home: 'Accueil',
      about: 'À propos',
      services: 'Services',
      blog: 'Blog',
      weather: 'Météo',
      avalanche: 'Avalanche',
      gallery: 'Galerie',
      booking: 'Réserver',
      contact: 'Contact'
    },
    hero: {
      title: 'Cours de Ski & Snowboard',
      description: "Vous cherchez à apprendre le ski ou le snowboard à Tignes – Val d'Isère, ou à perfectionner votre technique ? Faites confiance à une monitrice diplômée et expérimentée pour des cours privés adaptés à votre niveau, vos objectifs et votre rythme."
    },
    gallery: {
      title: 'Galerie Photos',
      description: 'Découvrez nos paysages à couper le souffle et nos cours en action.'
    }
  };

  return (
    <>
      <SEO 
        page="home"
        title="Cours de Ski & Snowboard à Tignes - Val d'Isère | Monitrice Diplômée"
        description="Découvrez nos cours de ski et snowboard personnalisés sur le domaine de l'Espace Killy. Pour tous niveaux, de l'initiation au hors-piste."
      />
      
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-semibold">{t.title}</span>
            </div>
            
            {/* Navigation Desktop */}
            <nav className="hidden md:flex space-x-8">
              {Object.entries(t.nav).map(([key, value]) => (
                <a key={key} href={`#${key}`} className="nav-link">
                  {value}
                </a>
              ))}
            </nav>
            
            {/* Bouton Menu Mobile */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
          
          {/* Menu Mobile */}
          {isMenuOpen && (
            <div className="md:hidden bg-white py-2">
              {Object.entries(t.nav).map(([key, value]) => (
                <a 
                  key={key} 
                  href={`#${key}`} 
                  className="block py-2 px-4 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {value}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
            <Button 
              as="a" 
              href="#contact" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              Réserver un cours
            </Button>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                {t.gallery.title}
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                {t.gallery.description}
              </p>
            </div>
            
            {/* Intégration du composant de galerie optimisé */}
            <OptimizedGallery />
            
            <div className="mt-12 text-center">
              <Button 
                as="a" 
                href="#contact" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
              >
                Réserver maintenant
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center items-center mb-4">
            <img src="/logo-white.png" alt="Logo" className="h-10 w-auto mr-2" />
            <span className="text-xl font-semibold">{t.title}</span>
          </div>
          <p className="text-gray-400">{t.subtitle}</p>
          <p className="text-gray-500 text-sm mt-4">
            © {new Date().getFullYear()} {t.title}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </>
  );
};

// Composant racine de l'application avec fournisseur de métadonnées
const App = () => {
  return (
    <HelmetProvider>
      <AppContent />
    </HelmetProvider>
  );
};

export default App;

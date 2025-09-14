import { HelmetProvider } from 'react-helmet-async';
import SEO from '@/components/seo/SEO';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages';
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

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {Object.entries(t.nav).map(([key, value]) => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {value}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>
        {/* Hero Section */}
        <section id="home" className="relative bg-gray-900 text-white">
          <div className="absolute inset-0">
            <img
              src="/images/hero-bg.jpg"
              alt="Skiing in Tignes - Val d'Isère"
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h1>
              <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
                {t.hero.description}
              </p>
              <div className="mt-10 flex justify-center space-x-4">
                <Button variant="default" size="lg">
                  Réserver maintenant
                </Button>
                <Button variant="outline" size="lg">
                  En savoir plus
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                {t.gallery.title}
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                {t.gallery.description}
              </p>
            </div>
            
            <div className="relative">
              <div className="relative h-96 overflow-hidden rounded-lg">
                <img
                  src={getCarouselImage(currentSlide)}
                  alt={galleryAltTexts[currentSlide % galleryAltTexts.length]}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
                  aria-label="Previous image"
                >
                  <ChevronDown className="h-6 w-6 transform rotate-90" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-75 p-2 rounded-full shadow-md hover:bg-opacity-100 transition"
                  aria-label="Next image"
                >
                  <ChevronDown className="h-6 w-6 transform -rotate-90" />
                </button>
              </div>
              <div className="mt-4 text-center text-sm text-gray-500">
                {currentSlide + 1} / {totalImages}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-2">
                <p className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  +33 6 12 34 56 78
                </p>
                <p className="flex items-center">
                  <Mail className="h-5 w-5 mr-2" />
                  contact@myriam-tignes-valdisere.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                {Object.entries(t.nav).map(([key, value]) => (
                  <li key={key}>
                    <a href={`#${key}`} className="hover:text-gray-300">
                      {value}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suivez-nous</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.415-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.976.045-1.505.207-1.858.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} Myriam Val d'Isère - Tignes. Tous droits réservés.</p>
          </div>
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

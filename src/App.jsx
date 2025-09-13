import Logo from '@/assets/Logo.png'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
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
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [weather, setWeather] = useState({ tignes: null, val: null })
  const [currentSlide, setCurrentSlide] = useState(0)
  
  // Fonction pour obtenir l'URL d'une image de la galerie
  const getCarouselImage = (index) => {
    try {
      const imagePath = getGalleryImage(index);
      console.log(`Chargement de l'image ${index}:`, imagePath);
      return imagePath;
    } catch (error) {
      console.error('Erreur lors du chargement de l\'image:', error);
      return '/images/fallback.jpg';
    }
  };

  // Effet pour charger les images de la galerie au montage du composant
  useEffect(() => {
    console.log('Chargement des images de la galerie...');
    console.log('Nombre total d\'images:', totalImages);
    
    // Vérifier que toutes les images existent
    for (let i = 0; i < totalImages; i++) {
      const imgPath = getCarouselImage(i);
      console.log(`Image ${i}:`, imgPath);
      
      // Précharger l'image
      const img = new Image();
      img.onload = () => console.log(`Image ${i} chargée avec succès:`, imgPath);
      img.onerror = () => console.error(`Erreur de chargement de l'image ${i}:`, imgPath);
      img.src = imgPath;
    }
  }, []);

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  // Défilement automatique
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const translations = {
    fr: {
      title: "Myriam Val d'Isère - Tignes",
      subtitle: 'Votre solution professionnelle pour des vacances de rêves',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        blog: 'Blog',
        weather: 'Météo',
        avalanche: 'Avalanche',
        gallery: 'Galerie',
        booking: 'Réserver',
      
      },
      hero: {
        title: 'Cours de Ski & Snowboard',
        description: "Vous cherchez à apprendre le ski ou le snowboard à Tignes – Val d'Isère, ou à perfectionner votre technique ? Faites confiance à une monitrice diplômée et expérimentée pour des cours privés adaptés à votre niveau, vos objectifs et votre rythme.\n\nQue vous soyez débutant, confirmé ou passionné en quête de nouvelles sensations, je vous accompagne sur les pistes mythiques de l'Espace Killy pour une expérience unique, sécurisée et personnalisée.",
        cta: 'Réserver vos cours'
      },
      about: {
        title: 'À propos de MYRIAM',
        description: "Reconnue pour mon expertise, ma pédagogie et mon attrait pour le milieu montagnard.\n\nJ’enseigne aux enfants et aux adultes les bases du ski alpin et du Snowboard. J’associe compétences pédagogiques et approche personnalisée pour m'adapter aux besoins de chacun.\n\nAu fil des années, j'ai guidé des groupes de pratiquants sur des terrains variés en enseignant les techniques avancées de ski et les principes de sécurité.\n\n",
        experience: 'Années d\'expérience',
        projects: 'Hors-pistes',
        clients: 'Clients satisfaits'
      },
      services: {
        title: 'Mes Services',
        web: {
          title: 'Cours de Ski',
          description: 'À Tignes et Val d\'Isère, des cours adaptés à chaque profil :\n\n• Débutant : apprendre les bases en confiance\n• Intermédiaire : améliorer technique et fluidité\n• Avancé : perfectionnement et pistes rouges/noires\n\nUn suivi individuel pour une progression personnalisée.'
        },
        mobile: {
          title: 'Cours de Snowboard',
          description: 'Pour tous les niveaux :\n\n• Initiation : équilibre et premières descentes\n• Perfectionnement : virages frontside/backside, carving\n• Freestyle & hors-piste\n\nSelon conditions et niveaux, pour une expérience sécurisée.'
        },
        design: {
          title: 'Hors-piste',
          description: 'Exploration sécurisée du domaine hors des pistes balisées.\n\n• Découverte du hors-piste encadrée\n• Apprentissage des techniques spécifiques\n• Sécurité et lecture du terrain\n\nMatériel de sécurité recommandé.'
        }
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
      title: "Myriam Val d'Isère - Tignes",
      subtitle: 'Your professional solution for dream holidays',
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        blog: 'Blog',
        weather: 'Weather',
        avalanche: 'Avalanche',
        gallery: 'Gallery',
        booking: 'Book',
        
      },
      hero: {
        title: 'Ski & Snowboard Lessons',
        description: 'Personalized teaching, absolute priority to safety, mindful of good practices, friendly communication in an atmosphere of trust, rigorous organization, educational innovation in constant search of new techniques.',
        cta: 'Book your lessons'
      },
      about: {
        title: 'About Me',
        description: 'Recognized for my expertise, teaching skills, and attraction to the mountain environment.\n\nI teach children and adults the basics of alpine skiing and snowboarding. I combine teaching skills and a personalized approach to adapt to everyone\'s needs.\n\nOver the years, I have guided groups of practitioners on various terrains while teaching advanced skiing techniques and safety principles.',
        experience: 'Years of experience',
        projects: 'Projects completed',
        clients: 'Satisfied clients'
      },
      services: {
        title: 'Our Services',
        web: {
          title: 'Ski Lessons',
          description: 'Learning alpine skiing for all levels'
        },
        mobile: {
          title: 'Snowboard Lessons',
          description: 'Snowboard initiation and improvement'
        },
        design: {
          title: 'Off-piste',
          description: 'Safe off-piste outings'
        }
      },
      contact: {
        title: 'Contact Me',
        description: 'Ready to start your holidays? Contact me today.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: 'Val d\'Isère, France'
      }
    }
  }

  const t = translations[currentLang]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  
  // Ferme le menu lors du clic sur un lien
  const closeMenu = () => setIsMenuOpen(false)
  
  // Ferme le menu lors du redimensionnement de la fenêtre
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Début de la récupération des données météo...');
      try {
        const endpoints = [
          {
            key: 'tignes',
            url: '/api/weather?latitude=45.468&longitude=6.909&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          },
          {
            key: 'val',
            url: '/api/weather?latitude=45.448&longitude=6.980&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          }
        ];
        
        const responses = await Promise.all(
          endpoints.map(e => 
            fetch(e.url)
              .then(response => {
                if (!response.ok) {
                  throw new Error(`Erreur HTTP: ${response.status} pour ${e.key}`);
                }
                return response.json();
              })
              .then(data => {
                console.log(`Données reçues pour ${e.key}:`, data);
                return { key: e.key, data };
              })
              .catch(error => {
                console.error(`Erreur lors de la récupération des données pour ${e.key}:`, error);
                return { key: e.key, error: error.message };
              })
          )
        );

        // Créer un objet avec les données ou les erreurs
        const weatherData = responses.reduce((acc, { key, data, error }) => {
          if (error) {
            console.error(`Erreur pour ${key}:`, error);
            acc[key] = { error };
          } else {
            acc[key] = data;
          }
          return acc;
        }, {});

        console.log('Données météo mises à jour:', weatherData);
        setWeather(weatherData);
        
      } catch (e) {
        console.error('Erreur lors de la récupération des données météo:', e);
        // Mettre à jour l'état avec l'erreur pour l'affichage
        setWeather({
          tignes: { error: 'Impossible de charger les données météo pour Tignes' },
          val: { error: 'Impossible de charger les données météo pour Val d\'Isère' }
        });
      }
    };

    // Appel initial
    fetchWeather();
    
    // Rafraîchir les données toutes les heures (3600000 ms)
    const intervalId = setInterval(fetchWeather, 3600000);
    
    // Nettoyer l'intervalle lors du démontage du composant
    return () => clearInterval(intervalId);
  }, [])

  const getWeatherIcon = (weatherCode) => {
    // Map des codes météo vers les icônes Lucide
    const iconMap = {
      0: Sun,        // Ciel dégagé
      1: CloudSun,   // Légèrement nuageux
      2: CloudSun,   // Partiellement nuageux
      3: Cloudy,     // Couvert
      45: CloudFog,  // Brouillard
      48: CloudFog,  // Brouillard givrant
      51: CloudRain, // Légère bruine
      53: CloudRain, // Bruine modérée
      55: CloudRain, // Forte bruine
      56: CloudHail, // Légère bruine verglaçante
      57: CloudHail, // Forte bruine verglaçante
      61: CloudRain, // Légère pluie
      63: CloudRain, // Pluie modérée
      65: CloudRain, // Forte pluie
      66: CloudHail, // Légère pluie verglaçante
      67: CloudHail, // Forte pluie verglaçante
      71: CloudSnow, // Légère neige
      73: CloudSnow, // Neige modérée
      75: CloudSnow, // Forte neige
      77: Snowflake, // Neige en grains
      80: CloudRain, // Légères averses
      81: CloudRain, // Averses modérées
      82: CloudRain, // Fortes averses
      85: CloudSnow, // Légères averses de neige
      86: CloudSnow, // Fortes averses de neige
      95: CloudLightning, // Orage
      96: CloudLightning, // Orage avec grêle légère
      99: CloudLightning  // Orage avec forte grêle
    };
    
    const IconComponent = iconMap[weatherCode] || CloudSun;
    return <IconComponent className="h-6 w-6 text-blue-500" />;
  };

  const renderForecast = (data, location = 'inconnu') => {
    // Vérification plus robuste des données manquantes
    if (!data || data.error || !data.daily) {
      console.log('No weather data available for', location, data?.error || 'No data');
      return (
        <div className="text-gray-500 p-4 bg-gray-50 rounded-lg">
          {data?.error || 'Chargement des données météo…'}
        </div>
      );
    }
    
    // Vérification des données quotidiennes
    const days = Array.isArray(data.daily?.time) ? data.daily.time : [];
    if (days.length === 0) {
      return (
        <div className="text-gray-500 p-4 bg-yellow-50 rounded-lg">
          Aucune donnée météo disponible pour le moment
        </div>
      );
    }
    
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          {location === 'tignes' ? (
            <Mountain className="h-5 w-5 mr-2 text-blue-600" />
          ) : (
            <Compass className="h-5 w-5 mr-2 text-blue-600" />
          )}
          {location === 'tignes' ? 'Tignes' : "Val d'Isère"}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4">
          {days.map((d, i) => {
            const tempMin = Math.round(data.daily.temperature_2m_min?.[i] || 0);
            const tempMax = Math.round(data.daily.temperature_2m_max?.[i] || 0);
            const snow = Math.round((data.daily.snowfall_sum?.[i] || 0));
            const precip = Math.round((data.daily.precipitation_sum?.[i] || 0));
            const weatherCode = data.daily.weather_code?.[i] || 0;
            
            return (
              <div key={d} className="bg-white/90 p-3 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short' })}
                </div>
                <div className="flex justify-center my-2">
                  {getWeatherIcon(weatherCode)}
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-lg font-bold text-blue-600">{tempMax}°</span>
                  <span className="text-gray-500 text-sm">{tempMin}°</span>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span className="flex items-center">
                    <Snowflake className="h-3 w-3 mr-1 text-blue-400" />
                    {snow}cm
                  </span>
                  <span className="flex items-center">
                    <CloudRain className="h-3 w-3 mr-1 text-blue-400" />
                    {precip}mm
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img src={Logo} alt="Tignes logo" className="h-16 w-16 object-contain" />
                <span className="ml-3 text-xl font-bold text-gray-900 whitespace-nowrap">
                  <span className="block text-sm font-normal text-gray-500 leading-none">Myriam</span>
                  <span>Val d'Isère - Tignes</span>
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center">
              <a href="#home" className="nav-link" onClick={closeMenu}>
                {t.nav.home}
              </a>
              <a href="#about" className="nav-link" onClick={closeMenu}>
                {t.nav.about}
              </a>
              
              {/* Menu Services déroulant */}
              <a href="#booking" className="nav-link" onClick={closeMenu}>
                {t.nav.booking}
              </a>
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.services}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#services" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Tous les services
                  </a>
                  <a href="#blog" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t.nav.blog}
                  </a>
                </div>
              </div>
              
              {/* Menu Météo déroulant */}
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.weather}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#weather" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Prévisions météo
                  </a>
                  <a href="#avalanche" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    {t.nav.avalanche}
                  </a>
                </div>
              </div>
              
              <a href="#gallery" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.gallery}
              </a>
              <a href="#contact" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.contact}
              </a>
            </nav>

            {/* Language and Contact */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <a href="#contact" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors">
                  <Mail className="h-5 w-5 mr-1" />
                  <span className="hidden lg:inline">Contact</span>
                </a>
              </div>
              
              <div className="border-l border-gray-200 h-6"></div>
              
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
              
              {/* Mobile menu button */}
              <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
                  aria-expanded={isMenuOpen}
                  aria-controls="mobile-menu"
                >
                  <span className="sr-only">Ouvrir le menu principal</span>
                  {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
              </button>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div 
              id="mobile-menu"
              className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen ? 'max-h-96' : 'max-h-0'}`}
            >
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-b-lg">
                <a
                  href="#home"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.home}
                </a>
                <a
                  href="#about"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.about}
                </a>
                <a
                  href="#booking"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.booking}
                </a>
                <a
                  href="#services"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.services}
                </a>
                <a
                  href="#blog"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.blog}
                </a>
                <a
                  href="#weather"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.weather}
                </a>
                <a
                  href="#avalanche"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.avalanche}
                </a>
                <a
                  href="#gallery"
                  onClick={closeMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {t.nav.gallery}
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          <a href="#booking">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            {t.hero.cta}
          </Button>
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.about.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto whitespace-pre-line">
              {t.about.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">20+</div>
              <div className="text-gray-600">{t.about.experience}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
              <div className="text-gray-600">{t.about.projects}</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">4 500+</div>
              <div className="text-gray-600">{t.about.clients}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.services.title}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <Mountain className="h-6 w-6 text-blue-600" />
                  <span>{t.services.web.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-pre-line">{t.services.web.description}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Snowflake className="h-6 w-6 text-blue-600" />
                  <span>{t.services.mobile.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-pre-line">{t.services.mobile.description}</CardDescription>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Compass className="h-6 w-6 text-blue-600" />
                  <span>{t.services.design.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="whitespace-pre-line">{t.services.design.description}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <Calendar className="h-7 w-7 text-blue-600" /> Réserver vos cours (Hiver 2025-2026)
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="text-gray-600">
                  <th className="py-2 pr-6">Semaine</th>
                  <th className="py-2 pr-6">Dates</th>
                  <th className="py-2 pr-6">Tarif horaire</th>
                  <th className="py-2 pr-6">Tarif journée</th>
                  <th className="py-2 pr-6">Remise après-midi</th>
                  <th className="py-2 pr-6">Créneaux</th>
                  <th className="py-2 pr-6">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {[
                  {w:'49',d:'30/11/2025 - 06/12/2025',h:'€79.00',j:'€495.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'50',d:'07/12/2025 - 13/12/2025',h:'€89.00',j:'€522.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'51',d:'14/12/2025 - 20/12/2025',h:'€100.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'52',d:'21/12/2025 - 27/12/2025',h:'€105.00',j:'€670.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'1',d:'28/12/2025 - 03/01/2026',h:'€115.00',j:'€699.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'2',d:'04/01/2026 - 10/01/2026',h:'€95.00',j:'€580.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'3',d:'11/01/2026 - 17/01/2026',h:'€92.00',j:'€590.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'4',d:'18/01/2026 - 24/01/2026',h:'€91.00',j:'€586.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'5',d:'25/01/2026 - 31/01/2026',h:'€90.00',j:'€550.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'6',d:'01/02/2026 - 07/02/2026',h:'€105.00',j:'€610.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'7',d:'08/02/2026 - 14/02/2026',h:'€110.00',j:'€670.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'8',d:'15/02/2026 - 21/02/2026',h:'€131.00',j:'€851.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'9',d:'22/02/2026 - 28/02/2026',h:'€120.00',j:'€699.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'10',d:'01/03/2026 - 07/03/2026',h:'€105.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'11',d:'08/03/2026 - 14/03/2026',h:'€99.00',j:'€570.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'12',d:'15/03/2026 - 21/03/2026',h:'€110.00',j:'€560.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'13',d:'22/03/2026 - 28/03/2026',h:'€95.00',j:'€511.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'14',d:'29/03/2026 - 04/04/2026',h:'€115.00',j:'€673.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'15',d:'05/04/2026 - 11/04/2026',h:'€111.00',j:'€650.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'16',d:'12/04/2026 - 18/04/2026',h:'€110.00',j:'€620.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'17',d:'19/04/2026 - 25/04/2026',h:'€110.00',j:'€620.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'18',d:'26/04/2026 - 02/05/2026',h:'€99.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                ].map((row,idx)=> (
                  <tr key={idx} className="border-b border-gray-200">
                    <td className="py-3 pr-6">{row.w}</td>
                    <td className="py-3 pr-6">{row.d}</td>
                    <td className="py-3 pr-6">{row.h}</td>
                    <td className="py-3 pr-6">{row.j}</td>
                    <td className="py-3 pr-6">{row.r}</td>
                    <td className="py-3 pr-6">{row.c}</td>
                    <td className="py-3 pr-6">
                      <a 
                        href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Réserver
                      </a>
                      {row.rule && <span className="ml-2 text-xs text-gray-500">+ Règle de réservation</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <BookOpen className="h-7 w-7 text-blue-600" /> Blog
            </h2>
            <p className="text-gray-600">Actus, conseils et bons plans Tignes & Val d’Isère</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Dates d’ouverture & fermeture</CardTitle>
                <CardDescription>Val d’Isère et Tignes</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="list-disc pl-5 text-gray-700">
                  <li>Tignes: Hiver 2025-2026 (prévision: fin nov. → début mai)</li>
                  <li>Val d’Isère: Hiver 2025-2026 (prévision: début déc. → début mai)</li>
                </ul>
                <a className="text-blue-600 hover:underline" href="https://www.tignes.net" target="_blank" rel="noreferrer">Site Tignes</a>
                <span className="mx-2">•</span>
                <a className="text-blue-600 hover:underline" href="https://www.valdisere.com" target="_blank" rel="noreferrer">Site Val d’Isère</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Programme d’animations</CardTitle>
                <CardDescription>Agenda des évènements</CardDescription>
              </CardHeader>
              <CardContent>
                <a className="text-blue-600 hover:underline" href="https://www.tignes.net/que-faire-a-tignes/agenda" target="_blank" rel="noreferrer">Agenda Tignes</a>
                <span className="mx-2">•</span>
                <a className="text-blue-600 hover:underline" href="https://www.valdisere.com/agenda/" target="_blank" rel="noreferrer">Agenda Val d’Isère</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Applications officielles</CardTitle>
              </CardHeader>
              <CardContent className="space-x-3">
                <a className="text-blue-600 hover:underline" href="https://play.google.com/store/search?q=tignes&c=apps" target="_blank" rel="noreferrer">Apps Tignes</a>
                <a className="text-blue-600 hover:underline" href="https://play.google.com/store/search?q=val%20d%27isere&c=apps" target="_blank" rel="noreferrer">Apps Val d’Isère</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Offices & Remontées</CardTitle>
              </CardHeader>
              <CardContent className="space-x-3">
                <a className="text-blue-600 hover:underline" href="https://www.tignes.net" target="_blank" rel="noreferrer">Office Tignes</a>
                <a className="text-blue-600 hover:underline" href="https://www.compagniedesalpes.com/" target="_blank" rel="noreferrer">Remontées</a>
                <a className="text-blue-600 hover:underline" href="https://www.valdisere.com" target="_blank" rel="noreferrer">Office Val d’Isère</a>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conseils équipement</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Casque, dorsale, DVA, pelle, sonde en hors-piste</li>
                  <li>Location: privilégier boutique proche des pistes</li>
                  <li>Bootfitting pour le confort et contrôle</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Conseils choix des pistes</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Matin: pentes ensoleillées, après-midi: neiges plus souples</li>
                  <li>Consulter le bulletin d’avalanche avant hors-piste</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Technique ski & snowboard</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Ski: appuis progressifs, regard loin, rythme</li>
                  <li>Snowboard: posture centrée, aucune dissociation épaules/bassin</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section id="weather" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <CloudSun className="h-7 w-7 text-blue-600" /> Météo (J+7)
            </h2>
            <p className="text-gray-600">Temps réel et prévisions (démonstration)</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tignes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 mb-3">Actuel: {weather.tignes?.current?.temperature_2m ?? '--'}°C</div>
                {renderForecast(weather.tignes, 'tignes')}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Val d’Isère</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 mb-3">Actuel: {weather.val?.current?.temperature_2m ?? '--'}°C</div>
                {renderForecast(weather.val, 'val')}
              </CardContent>
            </Card>
          </div>
          <p className="text-xs text-gray-500 mt-4">Source: Open-Meteo (libre) – peut être migrée en API serveur.</p>
        </div>
      </section>

      {/* Avalanche Section */}
      <section id="avalanche" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <ShieldAlert className="h-7 w-7 text-blue-600" /> Risques d'avalanche & Sécurité
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Bulletin d'avalanche & Niveaux de risque</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Bulletins officiels :</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://meteofrance.com/previsions-meteo-france/val-d-isere/73150" target="_blank" rel="noreferrer">
                        METEO FRANCE : Météo Val d'Isère
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://meteofrance.com/meteo-montagne/tignes/732961" target="_blank" rel="noreferrer">
                        METEO FRANCE - Météo Tignes
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://www.anena.org/" target="_blank" rel="noreferrer">
                        ANENA - Association Nationale pour l'Étude de la Neige et des Avalanches
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://www.avalanches.org/" target="_blank" rel="noreferrer">
                        European Avalanche Services - Alps
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Météo & Enneigement</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Val d'Isère :</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://www.valdisere.com/live/enneigement/" target="_blank" rel="noreferrer">
                        État des pistes et enneigement en direct
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://www.valdisere.com/live/meteo-a-val-disere/" target="_blank" rel="noreferrer">
                        Météo à Val d'Isère & ouverture du col de l'Iseran
                      </a>
                    </li>
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://valdisere.roundshot.com/" target="_blank" rel="noreferrer">
                        Webcams Val d'Isère en direct
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Tignes :</h3>
                  <ul className="list-disc pl-5 text-gray-700 space-y-1">
                    <li>
                      <a className="text-blue-600 hover:underline" href="https://www.snowtrex.fr/france/val_disere/meteo.html" target="_blank" rel="noreferrer">
                        Météo et prévisions neige à Tignes
                      </a>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Équipement de sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li><strong>Équipement obligatoire hors-piste :</strong>
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>Détecteur de Victimes d'Avalanches (DVA)</li>
                      <li>Pelle</li>
                      <li>Sonde</li>
                    </ul>
                  </li>
                  <li><strong>Équipement recommandé :</strong>
                    <ul className="list-[circle] pl-5 mt-1 space-y-1">
                      <li>Sac airbag</li>
                      <li>Casque</li>
                      <li>Gilet airbag</li>
                      <li>Kit de premiers secours</li>
                      <li>Téléphone portable chargé</li>
                    </ul>
                  </li>
                  <li>Initiation à la recherche de victimes d'avalanche disponible avec votre monitrice</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Conseils de sécurité</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-2">
                  <li>Consultez toujours le bulletin d'avalanche avant de partir</li>
                  <li>Ne partez jamais seul en hors-piste</li>
                  <li>Informez quelqu'un de votre itinéraire et de votre heure de retour</li>
                  <li>Respectez les zones sécurisées et la signalisation des pistes</li>
                  <li>Adaptez votre itinéraire en fonction des conditions météorologiques</li>
                  <li>En cas d'accident, composez le 112 (numéro d'urgence européen)</li>
                </ul>
                <div className="mt-4 p-4 bg-yellow-50 rounded-md border-l-4 border-yellow-400">
                  <p className="text-yellow-700 font-medium">
                    La sécurité en montagne est l'affaire de tous. En cas de doute, renoncez ou faites appel à un professionnel.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <ImagePlus className="h-7 w-7 text-blue-600" /> Galerie
            </h2>
            <p className="text-gray-600">Découvrez les paysages enneigés de Tignes et Val d'Isère</p>
          </div>
          
          {/* Utilisation du composant OptimizedGallery */}
          <OptimizedGallery />
        </div>
      </section>


      {/* Cancellation Policy Section */}
      <section id="cancellation" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Annulation Flexible</h2>
          <p className="text-gray-700 mb-4">Protection contre les annulations clients, inspirée des politiques Maison Sport.</p>
          <div className="space-y-3 text-gray-800">
            <p><strong>21+ jours:</strong> Remboursement 95% au client, pas de paiement.</p>
            <p><strong>14–20 jours:</strong> Remboursé 50%. Si non rebooké: paiement 50%.</p>
            <p><strong>≤13 jours:</strong> Pas de remboursement. Si non rebooké: paiement 100%.</p>
            <p className="text-sm text-gray-600">Calendrier rouvert automatiquement en cas d’annulation.</p>
          </div>
          <div className="mt-6">
            <a href="#contact" className="inline-flex items-center gap-2 text-blue-600 hover:underline">
              <MessageCircle className="h-4 w-4" /> Nous contacter
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <CardTitle>Email</CardTitle>
              </CardHeader>
              <CardContent>
                <a href={`mailto:${t.contact.email}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                  {t.contact.email}
                </a>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <CardTitle>Téléphone</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-1">
                  <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:text-blue-800 hover:underline transition-colors">
                    {t.contact.phone}
                  </a>
                  <a href={`https://wa.me/${t.contact.phone.replace(/\s/g,'')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline inline-flex items-center gap-1">
                    WhatsApp
                  </a>
                </div>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <CardTitle>Adresse</CardTitle>
              </CardHeader>
              <CardContent>
                <a 
                  href="https://www.google.com/maps/search/Val+d%27Isère,+France" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                >
                  {t.contact.address}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={Logo} alt="Tignes logo" className="h-10 w-10 object-contain" />
            <span className="text-lg font-semibold">{t.title}</span>
          </div>
          <p className="text-gray-400">{t.subtitle}</p>
          <p className="text-gray-500 text-sm mt-4">
            © 2025 {t.title}. Tous droits réservés.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App


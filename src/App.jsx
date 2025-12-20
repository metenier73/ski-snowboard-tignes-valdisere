import Logo from '@/assets/Logo.png'
import QRCode from '@/assets/qr-code.png'
import RAGAssistant from '@/components/rag/RAGAssistant.jsx'
import BookingWidget from '@/components/booking/BookingWidget.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages'
import {
  BookOpen,
  Bot,
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
  Image,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  ShieldAlert,
  Info,
  Settings,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [weather, setWeather] = useState({ tignes: null, val: null })
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isRAGOpen, setIsRAGOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState(
    typeof window !== 'undefined' ? (window.location.hash || '#home') : '#home'
  )

  // Suivre le hash pour marquer le lien actif dans la navigation
  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash || '#home')
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])
  // Indisponibilités dynamiques chargées depuis /availability.json
  const [availability, setAvailability] = useState({ morningsBlocked: [], afternoonsBlocked: [] })
  useEffect(() => {
    let isMounted = true
    fetch(`${(import.meta.env && import.meta.env.BASE_URL) ? import.meta.env.BASE_URL : '/'}availability.json`, { cache: 'no-cache' })
      .then((r) => r.ok ? r.json() : Promise.reject(new Error(`HTTP ${r.status}`)))
      .then((data) => {
        if (!isMounted) return
        const mornings = Array.isArray(data.morningsBlocked) ? data.morningsBlocked : []
        const afternoons = Array.isArray(data.afternoonsBlocked) ? data.afternoonsBlocked : []
        setAvailability({ morningsBlocked: mornings, afternoonsBlocked: afternoons })
      })
      .catch((e) => {
        console.error('Failed to load availability.json', e)
      })
    return () => { isMounted = false }
  }, [])

  const bookingUrl = 'https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend'

  const isActive = (href) => !!href && href === currentHash
  
  // Fonction pour obtenir l'URL d'une image de la galerie
  const getCarouselImage = (index) => {
    return getGalleryImage(index);
  };

  // Fonction pour passer à la diapositive suivante
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalImages - 1 ? 0 : prev + 1))
  }

  // Fonction pour revenir à la diapositive précédente
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalImages - 1 : prev - 1))
  }

  // Défilement automatique (respecte prefers-reduced-motion)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) return
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
		    contact: 'contact',
        
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
		    contact: 'Contact',
        
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

  useEffect(() => {
    const fetchWeather = async () => {
      console.log('Début de la récupération des données météo...');
      try {
        const endpoints = [
          {
            key: 'tignes',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.468&longitude=6.909&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
          },
          {
            key: 'val',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.448&longitude=6.980&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum,weather_code&timezone=auto&forecast_days=7'
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
      {/* Lien d'accès rapide au contenu principal */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-blue-600 text-white px-3 py-2 rounded shadow"
      >
        Aller au contenu
      </a>

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <img src={Logo} alt="Tignes logo" className="h-16 w-16 object-contain" decoding="async" fetchpriority="high" loading="eager" />
                <span className="ml-3 text-xl font-bold text-gray-900 whitespace-nowrap">
                  <span className="block text-sm font-normal text-gray-500 leading-none">Myriam</span>
                  <span>Val d'Isère - Tignes</span>
                </span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6 items-center" role="navigation" aria-label="Navigation principale">
              {/* Premier groupe : Accueil avec sous-menu (A propos, Galerie) */}
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.home}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#home" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <Snowflake className="h-4 w-4 text-blue-600" />
                    <span>Accueil</span>
                  </a>
                  <div className="my-1 border-t border-gray-100" />
                  <a href="#about" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md" aria-current={isActive('#about') ? 'page' : undefined}>
                    <Info className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.about}</span>
                  </a>
                  <a href="#gallery" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md" aria-current={isActive('#gallery') ? 'page' : undefined}>
                    <Image className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.gallery}</span>
                  </a>
                </div>
              </div>
              
              {/* Deuxième groupe : Réserver/Services */}
              <a href="#booking" className={`nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#booking') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#booking') ? 'page' : undefined}>
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.booking}
              </a>
              <div className="relative group">
                <button className="nav-link flex items-center">
                  <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.services}
                  <ChevronDown className="ml-1 h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>
                <div className="absolute left-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <a href="#services" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <Settings className="h-4 w-4 text-gray-600" />
                    <span>Tous les services</span>
                  </a>
                  <a href="#blog" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <span>{t.nav.blog}</span>
                  </a>
                  <div className="my-1 border-t border-gray-100" />
                  <a href="#weather" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <CloudSun className="h-4 w-4 text-blue-600" />
                    <span>Prévisions météo</span>
                  </a>
                  <a href="#avalanche" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
                    <ShieldAlert className="h-4 w-4 text-red-600" />
                    <span>{t.nav.avalanche}</span>
                  </a>
                </div>
              </div>
              
              {/* Contact */}
              <a href="#contact" className={`nav-link focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#contact') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#contact') ? 'page' : undefined}>
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.contact}
              </a>
            </nav>

            {/* Language and Assistant */}
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                {/* Assistant RAG */}
                <Button
                  onClick={() => setIsRAGOpen(true)}
                  variant="outline"
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                >
                  <Bot className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Assistant IA</span>
                  <Sparkles className="h-3 w-3 ml-1" />
                </Button>
              </div>
              
              <div className="border-l border-gray-200 h-6"></div>
              
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                aria-label={currentLang === 'fr' ? 'Choisir la langue' : 'Choose language'}
                className="bg-white border border-gray-300 rounded-md px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
              </select>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                aria-label={isMenuOpen ? (currentLang === 'fr' ? 'Fermer le menu' : 'Close menu') : (currentLang === 'fr' ? 'Ouvrir le menu' : 'Open menu')}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden py-2 border-t border-gray-200">
              <nav className="flex flex-col space-y-1" role="navigation" aria-label="Navigation mobile">
                {/* Premier groupe : Accueil avec sous-menu (A propos, Galerie) */}
                <div>
                  <button className="py-3 px-4 nav-link flex items-center w-full text-left">
                    <Snowflake className="h-4 w-4 mr-2" />
                    {t.nav.home}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </button>
                  <div className="pl-8 pr-4">
                    <a href="#home" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Snowflake className="h-4 w-4 text-blue-600" />
                      <span>Accueil</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#about" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Info className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.about}</span>
                    </a>
                    <a href="#gallery" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Image className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.gallery}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Deuxième groupe : Réserver/Services */}
                <a href="#booking" className={`py-3 px-4 nav-link flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#booking') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#booking') ? 'page' : undefined}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  {t.nav.booking}
                </a>
                <div>
                  <button className="py-3 px-4 nav-link flex items-center w-full text-left">
                    <Snowflake className="h-4 w-4 mr-2" />
                    {t.nav.services}
                    <ChevronDown className="ml-auto h-4 w-4" />
                  </button>
                  <div className="pl-8 pr-4">
                    <a href="#services" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>Tous les services</span>
                    </a>
                    <a href="#blog" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.blog}</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#weather" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <CloudSun className="h-4 w-4 text-blue-600" />
                      <span>Prévisions météo</span>
                    </a>
                    <a href="#avalanche" className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <span>{t.nav.avalanche}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Troisième groupe supprimé: météo/avalanche déplacés sous Services */}
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Contact */}
                <a href="#contact" className={`py-3 px-4 nav-link flex items-center ${isActive('#contact') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#contact') ? 'page' : undefined}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  {t.nav.contact}
                </a>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Assistant IA */}
                <button 
                  onClick={() => setIsRAGOpen(true)}
                  className="py-3 px-4 nav-link flex items-center w-full text-left"
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Assistant IA
                  <Sparkles className="h-3 w-3 ml-auto" />
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" role="main" tabIndex={-1} className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t.hero.title}
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            {t.hero.description}
          </p>
          <a href="#booking" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
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

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Star className="h-7 w-7 text-yellow-500 fill-yellow-500" /> Avis Clients
            </h2>
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.96</span>
              <span className="text-gray-600">(30 avis)</span>
            </div>
            <p className="text-lg text-gray-600">90% des commentaires sont 5 étoiles</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Hannah M.', rating: 5, date: '17/04/2025', location: 'Ski, Tignes', hours: 8, text: "Myriam was absolutely fantastic - we could not have asked for a better instructor to teach our 6yo, 3yo and myself. The lesson was fun, with positive & constructive feedback. Myriam was so knowledgeable and patient with our children and managed to get our 6yo confidently down blue runs by the end of the lesson. Would highly recommend for skiers of all abilities. Thank you!!" },
              { name: 'Ami B.', rating: 5, date: '16/04/2025', location: 'Ski, Tignes', hours: 6, text: "My partner and I have both been skiing before but we're a bit out of practice so decided to get a couple of lessons. Myriam was a brilliant teacher with really constructive feedback on our techniques and we both have taken away some tips we plan to apply. Myriam has fantastic knowledge of the mountains and it was definitely the best way to explore them with Myriam as our guide. We loved our experience and we would definitely recommend booking lessons with her." },
              { name: 'Kate J.', rating: 5, date: '13/04/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Myriam was the best instructor I have had. I have skied a number of times but am naturally nervous and Myriam gave me confidence and taught me techniques to help with that. I will definitely ask for Myriam again!" },
              { name: 'Joe S.', rating: 5, date: '26/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam is a great teacher. My skiing improved immeasurably after a three-hour private lesson with her. Money well spent. I had a great trip, and I will definitely be going back to Myriam when I come next year." },
              { name: 'Zoe K.', rating: 5, date: '07/04/2025', location: 'Ski, Tignes', hours: 10, text: "Myriam was a fantastic instructor for our 4-year-old son's first time on skis. She was warm, patient, and made learning fun from the start. He quickly gained confidence and couldn't wait to get back on the slopes each day. We're so grateful for her gentle, encouraging approach — a perfect introduction to skiing!" },
              { name: 'Henry C.', rating: 5, date: '26/03/2025', location: 'Ski, Tignes', hours: 4, text: "The three of us had an excellent lesson with Myriam. We came away from the lesson very happy and with a lot of improvements. Would highly recommend Myriam. 5 stars." },
              { name: 'Naz I.', rating: 5, date: '24/03/2025', location: 'Ski, Tignes', hours: 6, text: "I picked Myriam due to her reviews of patience and technical reviews- both of which are true, plus I wanted a female view on moving weight forward. I message Myriam before hand and spent two 3hr lessons with her. She was fun and recognised I needed my confidence building as well. Loved my time with her and will see her again on my next trip. Thank you Myriam 💕" },
              { name: 'Hana W.', rating: 5, date: '15/01/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "We were lucky to have Myriam as our instructor in Val d'Isère. She was amazing at helping our family tackle red runs with confidence. Myriam kept things fun with lots of laughs, and her patience made all the difference. By the end of our lesson, we felt like proper skiers! Highly recommend her if you're looking to improve while having a brilliant time!" },
              { name: 'Marina B.', rating: 5, date: '25/03/2025', location: 'Ski, Tignes', hours: 4, text: "Had 3 fantastic lessons with Myriam in Tignes this March – we couldn't have asked for a better refresher! She was so much fun, super encouraging, and got our confidence back in no time. Myriam's tips improved our technique massively. 5 stars well deserved" },
              { name: 'Shareena P.', rating: 5, date: '10/01/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "We had Myriam as our kids' ski instructor this February, and she was fantastic! She was super patient, kind, and kept our little ones smiling and excited. They learned so much and can't wait to ski again!" },
              { name: 'Lee P.', rating: 5, date: '05/01/2025', location: 'Ski, Val d\'Isère', hours: 8, text: "Myriam has great technical knowledge and experience. Definitely improved my skiing technique at my pace." },
              { name: 'David Y.', rating: 5, date: '04/03/2025', location: 'Ski hors-piste, Val d\'Isère', hours: 8, text: "We scheduled Myriam for two half day off piste sessions in February. She was fantastic in navigating different skiing abilities in our family and extremely knowledgeable. Myriam is patient and friendly while offering excellent technical instruction. We sent four teenagers with her on the second day and they each enjoyed one of their best ski days ever because of Myriam's guidance. Whether you are an expert or intermediate skier, I can strongly recommend Myriam and booking with Maison Sport - a flawless process!" },
              { name: 'Carwyn D.', rating: 4.5, date: '28/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was great at making sure I was technically correct with my turns, first day skiing in 20 years and on our second day I was onto the black runs." },
              { name: 'Jennifer T.', rating: 5, date: '17/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam gave my kids and I a great lesson for an afternoon. She was able to provide specific feedback to each of us and technical instruction to help us improve depending on what we needed to practice. We have hired instructors in past years and my kids and I think she is the best one." },
              { name: 'Neil H.', rating: 4.5, date: '23/02/2025', location: 'Ski hors-piste, Val d\'Isère', hours: 12, text: "Myriam is an extremely friendly and very nice person, who was flexible in approach, and was very insightful in terms of technical tips on skiing skills, in our case, in guided off-piste sessions. I would certainly recommend her." },
              { name: 'Sophie W.', rating: 5, date: '17/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was a fantastic instructor who tailored the technical instruction perfectly for the different skill levels of our lesson. Myriam really understood our strengths and development areas and paced the session perfectly throughout. We both improved significantly over the session. We would definitely book Myriam again in the future and really enjoyed our lesson. Thank you!" },
              { name: 'Olivia H.', rating: 5, date: '08/02/2025', location: 'Ski, Val d\'Isère', hours: 6, text: "Myriam was fantastic! she knows the area very well and took us to places that were less crowded and challenged me when I needed an extra push. highly recommend." },
              { name: 'Adam W.', rating: 5, date: '07/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was very flexible with timings of lesson which ended up being very important with cancelled flights. She is very friendly and recommended great slopes for my ability. She was very good at putting things simply for me to understand and left me with things to work on for the rest of my ski holiday. Thanks Myriam!" },
              { name: 'Naomi H.', rating: 5, date: '08/02/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Myriam was great! Made first day in Val d'Isère easy. Couldn't have done it without her. She made it fun for the kids; gave good pointers along the way; covered a lot of territory and didn't mind we didn't want to have many breaks! She was patient and kind; - absolutely lovely person. An amazing skier! I'd definitely recommend her." },
              { name: 'Reuben H.', rating: 5, date: '07/02/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was friendly and noticed straight away what i required for improvement. Also very informative on the surrounding ski and mountain areas. A great lesson." },
              { name: 'Faris A.', rating: 5, date: '05/03/2025', location: 'Ski, Val d\'Isère', hours: 4, text: "Amazing Ski Instructor – Thank You, Myriam! I had the best experience learning from Myriam in Val d'Isère! She's not just an incredible ski instructor—she's warm, patient, and truly knows how to bring out the best in you on the slopes. Before my lessons with her, black slopes felt intimidating, but thanks to her clear guidance and expert coaching, I was able to tackle them with confidence and ease. She breaks everything down in a way that just clicks, making even the toughest techniques feel doable. She's also great at pushing you just enough to improve without ever making you feel overwhelmed. Beyond the technical skills, Myriam made every lesson fun and engaging. She knows the best spots on the mountain and made sure I experienced some amazing runs. Her energy and encouragement made such a difference, and I can honestly say my skiing has improved exponentially because of her. If you're looking for an instructor who is not only skilled but also makes learning enjoyable, Myriam is the one! I can't thank her enough for such an incredible experience." },
              { name: 'Stephanie M.', rating: 5, date: '07/03/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Une super prof, très pédagogue et attentionnée, encore merci et à l'année prochaine !" },
              { name: 'Ben H.', rating: 5, date: '21/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was super! She listened, pushed me when right and was kind, and understanding of my nerves. Lots of local information made my experience with her 10/10." },
              { name: 'Rachel B.', rating: 5, date: '18/03/2025', location: 'Ski, Tignes', hours: 3, text: "Myriam was a great instructor. She was really patient and explained everything really well. Highly recommend!" },
              { name: 'Serra K.', rating: 5, date: '03/03/2025', location: 'Ski, Val d\'Isère', hours: 2, text: "Hi, Myriam was a really nice instructor, to whom we told our needs in advance and she adapted the session to our needs very very well." },
              { name: 'Fi B.', rating: 5, date: '06/02/2025', location: 'Ski, Val d\'Isère', hours: 3, text: "I really enjoyed my lesson with Myriam! She was able to instil a confidence in my skiing which I am very thankful for! After my lesson, my husband changed my skis (25 years old) to enhance my new skiing abilities! When I come back to Val D'Isere I will definitely book you again (if you'll have me). Thank you Myriam." },
              { name: 'Sophie B.', rating: 5, date: '04/02/2025', location: 'Ski, Val d\'Isère', hours: 3, text: "Myriam was friendly and really put me at ease in my lesson. She was easy to follow and helped build my confidence and set me up for a great week of skiing! I really recommend her" },
            ].map((review, idx) => (
              <Card 
                key={idx} 
                className="bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{review.name}</CardTitle>
                      <div className="flex items-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i <= Math.round(review.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
                          />
                        ))}
                        <span className="ml-1 text-sm font-medium text-gray-700">{review.rating} {review.rating === 5 ? 'Etoiles' : 'Etoiles'}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
                    <Calendar className="h-4 w-4" />
                    <span>{review.date}</span>
                    <span>•</span>
                    <Mountain className="h-4 w-4" />
                    <span>{review.location}</span>
                  </div>
                  {review.hours && (
                    <div className="mt-2 text-sm text-gray-500">
                      <span className="font-medium">{review.hours}</span> heures réservées
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed max-h-48 overflow-hidden">{review.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 mb-1">Note moyenne</div>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-blue-600">4.96</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">basé sur 30 avis</div>
              </div>
              <div className="border-l border-gray-200 pl-6 text-left">
                <div className="text-sm font-semibold text-gray-900 mb-2">Appréciations</div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Amabilité <span className="font-bold text-blue-600">5.0</span></div>
                  <div>Communication <span className="font-bold text-blue-600">4.88</span></div>
                  <div>Ponctualité <span className="font-bold text-blue-600">4.98</span></div>
                  <div>Feedback technique <span className="font-bold text-blue-600">4.98</span></div>
                </div>
              </div>
            </div>
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
                  {w:'49',d:'30/11/2025 - 06/12/2025',h:'€79.00',j:'€495.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'01/12/2025',blocked:'09:00-12:30',availableSlots:['12:30-13:00', '13:00-16:30']},{date:'02/12/2025',blocked:'09:00-11:00',availableSlots:['11:00-13:00', '13:00-16:30']},{date:'04/12/2025',blocked:'11:00-13:00',availableSlots:['09:00-11:00', '13:00-16:30']}],dailyAvailableDates:['05/12/2025','06/12/2025','07/12/2025']},
                  {w:'50',d:'07/12/2025 - 13/12/2025',h:'€89.00',j:'€522.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'08/12/2025',blocked:'11:00-13:00 et 14:00-16:00',availableSlots:['09:00-11:00', '13:00-14:00']},{date:'13/12/2025',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}],dailyAvailableDates:['09/12/2025','10/12/2025','11/12/2025','12/12/2025']},
                  {w:'51',d:'14/12/2025 - 20/12/2025',h:'€100.00',j:'€554.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyFullBlockedDates:['14/12/2025','15/12/2025','16/12/2025','17/12/2025','18/12/2025','19/12/2025']},
                  {w:'52',d:'21/12/2025 - 27/12/2025',h:'€105.00',j:'€629.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,dailyPartialSlots:[{date:'21/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},{date:'22/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},{date:'23/12/2025',blocked:'09:00-14:00',availableSlots:['14:00-16:30']}],dailyFullBlockedDates:['24/12/2025','25/12/2025','26/12/2025']},
                  {w:'1',d:'28/12/2025 - 03/01/2026',h:'€115.00',j:'€640.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,dailyAvailableDates:['03/01/2026'],dailyFullBlockedDates:['28/12/2025','29/12/2025','30/12/2025','31/12/2025','01/01/2026','02/01/2026']},
                  {w:'2',d:'04/01/2026 - 10/01/2026',h:'€95.00',j:'€542.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'06/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'07/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'08/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'10/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}],dailyFullBlockedDates:['05/01/2026']},
                  {w:'3',d:'11/01/2026 - 17/01/2026',h:'€92.00',j:'€566.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'13/01/2026',blocked:'12:00-14:00',availableSlots:['09:00-12:00', '14:00-17:00']}]},
                  {w:'4',d:'18/01/2026 - 24/01/2026',h:'€91.00',j:'€542.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'5',d:'25/01/2026 - 31/01/2026',h:'€90.00',j:'€535.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30 (26-30/01: 09:00-14:00 indisponible ; 14:00-17:00 disponible)',dailyExtendedMorningBlocks:['26/01/2026','27/01/2026','28/01/2026','29/01/2026','30/01/2026']},
                  {w:'6',d:'01/02/2026 - 07/02/2026',h:'€105.00',j:'€590.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'01/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'02/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'03/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}]},
                  {w:'7',d:'08/02/2026 - 14/02/2026',h:'€110.00',j:'€595.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'8',d:'15/02/2026 - 21/02/2026',h:'€131.00',j:'€851.00',r:'8%',c:'09:00-13:00 ; 13:00-17:00',rule:true,dailyPartialSlots:[{date:'15/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']},{date:'16/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']},{date:'17/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']},{date:'18/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']},{date:'19/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']},{date:'20/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-17:00']}],dailyAvailableDates:['21/02/2026']},
                  {w:'9',d:'22/02/2026 - 28/02/2026',h:'€120.00',j:'€599.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'10',d:'01/03/2026 - 07/03/2026',h:'€105.00',j:'€549.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'11',d:'08/03/2026 - 14/03/2026',h:'€99.00',j:'€537.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'12',d:'15/03/2026 - 21/03/2026',h:'€94.00',j:'€507.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'13',d:'22/03/2026 - 28/03/2026',h:'€95.00',j:'€491.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'14',d:'29/03/2026 - 04/04/2026',h:'€115.00',j:'€653.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,dailyMorningBlocks:['29/03/2026','30/03/2026','31/03/2026','01/04/2026','02/04/2026','03/04/2026'],dailyAvailableDates:['04/04/2026']},
                  {w:'15',d:'05/04/2026 - 11/04/2026',h:'€111.00',j:'€630.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                  {w:'16',d:'12/04/2026 - 18/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'17',d:'19/04/2026 - 25/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                  {w:'18',d:'26/04/2026 - 02/05/2026',h:'€99.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                ].map((row,idx)=> (
                  <tr key={idx} className={`border-b border-gray-200 ${row.reserved ? 'opacity-60' : ''}`} aria-disabled={row.reserved ? true : undefined}>
                    <td className="py-3 pr-6">{row.w}</td>
                    <td className="py-3 pr-6">{row.d}</td>
                    <td className="py-3 pr-6">{row.h}</td>
                    <td className="py-3 pr-6">{row.j}</td>
                    <td className="py-3 pr-6">{row.r}</td>
                    <td className="py-3 pr-6">{row.c}</td>
                    <td className="py-3 pr-6">
                      {row.reserved ? (
                        <span title="Semaine complète – plus de créneaux disponibles" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed select-none">
                          Complet
                        </span>
                      ) : (
                        <a 
                          href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        >
                          Réserver
                        </a>
                      )}
                      {row.morningReserved && (
                        <span title="Les créneaux du matin (jusqu'à 13h) ne sont plus disponibles" className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
                          <AlertTriangle className="h-3.5 w-3.5" />
                          Matins complets (jusqu'à 13h)
                        </span>
                      )}
                      {row.morningReserved && (
                        <span title="Les créneaux d'après-midi restent ouverts" className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                          <CheckCircle className="h-3.5 w-3.5" />
                          Après-midi disponibles
                        </span>
                      )}
                      {Array.isArray(row.dailyPartialSlots) && row.dailyPartialSlots.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {row.dailyPartialSlots.map((slot, idx) => (
                            <div key={idx} className="flex flex-wrap gap-2">
                              <span title={`Créneau indisponible le ${slot.date} (${slot.blocked})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                                <AlertTriangle className="h-3 w-3" />
                                {slot.date} · {slot.blocked} indisponible
                              </span>
                              {Array.isArray(slot.availableSlots) && slot.availableSlots.map((availableSlot, slotIdx) => (
                                <span key={slotIdx} title={`Disponible le ${slot.date} (${availableSlot})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                  <CheckCircle className="h-3 w-3" />
                                  {slot.date} · {availableSlot} disponible
                                </span>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                      {Array.isArray(row.dailyExtendedMorningBlocks) && row.dailyExtendedMorningBlocks.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {row.dailyExtendedMorningBlocks.map((dateStr) => (
                            <div key={dateStr} className="flex flex-wrap gap-2">
                              <span title={`Matin indisponible le ${dateStr} (09:00–14:00)`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                                <AlertTriangle className="h-3 w-3" />
                                {dateStr} · 09:00–14:00 indisponible
                              </span>
                              <span title={`Après-midi disponible le ${dateStr} (14:00–17:00)`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="h-3 w-3" />
                                {dateStr} · 14:00–17:00 disponible
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                      {Array.isArray(row.dailyMorningBlocks) && row.dailyMorningBlocks.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {row.dailyMorningBlocks.map((dateStr) => (
                            <span key={dateStr} title={`Matin indisponible le ${dateStr} (09:00–13:00)`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-orange-50 text-orange-700 border border-orange-200">
                              <AlertTriangle className="h-3 w-3" />
                              {dateStr} · 09:00–13:00
                            </span>
                          ))}
                        </div>
                      )}
                      {Array.isArray(row.dailyFullBlockedDates) && row.dailyFullBlockedDates.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {row.dailyFullBlockedDates.map((dateStr) => (
                            <span key={dateStr} title={`Journée complète indisponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                              <AlertTriangle className="h-3 w-3" />
                              {dateStr} · Journée complète
                            </span>
                          ))}
                        </div>
                      )}
                      {Array.isArray(row.dailyAvailableDates) && row.dailyAvailableDates.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {row.dailyAvailableDates.map((dateStr) => (
                            <span key={dateStr} title={`Disponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle className="h-3 w-3" />
                              Disponible le {dateStr}
                            </span>
                          ))}
                        </div>
                      )}
                      {row.rule && <span className="ml-2 text-xs text-gray-500">+ Règle de réservation</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Widget de réservation interactif par date/slot */}
          <BookingWidget blockedMorningDates={availability.morningsBlocked} blockedAfternoonDates={availability.afternoonsBlocked} bookingUrl={bookingUrl} />
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
                <a className="text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm" href="https://www.tignes.net" target="_blank" rel="noreferrer">Site Tignes</a>
                <span className="mx-2">•</span>
                <a className="text-blue-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-sm" href="https://www.valdisere.com" target="_blank" rel="noreferrer">Site Val d’Isère</a>
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
                  <li>Snowboard: posture centrée, dissociation épaules/bassin</li>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <ImagePlus className="h-7 w-7 text-blue-600" /> Galerie
            </h2>
            <p className="text-gray-600">Découvrez les paysages enneigés de Tignes et Val d'Isère</p>
          </div>
          
          <div className="relative overflow-hidden rounded-xl shadow-xl">
            {/* Images du carrousel */}
            <div className="relative h-96">
              {Array.from({ length: totalImages }).map((_, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 motion-reduce:transition-none ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                  <img 
                    src={getCarouselImage(index)} 
                    alt={galleryAltTexts[index] || `Paysage enneigé ${index + 1}`}
                    className="w-full h-full object-cover"
                    decoding="async"
                    loading="lazy"
                  />
                </div>
              ))}
              
              {/* Boutons de navigation */}
              <button 
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Image précédente"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                aria-label="Image suivante"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              
              {/* Indicateurs de diapositives */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
                {Array.from({ length: totalImages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Légende */}
            <div className="bg-white p-4 text-center">
              <p className="text-gray-700">
                {currentSlide === 0 && "Vue imprenable sur les montagnes enneigées de Tignes"}
                {currentSlide === 1 && "Paysage hivernal époustouflant dans les Alpes"}
                {currentSlide === 2 && "Pentes enneigées parfaites pour le ski et le snowboard"}
                {currentSlide === 3 && "Forêt enneigée sous un ciel bleu éclatant"}
                {currentSlide === 4 && "Panorama montagneux sous la neige"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {currentSlide + 1} / {totalImages}
              </p>
            </div>
          </div>
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
          
          <div className="mt-12 flex flex-col items-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">QR Code</h3>
            <img 
              src={QRCode} 
              alt="QR Code de contact" 
              className="w-64 h-64 object-contain rounded-lg shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <img src={Logo} alt="Tignes logo" className="h-10 w-10 object-contain" loading="lazy" decoding="async" />
            <span className="text-lg font-semibold">{t.title}</span>
          </div>
          <p className="text-gray-400">{t.subtitle}</p>
          <p className="text-gray-500 text-sm mt-4">
            © 2025 {t.title}. Tous droits réservés.
          </p>
        </div>
      </footer>

      {/* Assistant RAG */}
      <RAGAssistant 
        isOpen={isRAGOpen} 
        onClose={() => setIsRAGOpen(false)} 
      />
    </div>
  )
}

export default App


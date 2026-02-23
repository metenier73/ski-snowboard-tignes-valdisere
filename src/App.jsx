import Logo from '@/assets/Logo.png'
import QRCode from '@/assets/qr-code.png'
import BookingWidget from '@/components/booking/BookingWidget.jsx'
import RAGAssistant from '@/components/rag/RAGAssistant.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages'
import {
  AlertTriangle,
  Award,
  BarChart3,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Clock,
  Cloud,
  CloudFog,
  CloudHail,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Cloudy,
  Compass,
  Image,
  ImagePlus,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Mountain,
  Phone,
  Settings,
  Shield,
  ShieldAlert,
  Smartphone,
  Snowflake,
  Sparkles,
  Star,
  Sun,
  Target,
  TrendingUp,
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
      // Ferme le menu mobile lors de la navigation
      setIsMenuOpen(false)
    }
    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Ferme le menu mobile lors d'un clic en dehors
  useEffect(() => {
    if (!isMenuOpen) return

    const handleClickOutside = (event) => {
      const mobileMenu = document.getElementById('mobile-menu')
      const menuButton = event.target.closest('button[aria-controls="mobile-menu"]')
      
      if (mobileMenu && !mobileMenu.contains(event.target) && !menuButton) {
        setIsMenuOpen(false)
      }
    }

    // Ajoute un léger délai pour éviter la fermeture immédiate au clic sur le bouton
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 100)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMenuOpen])
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

  // État pour gérer l'expansion des avis clients
  const [expandedReviews, setExpandedReviews] = useState({})

  // Fonction pour basculer l'expansion d'un avis
  const toggleReviewExpansion = (idx) => {
    setExpandedReviews(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }))
  }

  // Fonction pour déterminer si un avis est long
  const isLongReview = (text) => {
    return text.length > 200 // Seuil de caractères pour considérer un avis comme long
  }

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
        title: 'Cours de ski et snowboard personnalisés à Tignes Le Lac et Val Claret ❄️',
        description: 'Monitrice diplômée et expérimentée, je propose des cours privés de ski et snowboard à Tignes Le Lac et Val Claret, adaptés à tous les niveaux.',
        cta: 'Réserver vos cours'
      },
      about: {
        title: 'À propos de Myriam',
        description: "Je m'appelle **Myriam Metenier**, née à **Lyon** et installée en **Tarentaise depuis plus de 32 ans**. La montagne n'est pas seulement mon cadre de vie : c'est mon terrain d'expression, d'apprentissage et de transmission.\n\nReconnue pour mon **expertise**, ma **pédagogie** et mon **attachement profond au milieu montagnard**, j'enseigne le **ski alpin** et le **snowboard** aux enfants comme aux adultes. J'accompagne chacun avec une approche personnalisée, adaptée au niveau, aux objectifs et à la sensibilité de chaque pratiquant. Au fil des années, j'ai guidé de nombreux groupes sur des terrains variés, en transmettant aussi bien les techniques avancées que les principes essentiels de sécurité en montagne.\n\nTrès tôt, le sport a façonné mon parcours. Élevée dans la **pratique du sport de haut niveau**, j'ai évolué en **course à pied – demi-fond**, avec un **record de France à l'âge de 15 ans**. Le dépassement de soi a toujours été une valeur centrale dans ma vie, mais dans une approche plus **philosophique que compétitive** : se dépasser, oui, mais avant tout face à soi-même. Et ce dépassement prend encore plus de sens lorsque je peux **aider les autres à s'élever à travers leurs propres performances**.\n\nAprès un **baccalauréat en chimie**, le besoin viscéral d'être au plus proche de la montagne m'a conduite à m'installer définitivement en Tarentaise. J'y ai obtenu le **Diplôme d'État de ski alpin**, après avoir débuté comme **animatrice dès l'âge de 16 ans**, puis enseigné le ski et le snowboard avec passion et engagement.\n\nParallèlement à ma vie sportive et pédagogique, j'ai construit un parcours solide dans les **nouvelles technologies**. Titulaire d'un **BTS Services Informatiques aux Organisations – option SLAM (Solutions Logicielles et Applications Métiers)**, j'ai trouvé un équilibre précieux entre le besoin d'être active sur le terrain et celui de réfléchir, structurer et analyser. Cette dynamique m'a naturellement menée vers une **Maîtrise d'Administrateur Infrastructure et Cloud**.\n\nAujourd'hui, j'ai la chance de pouvoir **concilier mes deux passions** : les **technologies numériques** et mon **amour de la glisse**, en particulier de la neige. Curieuse et en constante évolution, je poursuis activement ma montée en compétences dans les domaines de la **cybersécurité** et de l'**intelligence artificielle**.\n\nEn parallèle, je m'intéresse profondément à tout ce qui permet une **meilleure connaissance de soi**. Cette quête m'a conduite à obtenir un **diplôme en naturopathie** ainsi qu'en **psychanalyse**, enrichissant ma compréhension de l'humain, de ses mécanismes et de son potentiel.\n\n### Ce vers quoi je tends\n\nLa **complémentarité de ces deux univers** – la montagne et la technologie, le corps et l'esprit, l'action et la réflexion – est aujourd'hui au cœur de mon épanouissement. Elle me permet de tendre vers une posture à la fois **humaine et structurée**, en restant **humble**, **observatrice**, **empathique** et **ouverte d'esprit**, tout en étant **critique**, **concentrée**, **pragmatique**, **organisée**, **réaliste**, **objective** et **stable**.\n\nC'est dans cet équilibre que je continue d'avancer, d'apprendre et de transmettre.",
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
        title: 'Private ski and snowboard lessons in Val d\'Isère 🏔️',
        description: 'Enjoy private lessons in Val d\'Isère, in the heart of one of the most beautiful ski areas in the Alps. Whether you want to learn the basics, perfect your technique, or explore new sensations, I\'ll guide you on the legendary slopes of the Espace Killy with personalized and supportive instruction ❄️✨.',
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
  
  // Ferme le menu mobile lorsqu'un lien est cliqué
  const closeMenu = () => setIsMenuOpen(false)
  
  // Gère le clic sur les liens de navigation mobile
  const handleNavClick = (e) => {
    // Ferme le menu après un court délai pour permettre la navigation
    setTimeout(() => {
      closeMenu()
    }, 100)
  }

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
                    <a href="#home" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Snowflake className="h-4 w-4 text-blue-600" />
                      <span>Accueil</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#about" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Info className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.about}</span>
                    </a>
                    <a href="#gallery" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Image className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.gallery}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Deuxième groupe : Réserver/Services */}
                <a href="#booking" onClick={handleNavClick} className={`py-3 px-4 nav-link flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md ${isActive('#booking') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#booking') ? 'page' : undefined}>
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
                    <a href="#services" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <Settings className="h-4 w-4 text-gray-600" />
                      <span>Tous les services</span>
                    </a>
                    <a href="#blog" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <BookOpen className="h-4 w-4 text-gray-600" />
                      <span>{t.nav.blog}</span>
                    </a>
                    <div className="my-1 border-t border-gray-100" />
                    <a href="#weather" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <CloudSun className="h-4 w-4 text-blue-600" />
                      <span>Prévisions météo</span>
                    </a>
                    <a href="#avalanche" onClick={handleNavClick} className="py-2 nav-link flex items-center gap-2 text-gray-700 hover:bg-gray-50 rounded-md">
                      <ShieldAlert className="h-4 w-4 text-red-600" />
                      <span>{t.nav.avalanche}</span>
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Troisième groupe supprimé: météo/avalanche déplacés sous Services */}
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Contact */}
                <a href="#contact" onClick={handleNavClick} className={`py-3 px-4 nav-link flex items-center ${isActive('#contact') ? 'text-blue-600 font-semibold' : ''}`} aria-current={isActive('#contact') ? 'page' : undefined}>
                  <Snowflake className="h-4 w-4 mr-2" />
                  {t.nav.contact}
                </a>
                
                <div className="border-t border-gray-100 my-1"></div>
                
                {/* Assistant IA */}
                <button 
                  onClick={() => {
                    setIsRAGOpen(true)
                    closeMenu()
                  }}
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-4xl mx-auto">
              {t.hero.description}
              {currentLang === 'fr' && ' Débutant, intermédiaire ou confirmé, chaque séance est conçue selon vos objectifs, votre rythme et votre expérience, pour une progression rapide et en toute sécurité ⛷️🏂.'}
              {currentLang === 'en' && ' My ski and snowboard lessons in Tignes – Val d\'Isère are suitable for beginners as well as experienced skiers and riders looking to improve their performance 🏂🔥. The goal: to progress effectively, gain confidence, and above all, have fun on the snow 😄.'}
            </p>
            <a href="#booking" className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-md">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
                {t.hero.cta}
              </Button>
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Mountain className="h-6 w-6 text-blue-600" />
                  Cours particuliers de ski et snowboard à Val d'Isère 🏔️
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  Profitez de cours particuliers à Val d'Isère, au cœur de l'un des plus beaux domaines skiables des Alpes. Que vous souhaitiez apprendre les bases, perfectionner votre technique ou explorer de nouvelles sensations, je vous accompagne sur les pistes mythiques de l'Espace Killy avec un suivi personnalisé et bienveillant ❄️✨.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Snowflake className="h-6 w-6 text-emerald-600" />
                  Cours de ski et snowboard pour tous les niveaux 🎯
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  Mes cours de ski et snowboard à Tignes – Val d'Isère s'adressent aussi bien aux débutants qu'aux skieurs confirmés et riders en quête de performance 🏂🔥. L'objectif : progresser efficacement, gagner en confiance et surtout prendre du plaisir sur la neige 😄.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 justify-center">
                  <Star className="h-6 w-6 text-amber-600" />
                  Pourquoi choisir un cours privé à Tignes – Val d'Isère ? ⭐
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Cours particuliers 100 % personnalisés</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Monitrice diplômée et passionnée</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Progression rapide et encadrement sécurisé</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Découverte des plus beaux secteurs de Tignes Le Lac, Val Claret et Val d'Isère</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 md:col-span-2">
                    <MapPin className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-gray-900">Flexibilité des horaires et du lieu de rendez-vous 📍</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
              À propos de Myriam 🏔️⛷️💻
            </h2>
            <div className="text-lg text-gray-700 max-w-4xl mx-auto">
              <div className="space-y-6 text-left">
                <p>
                  Je m'appelle <strong>Myriam Metenier</strong>, née à <strong>Lyon</strong> et installée en <strong>Tarentaise depuis plus de 32 ans</strong>. La montagne n'est pas seulement mon cadre de vie : c'est mon terrain d'expression, d'apprentissage et de transmission 🌲❄️.
                </p>
                <p>
                  Reconnue pour mon <strong>expertise</strong>, ma <strong>pédagogie</strong> et mon <strong>attachement profond au milieu montagnard</strong>, j'enseigne le <strong>ski alpin</strong> et le <strong>snowboard</strong> aux enfants comme aux adultes ⛷️🏂. J'accompagne chacun avec une approche personnalisée, adaptée au niveau, aux objectifs et à la sensibilité de chaque pratiquant. Au fil des années, j'ai guidé de nombreux groupes sur des terrains variés, en transmettant aussi bien les techniques avancées que les principes essentiels de sécurité en montagne 🛡️🏔️.
                </p>
                <p>
                  Très tôt, le sport a façonné mon parcours. Élevée dans la <strong>pratique du sport de haut niveau</strong>, j'ai évolué en <strong>course à pied – demi-fond</strong>, avec un <strong>record de France à 15 ans</strong> 🏃‍♀️🔥. Le dépassement de soi a toujours été une valeur centrale pour moi : se dépasser, oui, mais avant tout face à soi-même 💪. Et ce dépassement prend encore plus de sens lorsque je peux aider les autres à s'élever à travers leurs propres performances 🌟.
                </p>
                <p>
                  Après un <strong>baccalauréat en chimie</strong>, le besoin viscéral d'être proche de la montagne m'a conduite à m'installer définitivement en Tarentaise 🏔️. J'y ai obtenu le <strong>Diplôme d'État de ski alpin</strong>, après avoir débuté comme <strong>animatrice dès l'âge de 16 ans</strong>, puis enseigné le ski et le snowboard avec passion et engagement ⛷️🏂❤️.
                </p>
                <p>
                  Parallèlement, j'ai construit un parcours solide dans les <strong>nouvelles technologies</strong> 💻. Titulaire d'un <strong>BTS Services Informatiques aux Organisations – option SLAM</strong>, j'ai trouvé un équilibre précieux entre le besoin d'être active sur le terrain et celui de réfléchir, structurer et analyser 🧠. Cette dynamique m'a naturellement menée vers une <strong>Maîtrise d'Administrateur Infrastructure et Cloud</strong> ☁️.
                </p>
                <p>
                  Aujourd'hui, j'ai la chance de pouvoir concilier mes deux passions : les <strong>technologies numériques</strong> et mon <strong>amour de la glisse</strong> ❄️. Curieuse et en constante évolution, je poursuis activement mes compétences dans la <strong>cybersécurité</strong> 🔒 et l'<strong>intelligence artificielle</strong> 🤖.
                </p>
                <p>
                  En parallèle, je m'intéresse profondément à tout ce qui permet une <strong>meilleure connaissance de soi</strong> 🌿. Cette quête m'a conduite à obtenir des diplômes en <strong>naturopathie</strong> 🌱 et en <strong>psychanalyse</strong> 🧠, enrichissant ma compréhension de l'humain, de ses mécanismes et de son potentiel.
                </p>
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">🌟 Ce vers quoi je tends</h3>
                  <p>
                    La <strong>complémentarité de ces deux univers</strong> — la montagne et la technologie, le corps et l'esprit, l'action et la réflexion — est aujourd'hui au cœur de mon épanouissement ⚖️.
                  </p>
                  <p className="mt-4">
                    En tant que <strong>monitrice de ski</strong>, cet équilibre guide ma manière d'enseigner, d'accompagner et de transmettre.
                  </p>
                  <p className="mt-4">
                    Il me permet d'adopter une posture à la fois <strong>humaine et structurée</strong> : rester <strong>présente</strong>, <strong>observatrice</strong> et <strong>empathique</strong> 💛, tout en étant <strong>exigeante</strong>, <strong>concentrée</strong>, <strong>pragmatique</strong> et <strong>organisée</strong> 🎯. Sur les skis comme en dehors, j'avance avec attention, en m'adaptant à chacun et à chaque situation.
                  </p>
                  <p className="mt-4 italic text-gray-600">
                    C'est dans cette alliance entre sensibilité et rigueur que je continue de progresser, d'apprendre et de transmettre, au rythme de la montagne 🏔️✨
                  </p>
                </div>
              </div>
            </div>
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
          
          {/* Cours de Ski */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Mountain className="h-7 w-7 text-blue-600" />
                Cours de Ski ⛷️❄️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Découvrez le plaisir du ski alpin ⛷️❄️ avec des cours adaptés à tous les niveaux, du débutant au skieur confirmé !
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    🌱 Débutants
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les skieurs qui découvrent le ski alpin.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎿</span>
                      <span>Découverte et réglage du matériel (chaussures, skis, bâtons)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚖️</span>
                      <span>Position de base et équilibre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🛷</span>
                      <span>Glisse en ligne droite et premières sensations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>↩️</span>
                      <span>Techniques de freinage (chasse-neige) ⛔ et premiers virages</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-green-700">
                      🎯 Objectif : acquérir les bases du ski, gagner en confiance et descendre des pentes douces en toute sécurité 🛡️.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    ⛷️ Intermédiaires
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour ceux qui souhaitent améliorer leur technique.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🔄</span>
                      <span>Virages en parallèle et enchaînement fluide</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏁</span>
                      <span>Meilleur contrôle de la vitesse et de la trajectoire</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🎯</span>
                      <span>Travail de l'équilibre et des appuis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Introduction au carving sur pistes bleues et rouges</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-700">
                      🎯 Objectif : skier avec aisance sur des pentes plus soutenues et gagner en précision et en fluidité ⛷️💨.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    🔥 Avancé
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les skieurs confirmés souhaitant se perfectionner.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⚡</span>
                      <span>Carving avancé et virages coupés à haute vitesse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🖤</span>
                      <span>Techniques sur pistes rouges et noires</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🤸‍♂️</span>
                      <span>Initiation au freestyle (modules, sauts simples)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Bases du hors-piste et sécurité en montagne ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-orange-700">
                      🎯 Objectif : maîtriser une technique avancée, repousser ses limites et profiter pleinement du ski alpin dans toutes les conditions 🌟.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Ski Hors-Piste */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Mountain className="h-7 w-7 text-blue-600" />
                Ski Hors-Piste ⛷️🏔️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Explorez les montagnes 🏔️ et découvrez les sensations uniques du ski hors-piste ❄️⛷️ avec mes cours adaptés à tous les niveaux.
                Que vous soyez débutant en hors-piste 🌱 ou skieur expérimenté 🔥 cherchant à perfectionner votre technique, je vous accompagne avec sérieux et bienveillance, en toute sécurité 🛡️.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    🌨️ Découverte du ski hors-piste
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Idéal pour les skieurs expérimentés sur piste 🎿 souhaitant découvrir le hors-piste en douceur.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎒</span>
                      <span>Introduction à l'équipement (skis, DVA 📡, pelle, sonde)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⛷️</span>
                      <span>Techniques de base (positions, virages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🧭</span>
                      <span>Lecture du terrain et choix des lignes de descente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Premiers principes de sécurité avalanche ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-emerald-700">
                      🎯 Objectif : acquérir les bases nécessaires pour skier en toute sécurité en hors-piste et explorer des terrains faciles à modérés en confiance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-blue-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-700">
                    ❄️ Perfectionnement hors-piste
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les skieurs ayant déjà une première expérience du hors-piste.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Ce cours vise à :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⛷️</span>
                      <span>Techniques avancées (virages serrés, contrôle de la vitesse)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🌲</span>
                      <span>Navigation en terrain varié (poudreuse, neige croûtée, forêts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>📡</span>
                      <span>Utilisation avancée du DVA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Gestion des risques et choix des lignes de descente</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-blue-700">
                      🎯 Objectif : gagner en confiance et en compétence sur des terrains intermédiaires à difficiles, tout en renforçant les bonnes pratiques de sécurité.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    🏔️ Hors-piste expert / engagement
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Destiné aux skieurs confirmés 💪 pour des terrains exigeants.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⛰️</span>
                      <span>Ski en pente raide et couloirs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>❄️</span>
                      <span>Gestion des conditions de neige difficiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🚑</span>
                      <span>Techniques de secours en avalanche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🧭</span>
                      <span>Planification d'itinéraires et prise de décision en haute montagne</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-red-700">
                      🎯 Objectif : devenir un skieur hors-piste autonome et compétent, capable d'évoluer sur des terrains complexes en toute sécurité.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Snowboard Hors-Piste */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Snowflake className="h-7 w-7 text-purple-600" />
                Snowboard Hors-Piste 🏂🏔️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Plongez dans l'aventure 🏔️ et découvrez la liberté du snowboard hors-piste ❄️🏂 avec mes cours adaptés à tous les niveaux. Que vous soyez débutant 🌱 ou rider expérimenté 🔥 cherchant à perfectionner votre technique, je vous accompagne en toute sécurité 🛡️.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-emerald-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-emerald-700">
                    🌨️ Découverte du hors-piste
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Idéal pour les snowboarders ayant de l'expérience sur piste 🎿 et souhaitant explorer le hors-piste.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎒</span>
                      <span>Introduction à l'équipement 🏂 (planche, DVA 📡, pelle, sonde)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⛷️</span>
                      <span>Techniques de base (positions, virages)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🧭</span>
                      <span>Lecture du terrain et choix des lignes de descente</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Principes de sécurité avalanche ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-emerald-700">
                      🎯 Objectif : acquérir les bases nécessaires pour rider en toute sécurité et explorer des terrains faciles à modérés 🌲.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-purple-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-700">
                    ❄️ Perfectionnement hors-piste
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les riders ayant déjà une première expérience.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⛷️</span>
                      <span>Techniques avancées (virages serrés, contrôle de la vitesse)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🌨️</span>
                      <span>Navigation en terrain varié (poudreuse, croûtée, forêts)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>📡</span>
                      <span>Utilisation avancée du DVA</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Gestion des risques et choix des lignes de descente</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-purple-700">
                      🎯 Objectif : gagner en confiance et en compétence sur des terrains intermédiaires à difficiles, tout en renforçant les pratiques de sécurité.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-red-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    🏔️ Hors-piste expert / engagement
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les snowboarders confirmés 💪.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⛰️</span>
                      <span>Techniques en pente raide et couloirs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>❄️</span>
                      <span>Gestion des conditions de neige difficiles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🚑</span>
                      <span>Techniques de secours en avalanche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🧭</span>
                      <span>Planification d'itinéraires et prise de décision en haute montagne</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-red-700">
                      🎯 Objectif : devenir un rider autonome et compétent, capable de naviguer sur des terrains complexes en toute sécurité ✅.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Cours de Snowboard */}
          <div className="mb-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Snowflake className="h-7 w-7 text-cyan-600" />
                Cours de Snowboard 🏂❄️
              </h3>
              <p className="text-gray-700 mt-4 max-w-3xl mx-auto">
                Découvrez le plaisir du snowboard 🏂❄️ avec mes cours adaptés à tous les niveaux !
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow border-t-4 border-green-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-700">
                    🌱 Débutants
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les riders qui découvrent le snowboard.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Vous apprendrez :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🎒</span>
                      <span>Apprendre à connaître et ajuster l'équipement</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚖️</span>
                      <span>Positions de base et équilibre</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🛷</span>
                      <span>Glisser sur une surface plane</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>↩️</span>
                      <span>Techniques de freinage de base ⛔ et premiers virages</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-green-700">
                      🎯 Objectif : gagner en confiance et maîtriser les bases pour vos premières descentes sur des pentes douces en toute sécurité 🛡️.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-cyan-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-700">
                    ⛷️ Intermédiaires
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour ceux qui veulent progresser.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>🔄</span>
                      <span>Techniques de virage avancées</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏁</span>
                      <span>Contrôle de la vitesse et de la direction</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🎯</span>
                      <span>Initiation au carving</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>✨</span>
                      <span>Introduction au freestyle (sauts simples et figures de base)</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-cyan-700">
                      🎯 Objectif : être à l'aise sur des pentes plus raides et commencer à explorer le freestyle 🏂💨.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow border-t-4 border-orange-500">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-700">
                    🔥 Avancés
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Pour les riders confirmés souhaitant repousser leurs limites.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-700 font-medium">Au programme :</p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li className="flex items-start gap-2">
                      <span>⛷️</span>
                      <span>Carving avancé et techniques de virage</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🤸‍♂️</span>
                      <span>Sauts et figures en freestyle (grabs, rotations…)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>🏔️</span>
                      <span>Techniques de hors-piste / backcountry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Sécurité en montagne et avalanche ❄️</span>
                    </li>
                  </ul>
                  <div className="pt-3 border-t border-gray-100">
                    <p className="text-sm font-medium text-orange-700">
                      🎯 Objectif : maîtriser des techniques avancées et profiter pleinement du snowboard dans toutes ses dimensions 🌟.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-200 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-indigo-200 rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-8 py-4 shadow-xl border border-white/20">
              <div className="flex items-center gap-2">
                <Star className="h-8 w-8 text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Avis Clients
                </h2>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-6">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                ))}
                <span className="ml-2 text-3xl font-bold text-gray-900">4.97</span>
                <span className="text-lg text-gray-600 font-medium ml-2">(65 avis)</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-full px-4 py-2 border border-green-200">
                <TrendingUp className="h-5 w-5 text-green-600" />
                <span className="text-lg font-semibold text-green-700">90% des commentaires sont 5 étoiles</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { name: 'Liliana H.', rating: 5, date: '16/02/2026', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam is an excellent ski instructor. Despite challenging weather conditions and the lesson having to be cut short due to lift closures, Myriam made every minute count and provided excellent tips to improve my skiing. She was encouraging and fully present throughout and managed to turn difficult weather situation into a genuinely positive and motivating experience. Thank you Myriam!" },
              { name: 'Géraldine G.', rating: 5, date: '16/02/2026', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam est très agréable et très professionnelle Ma fille a beaucoup apprécié sa première leçon de ski en sa compagnie Merci" },
              { name: 'Samantha A.', rating: 5, date: '09/02/2026', location: 'Skiing, Val d\'Isère', hours: 12, text: "I wanted to build my confidence and Myriam provided excellent pre lesson motivation and demonstrated a good understanding of what I was trying to achieve. The lessons were informative and focussed on improving my technique to build confidence. A minor issues was sometimes the language barrier prevented more detailed technical discussions but this did not prevent me meeting my goals. A big advantage was Myriams knowledge of the best areas in the mountain and the snow conditions." },
              { name: 'Denise E.', rating: 5, date: '04/02/2026', location: 'Skiing, Les Arcs 1800', hours: 8, text: "Very good! Lots of experience and a very good tutor for a intermediate skier." },
              { name: 'Naz Y.', rating: 5, date: '02/02/2026', location: 'Skiing, Val d\'Isère', hours: 25, text: "Our two kids loved to ski with Myriam for the whole week. She is a great instructor and very good with kids." },
              { name: 'Harry L.', rating: 5, date: '12/04/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Hi Myriam. I just wanted to thank you so much for looking after the children, Arthur yesterday and both Florence and Arthur today. They had the best time and you were so great with Florence, especially after her big accident on the slopes yesterday. She needed a big confidence boost and you gave it to her so THANK YOU!" },
              { name: 'Ben H.', rating: 5, date: '21/03/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was super! She listened, pushed me when right and was kind, and understanding of my nerves. Lots of local information made my experience with her 10/10." },
              { name: 'Rachel B.', rating: 5, date: '18/03/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was a great instructor. She was really patient and explained everything really well. Highly recommend!" },
              { name: 'Stephanie M.', rating: 5, date: '07/03/2025', location: 'Skiing, Val d\'Isère', hours: 2, text: "Une super prof, très pédagogue et attentionnée, encore merci et à l'année prochaine !" },
              { name: 'Faris A.', rating: 5, date: '05/03/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Amazing Ski Instructor – Thank You, Myriam! I had the best experience learning from Myriam in Val d'Isère! She's not just an incredible ski instructor—she's warm, patient, and truly knows how to bring out the best in you on the slopes. Before my lessons with her, black slopes felt intimidating, but thanks to her clear guidance and expert coaching, I was able to tackle them with confidence and ease. She breaks everything down in a way that just clicks, making even the toughest techniques feel doable. She's also great at pushing you just enough to improve without ever making you feel overwhelmed. Beyond the technical skills, Myriam made every lesson fun and engaging. She knows the best spots on the mountain and made sure I experienced some amazing runs. Her energy and encouragement made such a difference, and I can honestly say my skiing has improved exponentially because of her. If you're looking for an instructor who is not only skilled but also makes learning enjoyable, Myriam is the one! I can't thank her enough for such an incredible experience." },
              { name: 'David Y.', rating: 5, date: '04/03/2025', location: 'Off-piste Skiing, Val d\'Isère', hours: 8, text: "We scheduled Myriam for two half day off piste sessions in February. She was fantastic in navigating different skiing abilities in our family and extremely knowledgeable. Myriam is patient and friendly while offering excellent technical instruction. We sent four teenagers with her on the second day and they each enjoyed one of their best ski days ever because of Myriam's guidance. Whether you are an expert or intermediate skier, I can strongly recommend Myriam and booking with Maison Sport - a flawless process!" },
              { name: 'Serra K.', rating: 5, date: '03/03/2025', location: 'Skiing, Val d\'Isère', hours: 2, text: "Hi, Myriam was a really nice instructor, to whom we told our needs in advance and she adapted the session to our needs very very well." },
              { name: 'Stephanie M.', rating: 5, date: '02/03/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Merci Myriam M" },
              { name: 'Carwyn D.', rating: 5, date: '28/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was great at making sure I was technically correct with my turns, first day skiing in 20 years and on our second day I was onto the black runs." },
              { name: 'Neil H.', rating: 5, date: '23/02/2025', location: 'Off-piste Skiing, Val d\'Isère', hours: 12, text: "Myriam is an extremely friendly and very nice person, who was flexible in approach, and was very insightful in terms of technical tips on skiing skills, in our case, in guided off-piste sessions. I would certainly recommend her." },
              { name: 'Jennifer T.', rating: 5, date: '17/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam gave my kids and I a great lesson for an afternoon. She was able to provide specific feedback to each of us and technical instruction to help us improve depending on what we needed to practice. We have hired instructors in past years and my kids and I think she is the best one." },
              { name: 'Sophie W.', rating: 5, date: '17/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was a fantastic instructor who tailored the technical instruction perfectly for the different skill levels of our lesson. Myriam really understood our strengths and development areas and paced the session perfectly throughout. We both improved significantly over the session. We would definitely book Myriam again in the future and really enjoyed our lesson. Thank you!" },
              { name: 'Olivia H.', rating: 5, date: '08/02/2025', location: 'Skiing, Val d\'Isère', hours: 6, text: "Myriam was fantastic! she knows the area very well and took us to places that were less crowded and challenged me when I needed an extra push. highly recommend." },
              { name: 'Naomi H.', rating: 5, date: '08/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was great! Made first day in Val d'Isère easy. Couldn't have done it without her. She made it fun for the kids; gave good pointers along the way; covered a lot of territory and didn't mind we didn't want to have many breaks! She was patient and kind; - absolutely lovely person. An amazing skier! I'd definitely recommend her." },
              { name: 'Adam W.', rating: 5, date: '07/02/2025', location: 'Skiing, Val d\'Isère', hours: 4, text: "Myriam was very flexible with timings of lesson which ended up being very important with cancelled flights. She is very friendly and recommended great slopes for my ability. She was very good at putting things simply for me to understand and left me with things to work on for the rest of my ski holiday. Thanks Myriam!" },
              { name: 'Aidan O.', rating: 5, date: '07/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Excellent lesson and brought me around me to several areas of resort to experience different challanges" },
              { name: 'Reuben H.', rating: 5, date: '07/02/2025', location: 'Skiing, Tignes', hours: 3, text: "Myriam was friendly and noticed straight away what i required for improvement. Also very informative on the surrounding ski and mountain areas. A great lesson." },
              { name: 'Fi B.', rating: 5, date: '06/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "I really enjoyed my lesson with Myriam! She was able to instil a confidence in my skiing which I am very thankful for! After my lesson, my husband changed my skis (25 years old) to enhance my new skiing abilities! When I come back to Val D'Isere I will definitely book you again (if you'll have me). Thank you Myriam." },
              { name: 'Sophie B.', rating: 5, date: '04/02/2025', location: 'Skiing, Val d\'Isère', hours: 3, text: "Myriam was friendly and really put me at ease in my lesson. She was easy to follow and helped build my confidence and set me up for a great week of skiing! I really recommend her" },
              { name: 'Lee P.', rating: 5, date: '05/01/2025', location: 'Skiing, Val d\'Isère', hours: 8, text: "Myriam has great technical knowledge and experience. Definitely improved my skiing technique at my pace." },
              { name: 'Louis B.', rating: 5, date: '26/01/2026', location: 'Ski, Tignes', hours: 4, text: "Après un seul après midi ma copine qui a été accompagnée de Myriam n'avait que des bonnes choses a dire à propos de Myriam, et pouvait descendre des pistes bleues. Je recommande vivement les services de Myriam." },
              { name: 'Benny A.', rating: 5, date: '26/01/2026', location: 'Snowboard, Les Arcs', hours: 4, text: "I highly recommend taking Myriam as an instructor. She proved to be very patient and was very helpful in creating confidence on the slopes." },
              { name: 'Gilly W.', rating: 5, date: '21/01/2026', location: 'Ski, Les Arcs 1600', hours: 6, text: "Highly recommend Myriam! Excellent in every way. She gave me plenty of simple, useful tips to improve my technique. I really appreciated that she showed me plenty of different slopes and lifts, so that we would have a fantastic holiday. Such a nice person, too - I felt really comfortable with her. Only positive things to say and I would absolutely book another session with Myriam, if I return to Les Arcs." },
              { name: 'Charlie B.', rating: 5, date: '18/01/2026', location: 'Ski, Les Arcs', hours: 6, text: "We had a really successful day with Myriam. We are a family of four from Australia & Myriam gave us a group lesson for the first day of our skiing holiday. The two kids (10 & 12) hadn't really skied before & the adults are intermediate and in need of some tips to get us started for the trip. Myriam did a fantastic job getting the kids up and going very quickly within one day, skiing down a blue run by the end of day one. We were very impressed. Myriam's communication was ever so slightly unclear at times but her ability to teach the kids so quickly easily outshone any minor issues!" },
              { name: 'Charles C.', rating: 5, date: '13/01/2026', location: 'Ski, Tignes', hours: 6, text: "Myriam pushed us to our limits with great feedback on how to improve our technique. Where one technique may not have worked, she had another method to help us. A very nice instructor that we both recommend!!" },
              { name: 'Scout S.', rating: 5, date: '07/01/2026', location: 'Ski, Val d\'Isère', hours: 36, text: "I booked Myriam for my clients & they said she was a fantastic instructor." },
              { name: 'Nadia B.', rating: 5, date: '25/12/2025', location: 'Ski, Les Arcs 1950', hours: 2, text: "Merci beaucoup Myriam, ces 2 heures de cours m'ont beaucoup aidée à me concentrer sur les bonnes techniques et ont été faciles à appliquer par la suite." },
              { name: 'Julien M.', rating: 5, date: '25/12/2025', location: 'Ski, Les Arcs 1600', hours: 2, text: "Séance au top! Myriam a vraiment adapté la séance à mon niveau et de très bon conseil. Je recommande fortement!! Excellente monitrice!" },
              { name: 'Nicola M.', rating: 5, date: '10/12/2025', location: 'Ski, Tignes', hours: 3, text: "We had a super lesson with Myriam, she was extremely friendly and helpful from the first text message that she sent to me. She was able to look at how we skied and give us clear instruction of what we were doing wrong and what changes we needed make to improve our technique. By the end of the day I was skiing with much more confidence. Myriam was also a great ski guide, very familiar with all the ski routes/pistes and local restaurants - also extremely knowledgeable on local area and it's history. I'm hoping we return to Tignes again soon and would book her again for more lessons." },
              { name: 'Xavi R.', rating: 5, date: '09/12/2025', location: 'Ski, Tignes', hours: 4, text: "The lesson was great! I couldn't have asked for a better teacher. Maryam was super friendly and knowledgeable. Communication was smooth and Maryam was super flexible. Looking forward to my next lesson with her!" },
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
                className="bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100/50 hover:border-blue-200/50 relative overflow-hidden group"
              >
                {/* Card decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-bl-full opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-green-100 to-emerald-100 rounded-tr-full opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                
                <CardHeader className="relative z-10 pb-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-900 mb-1">{review.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${i <= Math.round(review.rating) ? 'text-yellow-500 fill-yellow-500 drop-shadow-sm' : 'text-gray-300'}`} 
                            />
                          ))}
                          <span className="ml-1 text-sm font-medium text-gray-700">{review.rating} ⭐</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg px-3 py-1 border border-blue-200/50">
                        <span className="text-xs font-semibold text-blue-700">{review.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600 mt-3">
                    <div className="flex items-center gap-1 bg-gray-50 rounded-full px-3 py-1">
                      <Mountain className="h-4 w-4 text-gray-500" />
                      <span className="font-medium text-gray-700">{review.location}</span>
                    </div>
                    {review.hours && (
                      <div className="flex items-center gap-1 bg-green-50 rounded-full px-3 py-1">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="font-medium text-green-700">{review.hours}h</span>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="relative z-10 pt-0">
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-3xl text-blue-200 opacity-50">"</div>
                    <p className={`text-gray-700 leading-relaxed pl-6 pr-2 ${isLongReview(review.text) && !expandedReviews[idx] ? 'max-h-32 overflow-hidden' : ''}`}>
                      {review.text}
                    </p>
                    {isLongReview(review.text) && (
                      <button
                        onClick={() => toggleReviewExpansion(idx)}
                        className="mt-3 text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center gap-1 transition-all duration-200 hover:gap-2 group"
                        aria-expanded={expandedReviews[idx]}
                        aria-label={expandedReviews[idx] ? "Lire moins" : "Lire plus"}
                      >
                        {expandedReviews[idx] ? (
                          <>
                            <ChevronUp className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1" />
                            <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 group-hover:bg-blue-100 transition-colors duration-200">
                              Réduire
                            </span>
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-1" />
                            <span className="bg-blue-50 px-3 py-1 rounded-full border border-blue-200 group-hover:bg-blue-100 transition-colors duration-200">
                              Lire plus
                            </span>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-8 bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl border border-white/30">
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Award className="h-6 w-6 text-blue-600" />
                  Note moyenne
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">4.97</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-6 w-6 text-yellow-500 fill-yellow-500 drop-shadow-md" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">basé sur 65 avis</div>
              </div>
              <div className="border-l-2 border-gray-200 pl-8 text-left">
                <div className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Appréciations
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-between">
                    <span>Amabilité</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '100%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">5.0</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Communication</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '97.8%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">4.89</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Ponctualité</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-400 to-green-600 h-2 rounded-full" style={{width: '99.6%'}}></div>
                      </div>
                      <span className="font-bold text-green-600">4.98</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-teal-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-cyan-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-2xl mb-6 shadow-2xl">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Réserver vos cours (Hiver 2025-2026)
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Planning détaillé et tarifs pour vos cours particuliers de ski et snowboard
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300">
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Planning des disponibilités</h3>
                  <p className="text-sm text-gray-600">Sélectionnez votre semaine et réservez en ligne</p>
                </div>
              </div>
              
              {/* Légende des statuts */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-lg border border-emerald-200">
                  <CheckCircle className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm text-emerald-700">Disponible</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 rounded-lg border border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <span className="text-sm text-amber-700">Partiel</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-red-50 rounded-lg border border-red-200">
                  <X className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-700">Complet</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg border border-blue-200">
                  <Info className="h-4 w-4 text-blue-600" />
                  <span className="text-sm text-blue-700">Règle spéciale</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-full">
                <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-t-xl p-4 border border-teal-200">
                  <div className="grid grid-cols-7 gap-4 text-center font-semibold text-gray-800">
                    <div>Semaine</div>
                    <div>Dates</div>
                    <div>Tarif H</div>
                    <div>Tarif J</div>
                    <div>Remise</div>
                    <div>Créneaux</div>
                    <div>Action</div>
                  </div>
                </div>
                <div className="divide-y divide-gray-200">
                  {[
                    {w:'49',d:'30/11/2025 - 06/12/2025',h:'€78.00',j:'€495.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'01/12/2025',blocked:'09:00-12:30',availableSlots:['12:30-16:30']},
                        {date:'02/12/2025',blocked:'09:00-11:00',availableSlots:['11:00-16:30']},
                        {date:'04/12/2025',blocked:'11:00-13:00',availableSlots:['09:00-11:00', '13:00-16:30']},
                        {date:'08/12/2025',blocked:'11:00-13:00 et 14:00-16:00',availableSlots:['09:00-11:00', '13:00-14:00', '16:00-16:30']},
                        {date:'13/12/2025',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['03/12/2025','05/12/2025','06/12/2025','07/12/2025','09/12/2025','10/12/2025','11/12/2025','12/12/2025','27/12/2025'],
                      dailyFullBlockedDates:['14/12/2025','15/12/2025','16/12/2025','17/12/2025','18/12/2025','19/12/2025'],
                      dailyPartialSlots2:[
                        {date:'21/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'23/12/2025',blocked:'09:00-14:00',availableSlots:['14:00-16:30']}
                      ],
                      dailyFullBlockedDates2:['24/12/2025','25/12/2025','26/12/2025']
                    },
                    {w:'1',d:'28/12/2025 - 03/01/2026',h:'€115.00',j:'€699.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyFullBlockedDates:['28/12/2025','29/12/2025','30/12/2025','31/12/2025','01/01/2026','02/01/2026','04/01/2026','05/01/2026'],
                      dailyPartialSlots:[
                        {date:'06/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'07/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'08/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'09/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'10/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'13/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'14/01/2026',blocked:'10:30-13:30',availableSlots:['09:00-10:30', '13:30-16:30']},
                        {date:'15/01/2026',blocked:'10:30-13:30',availableSlots:['09:00-10:30', '13:30-16:30']},
                        {date:'16/01/2026',blocked:'10:30-16:30',availableSlots:['09:00-10:30']},
                        {date:'18/01/2026',blocked:'09:00-12:00 et 16:30-18:00',availableSlots:['12:00-16:30']},
                        {date:'19/01/2026',blocked:'09:00-12:00 et 13:00-16:30',availableSlots:['12:00-13:00']},
                        {date:'20/01/2026',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'21/01/2026',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/01/2026',blocked:'09:00-13:00 et 13:30-16:30',availableSlots:['13:00-13:30']},
                        {date:'23/01/2026',blocked:'09:00-13:00 et 13:30-16:30',availableSlots:['13:00-13:30']},
                        {date:'25/01/2026',blocked:'13:00-16:30',availableSlots:['09:00-13:00']},
                        {date:'26/01/2026',blocked:'09:00-16:30',availableSlots:[]},
                        {date:'27/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'28/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'29/01/2026',blocked:'09:00-14:00',availableSlots:['14:00-16:30']},
                        {date:'30/01/2026',blocked:'09:00-16:30',availableSlots:[]},
                        {date:'31/01/2026',blocked:'09:00-12:15',availableSlots:['12:15-16:30']}
                      ],
                      dailyAvailableDates:['11/01/2026','17/01/2026','24/01/2026'],
                      dailyFullBlockedDates2:['12/01/2026']
                    },
                    {w:'50',d:'07/12/2025 - 13/12/2025',h:'€79.00',j:'€522.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'08/12/2025',blocked:'11:00-13:00 et 14:00-16:00',availableSlots:['09:00-11:00', '13:00-14:00', '16:00-16:30']},
                        {date:'13/12/2025',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['09/12/2025','10/12/2025','11/12/2025','12/12/2025']
                    },
                    {w:'51',d:'14/12/2025 - 20/12/2025',h:'€91.00',j:'€554.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyFullBlockedDates:['14/12/2025','15/12/2025','16/12/2025','17/12/2025','18/12/2025','19/12/2025']
                    },
                    {w:'52',d:'21/12/2025 - 27/12/2025',h:'€101.00',j:'€629.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'21/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'22/12/2025',blocked:'09:00-12:00',availableSlots:['12:00-16:30']},
                        {date:'23/12/2025',blocked:'09:00-14:00',availableSlots:['14:00-16:30']}
                      ],
                      dailyFullBlockedDates:['24/12/2025','25/12/2025','26/12/2025']
                    },
                    {w:'2',d:'04/01/2026 - 10/01/2026',h:'€95.00',j:'€550.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'06/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'07/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'08/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'09/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'10/01/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyFullBlockedDates:['04/01/2026','05/01/2026']
                    },
                    {w:'3',d:'11/01/2026 - 17/01/2026',h:'€105.00',j:'€566.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',},
                    {w:'4',d:'18/01/2026 - 24/01/2026',h:'€90.00',j:'€550.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',},
                    {w:'5',d:'25/01/2026 - 31/01/2026',h:'€95.00',j:'€660.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30 (26-30/01: 09:00-14:00 indisponible ; 14:00-17:00 disponible)',dailyExtendedMorningBlocks:['26/01/2026','27/01/2026','28/01/2026','29/01/2026','30/01/2026'],},
                    {w:'6',d:'01/02/2026 - 07/02/2026',h:'€96.00',j:'€700.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',dailyPartialSlots:[{date:'01/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'02/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},{date:'03/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}]},
                    {w:'7',d:'08/02/2026 - 14/02/2026',h:'€110.00',j:'€750.00',r:'5%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'01/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'02/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'03/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'04/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'05/02/2026',blocked:'09:00-13:30',availableSlots:['13:30-16:30']},
                        {date:'10/02/2026',blocked:'09:00-13:30',availableSlots:['13:30-16:30']},
                        {date:'14/02/2026',blocked:'13:00-16:30',availableSlots:['09:00-13:00']}
                      ],
                      dailyAvailableDates:['06/02/2026','07/02/2026','08/02/2026','11/02/2026','12/02/2026','13/02/2026'],
                      dailyFullBlockedDates:['09/02/2026']
                    },
                    {w:'8',d:'15/02/2026 - 21/02/2026',h:'€131.00',j:'€900.00',r:'8%',c:'09:00-13:00 ; 13:00-17:00',rule:true,
                      dailyFullBlockedDates:['15/02/2026','16/02/2026','17/02/2026','18/02/2026','19/02/2026','20/02/2026'],
                      dailyPartialSlots:[
                        {date:'21/02/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ]
                    },
                    {w:'9',d:'22/02/2026 - 28/02/2026',h:'€120.00',j:'€599.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                    {w:'10',d:'01/03/2026 - 07/03/2026',h:'€105.00',j:'€549.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',
                      dailyPartialSlots:[
                        {date:'01/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ]
                    },
                    {w:'11',d:'08/03/2026 - 14/03/2026',h:'€99.00',j:'€537.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'12',d:'15/03/2026 - 21/03/2026',h:'€94.00',j:'€507.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'13',d:'22/03/2026 - 28/03/2026',h:'€95.00',j:'€491.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'14',d:'29/03/2026 - 04/04/2026',h:'€115.00',j:'€653.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true,
                      dailyPartialSlots:[
                        {date:'29/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'30/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'31/03/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'01/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'02/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']},
                        {date:'03/04/2026',blocked:'09:00-13:00',availableSlots:['13:00-16:30']}
                      ],
                      dailyAvailableDates:['04/04/2026']
                    },
                    {w:'15',d:'05/04/2026 - 11/04/2026',h:'€111.00',j:'€630.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30',rule:true},
                    {w:'16',d:'12/04/2026 - 18/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'17',d:'19/04/2026 - 25/04/2026',h:'€110.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'},
                    {w:'18',d:'26/04/2026 - 02/05/2026',h:'€99.00',j:'€600.00',r:'8%',c:'09:00-13:00 ; 13:00-16:30'}
                  ].map((row,idx)=> (
                    <div key={idx} className={`p-4 hover:bg-gray-50 transition-colors ${row.reserved ? 'opacity-60' : ''}`}>
                      <div className="grid grid-cols-7 gap-4 items-center">
                        <div className="font-semibold text-gray-900">{row.w}</div>
                        <div className="text-sm text-gray-700">{row.d}</div>
                        <div className="text-sm font-medium text-teal-600">{row.h}</div>
                        <div className="text-sm font-medium text-teal-600">{row.j}</div>
                        <div className="text-sm text-teal-600">{row.r}</div>
                        <div className="text-sm text-gray-700">{row.c}</div>
                        <div>
                          {row.reserved ? (
                            <span className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed select-none">
                              Complet
                            </span>
                          ) : (
                            <a 
                              href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-teal-500 transition-all duration-300"
                            >
                              Réserver
                            </a>
                          )}
                        </div>
                      </div>
                      
                      {/* Affichage détaillé des disponibilités */}
                      <div className="mt-3 space-y-2">
                        {Array.isArray(row.dailyPartialSlots) && row.dailyPartialSlots.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyPartialSlots.map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex flex-wrap gap-2">
                                {slot.blocked && (
                                  <span title={`Indisponible le ${slot.date} (${slot.blocked})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                    <X className="h-3 w-3" />
                                    {slot.date} · {slot.blocked} indisponible
                                  </span>
                                )}
                                {Array.isArray(slot.availableSlots) && slot.availableSlots.map((availableSlot, availableIdx) => (
                                  <span key={availableIdx} title={`Disponible le ${slot.date} (${availableSlot})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="h-3 w-3" />
                                    {slot.date} · {availableSlot}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyAvailableDates) && row.dailyAvailableDates.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyAvailableDates.map((dateStr) => (
                              <span key={dateStr} title={`Disponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <CheckCircle className="h-3 w-3" />
                                {dateStr} · Journée complète
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyFullBlockedDates) && row.dailyFullBlockedDates.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyFullBlockedDates.map((dateStr) => (
                              <span key={dateStr} title={`Journée complète indisponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                <X className="h-3 w-3" />
                                {dateStr} · Complet
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyPartialSlots2) && row.dailyPartialSlots2.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyPartialSlots2.map((slot, slotIdx) => (
                              <div key={slotIdx} className="flex flex-wrap gap-2">
                                {slot.blocked && (
                                  <span title={`Indisponible le ${slot.date} (${slot.blocked})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                    <X className="h-3 w-3" />
                                    {slot.date} · {slot.blocked} indisponible
                                  </span>
                                )}
                                {Array.isArray(slot.availableSlots) && slot.availableSlots.map((availableSlot, availableIdx) => (
                                  <span key={availableIdx} title={`Disponible le ${slot.date} (${availableSlot})`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <CheckCircle className="h-3 w-3" />
                                    {slot.date} · {availableSlot}
                                  </span>
                                ))}
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {Array.isArray(row.dailyFullBlockedDates2) && row.dailyFullBlockedDates2.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {row.dailyFullBlockedDates2.map((dateStr) => (
                              <span key={dateStr} title={`Journée complète indisponible le ${dateStr}`} className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-red-50 text-red-700 border border-red-200">
                                <X className="h-3 w-3" />
                                {dateStr} · Complet
                              </span>
                            ))}
                          </div>
                        )}
                        
                        {row.rule && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Info className="h-3 w-3" />
                            Règle spéciale de réservation
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Widget de réservation interactif par date/slot */}
            <div className="mt-12">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Réserver par date</h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Consultez le calendrier interactif pour vérifier les disponibilités en temps réel et réservez directement votre créneau horaire.
                </p>
              </div>
              <BookingWidget 
                bookingUrl="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-purple-400 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute top-1/2 left-10 w-64 h-64 bg-pink-300 rounded-full blur-3xl animate-pulse delay-500"></div>
          <div className="absolute bottom-40 right-40 w-56 h-56 bg-cyan-300 rounded-full blur-3xl animate-pulse delay-1500"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-2xl transform hover:scale-110 transition-all duration-300">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-gradient">
              Blog
            </h2>
            <p className="text-2xl text-gray-700 max-w-3xl mx-auto font-medium">
              Actus, conseils et bons plans Tignes & Val d'Isère
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium border border-blue-200">
                📰 Articles exclusifs
              </span>
              <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium border border-indigo-200">
                🎿 Expert ski
              </span>
              <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                🏔️ Guide complet
              </span>
            </div>
          </div>
          
          {/* Encart Diplôme d'État français */}
          <div className="mb-12">
            <div className="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 transform hover:scale-[1.02] transition-all duration-500">
              {/* Décoration de fond */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-300 rounded-full blur-3xl animate-pulse delay-500"></div>
              </div>
              
              <div className="relative z-10 p-8 md:p-12">
                <div className="flex items-start gap-6 mb-8">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform hover:rotate-12 transition-all duration-300">
                      <span className="text-5xl">🇫🇷</span>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
                      Diplôme d'État de Ski Alpin 🇫🇷
                    </h3>
                    <p className="text-2xl text-white/90 mb-6">
                      Une formation d'excellence reconnue mondialement
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        ⭐ Référence mondiale
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        🏆 Niveau technique exceptionnel
                      </span>
                      <span className="px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium border border-white/30 transform hover:scale-105 transition-all duration-200">
                        📚 Formation complète
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      Structure du diplôme
                    </h4>
                    <ul className="space-y-3 text-white/90">
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Autorité :</strong> École Nationale des Sports de Montagne + Ministère des Sports</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Statut :</strong> Diplôme d'État national</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Durée :</strong> 4 à 6 ans de formation</span>
                      </li>
                      <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white mt-1">✓</span>
                        <span><strong>Reconnaissance :</strong> Carte ISIA, travail en Europe</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <div className="p-2 bg-yellow-500 rounded-lg">
                        <Star className="h-5 w-5 text-white" />
                      </div>
                      Parcours de formation
                    </h4>
                    <div className="space-y-3 text-white/90 mb-4">
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">1.</span>
                        <span>Test technique (slalom géant chronométré)</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">2.</span>
                        <span>Cycle préparatoire</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">3.</span>
                        <span>Eurotest</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">4.</span>
                        <span>Stages pédagogiques et techniques</span>
                      </div>
                      <div className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <span className="text-white font-bold">5.</span>
                        <span><strong>Diplôme d'État Ski Alpin</strong></span>
                      </div>
                    </div>
                    <div className="pt-4 border-t border-white/20 space-y-2">
                      <a 
                        href="https://www.ensm.sports.gouv.fr/formation-de-moniteur-de-ski-alpin/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">En savoir plus sur la formation ENSM</span>
                      </a>
                      <a 
                        href="https://www.ensm.sports.gouv.fr/wp-content/uploads/2024/12/D.E-SKI-ALPIN.pdf" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white hover:text-blue-200 transition-all duration-200 underline decoration-white/50 hover:decoration-white transform hover:translate-x-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        <span className="text-sm">Télécharger le cursus complet (PDF)</span>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-[1.02] hover:bg-white/15 transition-all duration-300">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <div className="p-2 bg-red-500 rounded-lg">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    Philosophie pédagogique française
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                    <div>
                      <p className="font-semibold text-white mb-2">Caractéristiques :</p>
                      <ul className="space-y-2 text-sm">
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Sélection initiale très compétitive (Eurotest)</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Forte dominance du ski de géant</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Progression longue avec alternance stages–enseignements</li>
                        <li className="transform hover:translate-x-1 transition-all duration-200">• Accent sur précision technique et démonstration parfaite</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-semibold text-white mb-2">Objectif :</p>
                      <p className="text-sm">
                        Former un <strong>technicien expert</strong> capable d'enseigner au plus haut niveau, avec une pédagogie structurée nationale et une maîtrise technique exceptionnelle.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">⭐</div>
                    <div className="text-white font-semibold">Référence mondiale</div>
                    <div className="text-white/80 text-sm mt-1">Diplôme le plus sélectif techniquement</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">🏆</div>
                    <div className="text-white font-semibold">Excellence technique</div>
                    <div className="text-white/80 text-sm mt-1">Niveau technique exceptionnel</div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 text-center transform hover:scale-105 hover:bg-white/15 transition-all duration-300">
                    <div className="text-4xl font-bold text-white mb-2">📚</div>
                    <div className="text-white font-semibold">Formation complète</div>
                    <div className="text-white/80 text-sm mt-1">Pédagogie structurée nationale</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Dates d'ouverture & fermeture</h3>
                    <p className="text-gray-600">Saison hiver 2025-2026</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Mountain className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">Tignes</span>
                    </div>
                    <p className="text-gray-700">Fin novembre → début mai</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Compass className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold text-gray-900">Val d'Isère</span>
                    </div>
                    <p className="text-gray-700">Début décembre → début mai</p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a href="https://www.tignes.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-200">
                      <span>🏔️</span>
                      <span>Site Tignes</span>
                    </a>
                    <a href="https://www.valdisere.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transform hover:scale-105 transition-all duration-200">
                      <span>🎿</span>
                      <span>Site Val d'Isère</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-green-100 to-cyan-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Programme d'animations</h3>
                    <p className="text-gray-600">Agenda des événements</p>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a href="https://play.google.com/store/search?q=tignes&c=apps" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
                      <span>📱</span>
                      <span>Apps Tignes</span>
                    </a>
                    <a href="https://play.google.com/store/search?q=val%20d%27isere&c=apps" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                      <span>📲</span>
                      <span>Apps Val d'Isère</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-100 to-green-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <Info className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Offices & Remontées</h3>
                    <p className="text-gray-600">Services pratiques</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3">Accédez aux services essentiels :</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Offices de tourisme</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Achat de forfaits en ligne</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Informations remontées</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <a href="https://www.tignes.net" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 transform hover:scale-105">
                      <span>🏢</span>
                      <span>Office Tignes</span>
                    </a>
                    <a href="https://www.compagniedesalpes.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all duration-200 transform hover:scale-105">
                      <span>🚡</span>
                      <span>Remontées</span>
                    </a>
                    <a href="https://www.valdisere.com" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-all duration-200 transform hover:scale-105">
                      <span>🏔️</span>
                      <span>Office Val d'Isère</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-rose-100 to-red-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Conseils équipement</h3>
                    <p className="text-gray-600">Sécurité & performance</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3">Équipement obligatoire en hors-piste :</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span className="text-gray-700 font-medium">DVA (Détecteur de Victimes d'Avalanche)</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Pelle et sonde</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Casque et dorsale</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-100">
                      <p className="text-gray-700 mb-2">💡 <strong>Conseils pro :</strong></p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-gray-700">Location près des pistes</span>
                        </div>
                        <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                          <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                          <span className="text-gray-700">Bootfitting pour le confort</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-100 to-blue-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Conseils choix des pistes</h3>
                    <p className="text-gray-600">Optimisez vos descentes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3">Stratégies selon l'heure :</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <Sun className="h-4 w-4 text-indigo-600" />
                        <span className="text-gray-700 font-medium">🌅 Matin</span>
                        <span className="text-gray-600">Pentes ensoleillées, neige dure</span>
                      </div>
                      <div className="flex items-center gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <Cloud className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700 font-medium">🌤️ Après-midi</span>
                        <span className="text-gray-600">Neiges plus souples, ombragées</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <p className="text-gray-700 mb-2">⚠️ <strong>Avant hors-piste :</strong></p>
                      <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-orange-600" />
                        <span className="text-gray-700">Consulter le bulletin d'avalanche</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encart 10 Règles Essentielles de Sécurité */}
            <div className="group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-red-100 to-orange-100 rounded-full -mr-20 -mt-20 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -ml-16 -mb-16 opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl mr-4 transform group-hover:rotate-12 transition-all duration-300">
                    <ShieldAlert className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">Les 10 Règles Essentielles de Sécurité</h3>
                    <p className="text-gray-600">Le code de conduite sur les pistes</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4 transform hover:scale-105 transition-all duration-200">
                    <p className="text-gray-700 mb-3 font-semibold">Les règles fondamentales à respecter absolument :</p>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold text-sm">1</div>
                        <div>
                          <span className="font-semibold text-gray-900">Respect d'autrui</span>
                          <p className="text-gray-600 text-sm">Ne pas mettre les autres en danger par son comportement ou son matériel</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">2</div>
                        <div>
                          <span className="font-semibold text-gray-900">Maîtrise vitesse & comportement</span>
                          <p className="text-gray-600 text-sm">Adapter son comportement à ses capacités, terrain, météo, neige et trafic</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center font-bold text-sm">3</div>
                        <div>
                          <span className="font-semibold text-gray-900">Direction par l'amont</span>
                          <p className="text-gray-600 text-sm">Choisir sa trajectoire pour préserver la sécurité des personnes en aval</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold text-sm">4</div>
                        <div>
                          <span className="font-semibold text-gray-900">Dépassement</span>
                          <p className="text-gray-600 text-sm">Dépasser largement par l'amont/aval, droite/gauche, en anticipant les évolutions</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">5</div>
                        <div>
                          <span className="font-semibold text-gray-900">Croisement & départ</span>
                          <p className="text-gray-600 text-sm">Vérifier amont et aval avant de s'engager sur une piste</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center font-bold text-sm">6</div>
                        <div>
                          <span className="font-semibold text-gray-900">Stationnement</span>
                          <p className="text-gray-600 text-sm">Éviter passages étroits/sans visibilité, libérer la piste rapidement après chute</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold text-sm">7</div>
                        <div>
                          <span className="font-semibold text-gray-900">Montée/descente à pied</span>
                          <p className="text-gray-600 text-sm">Utiliser le bord de la piste, veiller à ne pas être un danger pour autrui</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center font-bold text-sm">8</div>
                        <div>
                          <span className="font-semibold text-gray-900">Respect balisage & signalisation</span>
                          <p className="text-gray-600 text-sm">Tenir compte météo, état pistes/neige, respecter balisage et signalisation</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold text-sm">9</div>
                        <div>
                          <span className="font-semibold text-gray-900">Assistance</span>
                          <p className="text-gray-600 text-sm">Prêter assistance en cas d'accident, donner l'alerte, se mettre à disposition des secours</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex-shrink-0 w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold text-sm">10</div>
                        <div>
                          <span className="font-semibold text-gray-900">Identification</span>
                          <p className="text-gray-600 text-sm">Faire connaître son identité auprès des secours et/ou des tiers en cas d'accident</p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-red-100">
                      <p className="text-gray-700 mb-2">⚠️ <strong>Conseil du moniteur :</strong></p>
                      <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span className="text-gray-700">Ces règles assurent la sécurité de tous sur les pistes. Respectez-les et profitez pleinement de votre ski !</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Encart Le Lagon - Centre Aqua-Sportif */}
            <div className="mt-12">
              <div className="group relative bg-gradient-to-br from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Décoration de fond */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                        <span className="text-4xl">🏊</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        📍 Le Lagon Tignes — Centre Aqua-Sportif & Bien-être 🏊‍♂️
                      </h3>
                      <p className="text-xl text-white/90 mb-4">
                        Le centre aquatique complet de Tignes Le Lac : bien-être, fitness et récupération après-ski !
                        <br />
                        <span className="text-yellow-300 font-semibold">*(Face à la Maison de Tignes - accessible à tous)*</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Horaires */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🕒</span>
                        Horaires (Saison hiver 2025-2026)
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">📅 Période : 22 novembre 2025 → 3 mai 2026</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">✓</span>
                              <span><strong>Ouvert tous les jours :</strong> 11h00 → 20h30</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>Dernière entrée :</strong> 1 heure avant fermeture</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>Évacuation bassins :</strong> 30 min avant fermeture</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">💪</span>
                              <span><strong>Espace fitness :</strong> accessible dès 09h00</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="text-white/80 text-sm">
                            <strong>📍 Situé à Tignes Le Lac, face à la Maison de Tignes</strong>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Activités proposées */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏊</span>
                        Activités proposées
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">1️⃣ Espace aquatique</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">🏊</span>
                              <span><strong>Bassin sportif 25m</strong> : nage, entraînement, récupération</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">🎢</span>
                              <span><strong>Bassin ludique</strong> : toboggan 3 pistes, cascade, lits à bulles</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-yellow-300">👶</span>
                              <span><strong>Pataugeoire enfants</strong> : zone peu profonde sécurisée</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">2️⃣ Espace bien-être</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">🔥</span>
                              <span><strong>Sauna</strong> et <strong>Hammam</strong> (selon billet)</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-purple-300">💆</span>
                              <span><strong>Zones détente</strong> : relaxation musculaire après-ski</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">3️⃣ Fitness & musculation</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-red-300">💪</span>
                              <span><strong>Salle cardio</strong> et renforcement musculaire</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-pink-300">🏃</span>
                              <span><strong>Cours collectifs</strong> : HIIT, Bike, Stretching, CAF</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pourquoi les skieurs y vont */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎿</span>
                      Pourquoi beaucoup de skieurs y vont ?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                      <div>
                        <p className="font-semibold text-white mb-2">Cas typique à Tignes :</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-green-300 mt-1">✓</span>
                            <span><strong>Récupération musculaire</strong> après ski intense</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-blue-300 mt-1">✓</span>
                            <span><strong>Travail cardio</strong> hors altitude (bénéfique)</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-yellow-300 mt-1">✓</span>
                            <span><strong>Alternative mauvais temps</strong> quand pistes fermées</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-purple-300 mt-1">✓</span>
                            <span><strong>Sortie famille</strong> après journée sur les pistes</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">🔥 Le combo gagnant :</p>
                        <div className="bg-white/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                          <p className="text-lg font-bold text-yellow-300 mb-2">
                            Ski → Sauna → Bassin chaud
                          </p>
                          <p className="text-white/80 text-sm">
                            Presque un protocole officieux de survie alpine !<br/>
                            Récupération, décontraction et bien-être garanti.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conseils pratiques */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">💡</span>
                      Conseils pratiques
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/90">
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-orange-300">⏰</span>
                          <span className="font-semibold text-white">Pic d'affluence</span>
                        </div>
                        <p className="text-sm text-white/80">
                          <strong>16h30–18h30</strong> (retour des pistes)<br/>
                          Éviter si possible pour plus de confort
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-green-300">✨</span>
                          <span className="font-semibold text-white">Meilleur créneau</span>
                        </div>
                        <p className="text-sm text-white/80">
                          <strong>11h–14h</strong> : plus calme,<br/>
                          bassins disponibles, ambiance détendue
                        </p>
                      </div>
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-blue-300">🎒</span>
                          <span className="font-semibold text-white">Équipement requis</span>
                        </div>
                        <p className="text-sm text-white/80">
                          <strong>Bonnet + claquettes</strong> :<br/>
                          obligatoires selon périodes<br/>
                          (prévoir serviette aussi)
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lien utile */}
                  <div className="mt-6 text-center">
                    <a 
                      href="https://www.tignes.net/activites/ete/lagon" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">🏊</span>
                      <span>Voir le site officiel du Lagon</span>
                      <span className="text-sm">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Encart Sports Complex Val-d'Isère */}
            <div className="mt-12">
              <div className="group relative bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Décoration de fond */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                        <span className="text-4xl">🏊‍♂️</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        📍 Sports Complex Val-d'Isère — Centre Aqua-Sportif & Bien-être 🏋️‍♀️
                      </h3>
                      <p className="text-xl text-white/90 mb-4">
                        Un grand complexe aquatique, sportif et bien-être idéal après les pistes !
                        <br />
                        <span className="text-yellow-300 font-semibold">*(370 rue de la Face, Val-d'Isère - Alpes, France)*</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Horaires */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🕒</span>
                        Horaires hiver (1er janvier → 3 mai 2026)
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">✔️ Ouverture quotidienne :</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Lundi :</strong> 10h00 → 21h00</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Mardi :</strong> 07h30 → 21h00</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Mercredi :</strong> 10h00 → 22h00 (nocturne)</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Jeudi :</strong> 10h00 → 21h00</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Vendredi :</strong> 10h00 → 21h00</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Samedi :</strong> 10h00 → 21h00</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">•</span>
                              <span><strong>Dimanche :</strong> 07h30 → 21h00</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>Évacuation de l'eau :</strong> 30 min avant fermeture</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">⚠️</span>
                              <span><strong>Caisses ferment :</strong> 1h avant fermeture</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">💪</span>
                              <span><strong>Bassin sportif & fitness :</strong> dès 7h30 (mar & dim)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Activités proposées */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🏊‍♂️</span>
                        Activités proposées
                      </h4>
                      <div className="space-y-3 text-white/90">
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">🎽 Espace aquatique</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-blue-300">🏊</span>
                              <span><strong>Piscine sportive 25m</strong> : natation et entraînement</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-green-300">🌊</span>
                              <span><strong>Grand bassin ludique (~416m²)</strong> : jets massants, rivière à contre-courant</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-yellow-300">👶</span>
                              <span><strong>Pataugeoire & banquettes bulles</strong> : espace familial</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">🧖‍♀️ Bien-être / relaxation</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-orange-300">🔥</span>
                              <span><strong>Sauna</strong> et <strong>Hammam</strong></span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-purple-300">💆</span>
                              <span><strong>Jacuzzi et zones détente</strong> : récupération musculaire</span>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3">
                          <p className="font-semibold text-white mb-2">🏋️ Fitness & sport</p>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-red-300">💪</span>
                              <span><strong>Salle cardio & musculation</strong> : équipement complet</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-pink-300">🏃</span>
                              <span><strong>Cours collectifs</strong> : selon saison</span>
                            </div>
                            <div className="flex items-center gap-2 transform hover:translate-x-1 transition-all duration-200">
                              <span className="text-cyan-300">🎾</span>
                              <span><strong>Sports indoor</strong> : badminton, squash, escalade...</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pourquoi les skieurs y vont */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 mb-6 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">🎿</span>
                      Pourquoi y aller à Val d'Isère ?
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/90">
                      <div>
                        <p className="font-semibold text-white mb-2">Souvent choisi par les skieurs pour :</p>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-green-300 mt-1">✓</span>
                            <span><strong>Détente musculaire</strong> après les pistes</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-blue-300 mt-1">✓</span>
                            <span><strong>Natation / récupération cardio</strong> hors altitude</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-yellow-300 mt-1">✓</span>
                            <span><strong>Activités indoor</strong> quand il fait mauvais</span>
                          </li>
                          <li className="flex items-start gap-2 transform hover:translate-x-1 transition-all duration-200">
                            <span className="text-purple-300 mt-1">✓</span>
                            <span><strong>Espace bien-être complet</strong> (sauna, hammam...)</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-white mb-2">🏆 L'équivalent du Lagon Tignes :</p>
                        <div className="bg-white/20 rounded-lg p-3 text-center transform hover:scale-105 transition-all duration-200">
                          <p className="text-lg font-bold text-yellow-300 mb-2">
                            Plus grand et plus complet !
                          </p>
                          <p className="text-white/80 text-sm">
                            Piscine + fitness + bien-être après le ski<br/>
                            Le combo parfait pour la récupération à Val d'Isère !
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Espace enfants */}
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <span className="text-2xl">👶</span>
                      Espace enfants et animations
                    </h4>
                    <div className="text-white/90">
                      <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                        <p className="text-sm">
                          <strong>🎈 Espace enfants avec activités adaptées</strong> et animations ponctuelles pour toute la famille !
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Lien utile */}
                  <div className="mt-6 text-center">
                    <a 
                      href="https://www.valdisere.com/bien-etre/centre-aquasportif/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
                    >
                      <span className="text-lg">🏊‍♂️</span>
                      <span>Voir le site officiel du Sports Complex</span>
                      <span className="text-sm">→</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Encart Bars & Vie nocturne Tignes */}
            <div className="mt-12">
              <div className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Décoration de fond */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                  <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
                </div>
                
                <div className="relative z-10 p-8 md:p-12">
                  <div className="flex items-start gap-6 mb-8">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                        <span className="text-4xl">🍹</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                        Bars & Vie nocturne à Tignes Val Claret 🎿🍹
                      </h3>
                      <p className="text-xl text-white/90 mb-4">
                        Une sélection de bars branchés et animés — parfaits pour l'après-ski, boire un verre entre amis ou faire la fête !
                        <br />
                        <span className="text-yellow-300 font-semibold">*(Ambiance plus authentique et locale que Val d'Isère)*</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                    {/* Bars & Apéro animés */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🍸</span>
                        Bars & Apéro animés
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-yellow-300 mt-1">⭐</span>
                            <div>
                              <strong className="text-white">Le Studio</strong>
                              <p className="text-white/80 text-xs">Bar très bien noté • Ambiance festive • DJ weekends</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-green-300 mt-1">🍺</span>
                            <div>
                              <strong className="text-white">Inside bar</strong>
                              <p className="text-white/80 text-xs">Ambiance conviviale • Bon choix de boissons • Après-ski animé</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-300 mt-1">🎯</span>
                            <div>
                              <strong className="text-white">Ranga's Bar</strong>
                              <p className="text-white/80 text-xs">Happy hour • Sport à l'écran • Bonne vibe locale</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-purple-300 mt-1">🍹</span>
                            <div>
                              <strong className="text-white">Arobaze</strong>
                              <p className="text-white/80 text-xs">Ambiance détendue • Cocktails • Cœur de Val Claret</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-pink-300 mt-1">🥃</span>
                            <div>
                              <strong className="text-white">Granite-bar</strong>
                              <p className="text-white/80 text-xs">Cocktails • Cosy • Branché • Apéro populaire</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-amber-300 mt-1">🍷</span>
                            <div>
                              <strong className="text-white">Le Caveau</strong>
                              <p className="text-white/80 text-xs">Petit bar sympa • Bonne sélection • Vins & bières</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Spots après-ski */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🍻</span>
                        Spots après-ski & conviviaux
                      </h4>
                      <div className="space-y-3">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-orange-300 mt-1">🎿</span>
                            <div>
                              <strong className="text-white">Le Couloir</strong>
                              <p className="text-white/80 text-xs">Après-ski classique • Bière pression • Snacks • Musique</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-red-300 mt-1">🎉</span>
                            <div>
                              <strong className="text-white">Cocorico Après Ski</strong>
                              <p className="text-white/80 text-xs">Grand concept • Terrasse • Dancefloor • Ambiance</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-cyan-300 mt-1">🍻</span>
                            <div>
                              <strong className="text-white">Le Whitney Bar</strong>
                              <p className="text-white/80 text-xs">Convivial • Début/fin soirée • Bonne atmosphère</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-green-300 mt-1">🍀</span>
                            <div>
                              <strong className="text-white">Tom Crean's Pub</strong>
                              <p className="text-white/80 text-xs">Pub irlandais • Ambiance détendue • Bières</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-blue-300 mt-1">🌟</span>
                            <div>
                              <strong className="text-white">L'Embuscade Tignes</strong>
                              <p className="text-white/80 text-xs">Bar animé • Bonne clientèle locale • Soirées</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-cyan-300 mt-1">🍽</span>
                            <div>
                              <strong className="text-white">Loop Bar & Restaurant</strong>
                              <p className="text-white/80 text-xs">Bon spot • Boire un verre + Manger • Cuisine</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Clubs */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-2xl">🕺</span>
                        Clubs / Soirée tardive
                      </h4>
                      <div className="space-y-3 mb-4">
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-pink-300 mt-1">🎧</span>
                            <div>
                              <strong className="text-white">Avant Garde Tignes</strong>
                              <p className="text-white/80 text-xs">Discothèque • Soirées tardives • Musique variée</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                          <div className="flex items-start gap-2">
                            <span className="text-purple-300 mt-1">💃</span>
                            <div>
                              <strong className="text-white">Discothèque Le Blue Girl</strong>
                              <p className="text-white/80 text-xs">Club populaire • Tôt matin • Danser</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/20">
                        <p className="text-white/90 text-sm">
                          <strong className="text-white">💡 Tips pour la nuit à Val Claret :</strong> l'ambiance commence souvent avec un après-ski vers 15-17h, puis se transforme en soirée musicale plus tard (bars + clubs), et beaucoup de gens finissent en club après 23h.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Timeline et badges */}
                  <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                    <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">🌙 Timeline Nuit Typique à Val Claret</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">15h-17h</div>
                        </div>
                        <p className="text-white/80 text-xs">Après-ski commence</p>
                        <p className="text-yellow-300 text-xs font-semibold">Le Couloir • Cocorico</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-blue-400 to-indigo-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">18h-20h</div>
                        </div>
                        <p className="text-white/80 text-xs">Apéro & dîner</p>
                        <p className="text-blue-300 text-xs font-semibold">Le Studio • Inside bar</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">21h-23h</div>
                        </div>
                        <p className="text-white/80 text-xs">Bars animés</p>
                        <p className="text-purple-300 text-xs font-semibold">Ranga's • Arobaze</p>
                      </div>
                      <div className="text-center">
                        <div className="bg-gradient-to-br from-red-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                          <div className="text-sm md:text-lg font-bold text-white">23h+</div>
                        </div>
                        <p className="text-white/80 text-xs">Club time</p>
                        <p className="text-red-300 text-xs font-semibold">Avant Garde • Blue Girl</p>
                      </div>
                    </div>
                    <div className="mt-3 md:mt-4 text-center">
                      <span className="bg-green-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                        🎯 Ambiance plus locale et authentique que Val d'Isère
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nightlife & Après-Ski Section - Val d'Isère */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto max-w-6xl">
          <div className="group relative bg-gradient-to-br from-purple-600 via-pink-600 to-rose-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
            {/* Décoration de fond */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl group-hover:opacity-20 transition-opacity duration-300"></div>
            </div>
            
            <div className="relative z-10 p-8 md:p-12">
              <div className="flex items-start gap-6 mb-8">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
                    <span className="text-4xl">🍸</span>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Nightlife & Après-Ski à Val d'Isère 🎿🍸
                  </h3>
                  <p className="text-xl text-white/90 mb-4">
                    Découvrez les meilleurs bars et clubs pour des soirées inoubliables au cœur des Alpes 🎿🍸
                    <br />
                    <span className="text-yellow-300 font-semibold">*(Ambiance souvent plus festive et "internationale" qu'à Tignes)*</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {/* Bars & Apéro animés */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍸</span>
                    Bars & Apéro animés
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-yellow-300 mt-1">⭐</span>
                        <div>
                          <strong className="text-white">Cocorico</strong>
                          <p className="text-white/80 text-xs">Iconique • Terrasse • DJ live • Ambiance festive</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-pink-300 mt-1">🎭</span>
                        <div>
                          <strong className="text-white">La Folie Douce</strong>
                          <p className="text-white/80 text-xs">Légendaire • Shows live • Champagne • Sur pistes</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-indigo-300 mt-1">🍹</span>
                        <div>
                          <strong className="text-white">Dick's Tea Bar</strong>
                          <p className="text-white/80 text-xs">Institution • Bar + club • Très animé</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Spots premium */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🍻</span>
                    Spots Premium & Conviviaux
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-amber-300 mt-1">🎸</span>
                        <div>
                          <strong className="text-white">Le Petit Danois</strong>
                          <p className="text-white/80 text-xs">Pub populaire • Live music • International</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-cyan-300 mt-1">🍺</span>
                        <div>
                          <strong className="text-white">The Underground Bar</strong>
                          <p className="text-white/80 text-xs">Détendu • DJ le soir • Ambiance chill</p>
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-blue-300 mt-1">🥃</span>
                        <div>
                          <strong className="text-white">The M Bar</strong>
                          <p className="text-white/80 text-xs">Cocktails • Cadre cosy • Moderne</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Clubs */}
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                  <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <span className="text-2xl">🕺</span>
                    Clubs / Soirée tardive
                  </h4>
                  <div className="space-y-3 mb-4">
                    <div className="bg-white/10 rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200">
                      <div className="flex items-start gap-2">
                        <span className="text-red-300 mt-1">🕺</span>
                        <div>
                          <strong className="text-white">Doudoune Club</strong>
                          <p className="text-white/80 text-xs">Mythique • DJ internationaux • Premium</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/20">
                    <p className="text-white/90 text-sm">
                      <strong className="text-white">💡 Tips pour la nuit à Val d'Isère :</strong> Ambiance haut de gamme, clientèle internationale, après-ski dès 15h30, bars animés 21h-23h, clubs à partir de 23h30.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline et badges */}
              <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-white/20 transform hover:scale-105 transition-all duration-200">
                <h4 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 text-center">🌙 Timeline Nuit Premium à Val d'Isère</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">15h30-16h00</div>
                    </div>
                    <p className="text-white/80 text-xs">Après-ski premium</p>
                    <p className="text-yellow-300 text-xs font-semibold">Cocorico • Folie Douce</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-pink-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">19h30-21h00</div>
                    </div>
                    <p className="text-white/80 text-xs">Dîner chic</p>
                    <p className="text-pink-300 text-xs font-semibold">Restaurants haut de gamme</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-purple-400 to-indigo-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">21h00-23h00</div>
                    </div>
                    <p className="text-white/80 text-xs">Bars animés</p>
                    <p className="text-purple-300 text-xs font-semibold">Dick's • Petit Danois</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-to-br from-red-400 to-rose-400 rounded-lg p-2 md:p-3 mb-1 md:mb-2">
                      <div className="text-sm md:text-lg font-bold text-white">23h30+</div>
                    </div>
                    <p className="text-white/80 text-xs">Club time</p>
                    <p className="text-red-300 text-xs font-semibold">Doudoune Club</p>
                  </div>
                </div>
                <div className="mt-3 md:mt-4 text-center">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-semibold">
                    🎯 Ambiance "party haut de gamme" • Clientèle internationale • Plus upscale que Tignes
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="weather" className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-600 to-blue-600 rounded-2xl mb-6 shadow-2xl">
              <CloudSun className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Météo (J+7)
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Temps réel et prévisions détaillées pour Tignes et Val d'Isère
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Mountain className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Tignes</h3>
                  <p className="text-sm text-gray-600">Station de haute altitude</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">Température actuelle</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    {weather.tignes?.current?.temperature_2m ?? '--'}°C
                  </span>
                </div>
              </div>
              {renderForecast(weather.tignes, 'tignes')}
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Compass className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Val d'Isère</h3>
                  <p className="text-sm text-gray-600">Station historique</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-700">Température actuelle</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {weather.val?.current?.temperature_2m ?? '--'}°C
                  </span>
                </div>
              </div>
              {renderForecast(weather.val, 'val')}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/20">
              <Cloud className="h-5 w-5 text-blue-500" />
              <span className="text-sm text-gray-600">Source: Open-Meteo (libre) – peut être migrée en API serveur</span>
            </div>
          </div>
        </div>
      </section>

      {/* Avalanche Section */}
      <section id="avalanche" className="py-20 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-yellow-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-600 to-amber-600 rounded-2xl mb-6 shadow-2xl">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 bg-clip-text text-transparent mb-4">
              Risques d'avalanche & Sécurité
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Informations essentielles pour pratiquer en toute sécurité dans l'Espace Killy
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Bulletin d'avalanche</h3>
                  <p className="text-sm text-gray-600">Sources officielles et fiables</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  { href: "https://meteofrance.com/previsions-meteo-france/val-d-isere/73150", title: "METEO FRANCE", desc: "Météo Val d'Isère" },
                  { href: "https://meteofrance.com/meteo-montagne/tignes/732961", title: "METEO FRANCE", desc: "Météo Tignes" },
                  { href: "https://www.anena.org/", title: "ANENA", desc: "Association Nationale pour l'Étude de la Neige et des Avalanches" },
                  { href: "https://www.avalanches.org/", title: "European Avalanche Services", desc: "Alps" }
                ].map((link, i) => (
                  <a key={i} href={link.href} target="_blank" rel="noreferrer" 
                     className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-300 group">
                    <div>
                      <div className="font-semibold text-gray-900 group-hover:text-orange-600">{link.title}</div>
                      <div className="text-sm text-gray-600">{link.desc}</div>
                    </div>
                    <ChevronDown className="h-5 w-5 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CloudSnow className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Météo & Enneigement</h3>
                  <p className="text-sm text-gray-600">Conditions en temps réel</p>
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-500" />
                    Val d'Isère
                  </h4>
                  <div className="space-y-2">
                    {[
                      { href: "https://www.valdisere.com/live/enneigement/", title: "État des pistes et enneigement en direct" },
                      { href: "https://www.valdisere.com/live/meteo-a-val-disere/", title: "Météo & ouverture du col de l'Iseran" },
                      { href: "https://valdisere.roundshot.com/", title: "Webcams en direct" }
                    ].map((link, i) => (
                      <a key={i} href={link.href} target="_blank" rel="noreferrer"
                         className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg hover:from-blue-100 hover:to-cyan-100 transition-all duration-300 group">
                        <span className="text-gray-700 group-hover:text-blue-600">{link.title}</span>
                        <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                      </a>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-orange-500" />
                    Tignes
                  </h4>
                  <a href="https://www.snowtrex.fr/france/val_disere/meteo.html" target="_blank" rel="noreferrer"
                     className="flex items-center justify-between p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg hover:from-orange-100 hover:to-amber-100 transition-all duration-300 group">
                    <span className="text-gray-700 group-hover:text-orange-600">Météo et prévisions neige</span>
                    <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Équipement de sécurité</h3>
                  <p className="text-sm text-gray-600">Le matériel indispensable</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-6 border-l-4 border-red-500">
                  <h4 className="font-bold text-red-700 mb-3 flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Équipement obligatoire hors-piste
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["Détecteur de Victimes d'Avalanches (DVA)", "Pelle", "Sonde"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6">
                  <h4 className="font-bold text-green-700 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    Équipement recommandé
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {["Sac airbag", "Casque", "Gilet airbag", "Kit de premiers secours", "Téléphone portable chargé"].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 text-center">
                  <Sparkles className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">Initiation à la recherche de victimes d'avalanche disponible avec votre monitrice</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Info className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Conseils de sécurité</h3>
                  <p className="text-sm text-gray-600">Les règles d'or</p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  "Consultez toujours le bulletin d'avalanche avant de partir",
                  "Ne partez jamais seul en hors-piste",
                  "Informez quelqu'un de votre itinéraire et de votre heure de retour",
                  "Respectez les zones sécurisées et la signalisation des pistes",
                  "Adaptez votre itinéraire en fonction des conditions météorologiques",
                  "En cas d'accident, composez le 112 (numéro d'urgence européen)"
                ].map((conseil, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg">
                    <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {i + 1}
                    </div>
                    <span className="text-gray-700">{conseil}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500 shadow-lg">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-6 w-6 text-yellow-600" />
                  <p className="text-yellow-800 font-medium">
                    La sécurité en montagne est l'affaire de tous. En cas de doute, renoncez ou faites appel à un professionnel.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-pink-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-rose-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mb-6 shadow-2xl">
              <ImagePlus className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Galerie
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Découvrez les paysages enneigés spectaculaires de Tignes et Val d'Isère
            </p>
          </div>
          
          <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-white/80 backdrop-blur-sm border border-white/20">
            {/* Images du carrousel */}
            <div className="relative h-[500px]">
              {Array.from({ length: totalImages }).map((_, index) => (
                <div 
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 motion-reduce:transition-none ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                >
                  <img 
                    src={getCarouselImage(index)} 
                    alt={galleryAltTexts[index] || `Paysage enneigé ${index + 1}`}
                    className="w-full h-full object-cover"
                    decoding="async"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                </div>
              ))}
              
              {/* Boutons de navigation modernisés */}
              <button 
                onClick={prevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                aria-label="Image précédente"
              >
                <ChevronDown className="h-6 w-6 rotate-90" />
              </button>
              
              <button 
                onClick={nextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-gray-900 rounded-full p-3 transition-all duration-300 hover:scale-110 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                aria-label="Image suivante"
              >
                <ChevronDown className="h-6 w-6 -rotate-90" />
              </button>
              
              {/* Indicateurs de diapositives modernisés */}
              <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
                {Array.from({ length: totalImages }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8 shadow-lg' : 'bg-white/50 hover:bg-white/70'}`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Légende modernisée */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 text-center backdrop-blur-sm">
              <p className="text-gray-800 font-medium text-lg mb-2">
                {currentSlide === 0 && "Vue imprenable sur les montagnes enneigées de Tignes"}
                {currentSlide === 1 && "Paysage hivernal époustouflant dans les Alpes"}
                {currentSlide === 2 && "Pentes enneigées parfaites pour le ski et le snowboard"}
                {currentSlide === 3 && "Forêt enneigée sous un ciel bleu éclatant"}
                {currentSlide === 4 && "Panorama montagneux sous la neige"}
              </p>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalImages }).map((_, index) => (
                    <div 
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-purple-600' : 'bg-purple-300'}`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {currentSlide + 1} / {totalImages}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Cancellation Policy Section */}
      <section id="cancellation" className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-2xl mb-6 shadow-2xl">
              <Settings className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
              Annulation Flexible
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Protection contre les annulations clients, inspirée des politiques Maison Sport
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">21+ jours</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                  <p className="text-green-700 font-semibold text-lg">Remboursement 95%</p>
                  <p className="text-gray-600">Pas de paiement pour le moniteur</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">14–20 jours</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4">
                  <p className="text-amber-700 font-semibold text-lg">Remboursé 50%</p>
                  <p className="text-gray-600">Si non rebooké: paiement 50%</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-lg">
                  <X className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">≤13 jours</h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-red-50 to-rose-50 rounded-xl p-4">
                  <p className="text-red-700 font-semibold text-lg">Pas de remboursement</p>
                  <p className="text-gray-600">Si non rebooké: paiement 100%</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl shadow-lg border border-green-200">
              <Sparkles className="h-6 w-6 text-green-600" />
              <span className="text-gray-700 font-medium">Calendrier rouvert automatiquement en cas d'annulation</span>
            </div>
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                <MessageCircle className="h-5 w-5" />
                <span className="font-semibold">Nous contacter</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-72 h-72 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-cyan-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-2xl mb-6 shadow-2xl">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              {t.contact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Email</h3>
              <a href={`mailto:${t.contact.email}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl hover:from-indigo-100 hover:to-blue-100 transition-all duration-300 group">
                <span className="text-gray-700 group-hover:text-indigo-600 font-medium">{t.contact.email}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Téléphone</h3>
              <div className="space-y-3">
                <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <span className="text-gray-700 group-hover:text-green-600 font-medium">{t.contact.phone}</span>
                  <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
                </a>
                <a href={`https://wa.me/${t.contact.phone.replace(/\s/g,'')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:from-green-100 hover:to-emerald-100 transition-all duration-300 group">
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  <span className="text-gray-700 group-hover:text-green-600 font-medium">WhatsApp</span>
                </a>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Adresse</h3>
              <a 
                href="https://www.google.com/maps/search/Val+d%27Isère,+France" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:from-purple-100 hover:to-pink-100 transition-all duration-300 group"
              >
                <span className="text-gray-700 group-hover:text-purple-600 font-medium">{t.contact.address}</span>
                <ChevronDown className="h-4 w-4 text-gray-400 rotate-270 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-white" />
                </div>
                QR Code
              </h3>
              <div className="relative group">
                <img 
                  src={QRCode} 
                  alt="QR Code de contact" 
                  className="w-64 h-64 object-contain rounded-2xl shadow-xl transition-all duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent rounded-2xl pointer-events-none"></div>
              </div>
              <p className="text-center text-gray-600 mt-4">Scannez pour me contacter directement</p>
            </div>
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


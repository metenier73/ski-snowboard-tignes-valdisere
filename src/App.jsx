import Logo from '@/assets/Logo.png'
import QRCode from '@/assets/qr-code.png'
import BookingWidget from '@/components/booking/BookingWidget.jsx'
import RAGAssistant from '@/components/rag/RAGAssistant.jsx'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { galleryAltTexts, getGalleryImage, totalImages } from '@/data/galleryImages'
import {
  AlertTriangle,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle,
  ChevronDown,
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
  ShieldAlert,
  Snowflake,
  Sparkles,
  Star,
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
        title: "Cours de ski et snowboard personnalisés à Tignes - Val d' Isère - Les Arcs ❄️",
        description: "Monitrice diplômée et expérimentée, je propose des cours de ski et snowboard adaptés à tous les niveaux.",
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
          description: 'Découvrez le plaisir du ski alpin ⛷️❄️ avec des cours adaptés à tous les niveaux, du débutant au skieur confirmé ! \n \n 🌱 Débutants \n \n Pour les skieurs qui découvrent le ski alpin : \n \n  • Découverte et réglage du matériel (chaussures, skis, bâtons) 🎿\n  • Position de base et équilibre ⚖️ \n    • Glisse en ligne droite et premières sensations 🛷 \n   • Techniques de freinage (chasse-neige) ⛔ et premiers virages ↩️ \n \n 🎯 Objectif : acquérir les bases du ski, gagner en confiance et descendre des pentes douces en toute sécurité 🛡️. \n \n ⛷️ Intermédiaires \n \n Pour ceux qui souhaitent améliorer leur technique : \n \n  • Virages en parallèle et enchaînement fluide 🔄 \n   • Meilleur contrôle de la vitesse et de la trajectoire 🏁 \n  • Travail de l’équilibre et des appuis 🎯 \n   • Introduction au carving sur pistes bleues et rouges ✨ \n \n 🎯 Objectif : skier avec aisance sur des pentes plus soutenues et gagner en précision et en fluidité ⛷️💨. \n \n 🔥 Avancé \n \n Pour les skieurs confirmés souhaitant se perfectionner : \n \n   • Carving avancé et virages coupés à haute vitesse ⚡ \n    • Techniques sur pistes rouges et noires 🖤 \n  • Initiation au freestyle (modules, sauts simples) 🤸‍♂️ \n    • Bases du hors-piste et sécurité en montagne ⚠️❄️ \n \n🎯 Objectif : maîtriser une technique avancée, repousser ses limites et profiter pleinement du ski alpin dans toutes les conditions 🌟.'
        },
        mobile: {
          title: 'Cours de Snowboard',
          description: 'Découvrez le plaisir du snowboard 🏂❄️ avec mes cours adaptés à tous les niveaux !\n \n 🌱 Débutants \n \n Pour les riders qui découvrent le snowboard :\n \n • Apprendre à connaître et ajuster l’équipement 🎒\n • Positions de base et équilibre ⚖️ \n • Glisser sur une surface plane 🛷 \n • Techniques de freinage de base ⛔ et premiers virages ↩️ \n \n 🎯 Objectif : gagner en confiance et maîtriser les bases pour vos premières descentes sur des pentes douces en toute sécurité 🛡️.\n \n ⛷️ Intermédiaires \n \n Pour ceux qui veulent progresser :\n \n • Techniques de virage avancées 🔄 \n • Contrôle de la vitesse et de la direction 🏁 \n • Initiation au carving 🎯 \n • Introduction au freestyle (sauts simples et figures de base) ✨\n \n 🎯 Objectif : être à l’aise sur des pentes plus raides et commencer à explorer le freestyle 🏂💨. \n \n 🔥 Avancés \n \n Pour les riders confirmés souhaitant repousser leurs limites :\n \n • Carving avancé et techniques de virage ⛷️ \n • Sauts et figures en freestyle (grabs, rotations…) 🤸‍♂️ \n • Techniques de hors-piste / backcountry 🏔️ \n • Sécurité en montagne et avalanche ⚠️❄️ \n \n 🎯 Objectif : maîtriser des techniques avancées et profiter pleinement du snowboard dans toutes ses dimensions 🌟.'
        },
        design: {
          title: 'Hors-piste',
          description: 'Explorez les montagnes 🏔️ et découvrez les sensations uniques du ski hors-piste ❄️⛷️ avec mes cours adaptés à tous les niveaux.\n Que vous soyez débutant en hors-piste 🌱 ou skieur expérimenté 🔥 cherchant à perfectionner votre technique, je vous accompagne avec sérieux et bienveillance, en toute sécurité 🛡️.\n \n 🌨️ Découverte du ski hors-piste \n \n Ce cours est idéal pour les skieurs expérimentés sur piste 🎿 souhaitant découvrir le hors-piste en douceur.\n \n Vous apprendrez les bases essentielles de la pratique et de la sécurité en montagne 🏔️ :\n \n • Introduction à l’équipement de ski hors-piste 🎒 (skis, DVA 📡, pelle, sonde)\n  • Techniques de base du ski hors-piste ⛷️ (positions, virages) \n • Lecture du terrain 🧭 et choix des lignes de descente\n • Premiers principes de sécurité avalanche ⚠️❄️\n \n 🎯 Objectif : acquérir les bases nécessaires pour skier en toute sécurité en hors-piste et explorer des terrains faciles à modérés en confiance.\n \n ❄️ Perfectionnement hors-piste \n Pour les skieurs ayant déjà une première expérience du hors-piste, ce cours vise à améliorer la technique et approfondir les connaissances en matière de sécurité :\n \n  • Techniques avancées de ski hors-piste ⛷️ (virages serrés, contrôle de la vitesse)\n • Navigation en terrain varié 🌲 (poudreuse, neige croûtée, forêts)\n • Utilisation avancée du DVA 📡\n • Gestion des risques ⚠️ et choix des lignes de descente \n \n 🎯 Objectif : gagner en confiance et en compétence sur des terrains intermédiaires à difficiles, tout en renforçant les bonnes pratiques de sécurité.\n \n 🏔️ Hors-piste expert / engagement \n Destiné aux skieurs confirmés 💪, ce cours permet de perfectionner la technique sur des terrains exigeants et de maîtriser les outils de sécurité avancés :\n \n  • Ski en pente raide et couloirs ⛰️\n • Gestion des conditions de neige difficiles ❄️\n  • Techniques de secours en avalanche 🚑\n • Planification d’itinéraires 🧭 et prise de décision en haute montagne \n \n 🎯 Objectif : devenir un skieur hors-piste autonome et compétent, capable d’évoluer sur des terrains complexes en toute sécurité.'
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
        <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
          {location === 'tignes' ? (
            <Mountain className="h-5 w-5 mr-2 text-blue-600" />
          ) : (
            <Compass className="h-5 w-5 mr-2 text-blue-600" />
          )}
          {location === 'tignes' ? 'Tignes' : "Val d'Isère"}
        </h3>
        
        {/* Légende améliorée */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-4 mb-6">
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">AM</span>
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-gray-800">Matin (9h-12h)</span>
                <div className="text-xs text-gray-600">Neige plus dure • Glace</div>
              </div>
            </div>
            <div className="w-px h-12 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">PM</span>
              </div>
              <div className="text-left">
                <span className="text-sm font-bold text-gray-800">Après-midi (12h-16h)</span>
                <div className="text-xs text-gray-600">Neige plus souple • Dégel</div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7 gap-4">
          {days.map((d, i) => {
            const tempMin = Math.round(data.daily.temperature_2m_min?.[i] || 0);
            const tempMax = Math.round(data.daily.temperature_2m_max?.[i] || 0);
            const snow = Math.round((data.daily.snowfall_sum?.[i] || 0));
            const precip = Math.round((data.daily.precipitation_sum?.[i] || 0));
            const weatherCode = data.daily.weather_code?.[i] || 0;
            
            // Calcul des températures estimées matin/après-midi
            const tempMorning = tempMin + Math.round((tempMax - tempMin) * 0.3);
            const tempAfternoon = tempMin + Math.round((tempMax - tempMin) * 0.8);
            
            return (
              <div key={d} className="bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                {/* En-tête avec jour */}
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-3 text-center border-b border-gray-200">
                  <div className="text-sm font-bold text-gray-900">
                    {new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short' })}
                  </div>
                  <div className="text-xs text-gray-600">
                    {new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short' })}
                  </div>
                </div>
                
                {/* Icône météo principale */}
                <div className="flex justify-center py-3 bg-white">
                  {getWeatherIcon(weatherCode)}
                </div>
                
                {/* Section températures matin/après-midi */}
                <div className="p-3 space-y-2">
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AM</span>
                        </div>
                        <span className="text-xs font-bold text-amber-700">MATIN</span>
                      </div>
                      <span className="text-lg font-bold text-amber-600">{tempMorning}°</span>
                    </div>
                    <div className="text-xs text-amber-600 mt-1">9h - 12h</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">PM</span>
                        </div>
                        <span className="text-xs font-bold text-blue-700">APRÈS-MIDI</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">{tempAfternoon}°</span>
                    </div>
                    <div className="text-xs text-blue-600 mt-1">12h - 16h</div>
                  </div>
                </div>
                
                {/* Informations additionnelles */}
                <div className="bg-gray-50 p-3 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-2 text-xs text-gray-600">
                    <span>Min: {tempMin}°</span>
                    <span>Max: {tempMax}°</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="flex items-center text-blue-500">
                      <Snowflake className="h-3 w-3 mr-1" />
                      {snow}cm
                    </span>
                    <span className="flex items-center text-blue-500">
                      <CloudRain className="h-3 w-3 mr-1" />
                      {precip}mm
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Conseils ski améliorés */}
        <div className="mt-6 bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 border border-sky-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-lg">🎿</span>
            </div>
            <div>
              <span className="font-bold text-gray-800">Conseils de ski</span>
              <div className="text-xs text-gray-600">Selon les conditions météo</div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-3 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">AM</span>
                </div>
                <span className="font-bold text-amber-700 text-sm">MATIN</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Neige plus dure & glacée</li>
                <li>• Pistes bien damées</li>
                <li>• Idéal pour carving</li>
                <li>• Attention verglas</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PM</span>
                </div>
                <span className="font-bold text-blue-700 text-sm">APRÈS-MIDI</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Neige plus souple</li>
                <li>• Dégel en cours</li>
                <li>• Confort accru</li>
                <li>• Pistes plus lourdes</li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-sky-50 to-cyan-50 rounded-lg p-3 border border-sky-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg">❄️</span>
                <span className="font-bold text-sky-700 text-sm">NEIGE FRAÎCHE</span>
              </div>
              <ul className="text-xs text-gray-700 space-y-1">
                <li>• Privilégier le matin</li>
                <li>• Poudreuse parfaite</li>
                <li>• Meilleur accroche</li>
                <li>• Conditions optimales</li>
              </ul>
            </div>
          </div>
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
              {t.hero.description} Débutant, intermédiaire ou confirmé, chaque séance est conçue selon vos objectifs, votre rythme et votre expérience, pour une progression rapide et en toute sécurité ⛷️🏂.
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
                  Cours de ski & snowboard 🏔️
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  Profitez de cours particuliers à Tignes - Val d'Isère - Les Arcs , au cœur des plus beaux domaines skiables des Alpes. Que vous souhaitiez apprendre les bases, perfectionner votre technique ou explorer de nouvelles sensations, je vous accompagne sur les pistes mythiques de l'Espace Killy et du Paradiski avec un suivi personnalisé et bienveillant ❄️✨.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2">
                  <Snowflake className="h-6 w-6 text-emerald-600" />
                  Cours Hors-piste en ski où en snowboard pour tous les niveaux 🎯
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">
                  Mes cours Hors-piste à Tignes – Val d'Isère - Les Arcs s'adressent aussi bien aux débutants qu'aux skieurs confirmés et riders en quête de performance 🏂🔥. L'objectif : progresser efficacement, gagner en confiance et surtout prendre du plaisir sur la neige 😄.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12">
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2 justify-center">
                  <Star className="h-6 w-6 text-amber-600" />
                  Pourquoi choisir un cours privé à Tignes – Val d'Isère - Les Arcs ? ⭐
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
                      <div className="font-semibold text-gray-900">Découverte des plus beaux secteurs de Tignes , Val d'Isère et des Arcs </div>
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
                    La <strong>complémentarité de ces deux univers</strong> – montagne et technologie, corps et esprit, action et réflexion – est aujourd'hui au cœur de mon épanouissement ⚖️. Elle me permet de tendre vers une posture à la fois <strong>humaine et structurée</strong>, en restant <strong>humaine</strong>, <strong>observatrice</strong> et <strong>empathique</strong> 💛, tout en étant <strong>critique</strong>, <strong>concentrée</strong>, <strong>pragmatique</strong> et <strong>organisée</strong> 🎯.
                  </p>
                  <p className="mt-4 italic text-gray-600">
                    C'est dans cet équilibre que je continue d'avancer, d'apprendre et de transmettre 🏔️✨.
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
              <span className="text-2xl font-bold text-gray-900">4.97</span>
              <span className="text-gray-600">(32 avis)</span>
            </div>
            <p className="text-lg text-gray-600">90% des commentaires de Myriam M sont 5 étoiles.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
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
                  <span className="text-4xl font-bold text-blue-600">4.97</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-1">basé sur 32 avis</div>
              </div>
              <div className="border-l border-gray-200 pl-6 text-left">
                <div className="text-sm font-semibold text-gray-900 mb-2">Appréciations</div>
                <div className="space-y-1 text-sm text-gray-600">
                  <div>Amabilité <span className="font-bold text-blue-600">5.0</span></div>
                  <div>Communication <span className="font-bold text-blue-600">4.89</span></div>
                  <div>Ponctualité <span className="font-bold text-blue-600">4.98</span></div>
                  <div>Feedback technique <span className="font-bold text-blue-600">4.98</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-80 h-80 bg-indigo-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Réserver vos cours (Hiver 2025-2026)
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Tarifs préférentiels et disponibilités garanties
            </p>
          </div>
          
          {/* Cartes résumées avant le tableau */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🎿</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Cours particuliers</h3>
                  <p className="text-sm text-gray-500">1 personne</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Tarif horaire</span>
                  <span className="font-bold text-green-600">€79-€131</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Journée complète</span>
                  <span className="font-bold text-green-600">€495-€851</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">👨‍👩‍👧‍👦</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Cours en groupe</h3>
                  <p className="text-sm text-gray-500">Jusqu'à 6 personnes</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Remise après-midi</span>
                  <span className="font-bold text-blue-600">-8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Flexibilité</span>
                  <span className="font-bold text-blue-600">Totale</span>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-3">
                  <span className="text-white text-lg">🏔️</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Hors-piste</h3>
                  <p className="text-sm text-gray-500">Niveau confirmé</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sécurité</span>
                  <span className="font-bold text-orange-600">DVA inclus</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Itinéraires</span>
                  <span className="font-bold text-orange-600">Personnalisés</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Calendrier des disponibilités</h3>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-600">Disponible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-600">Partiel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-600">Complet</span>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="py-4 px-4 text-left font-semibold text-gray-900 rounded-tl-lg">Semaine</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Dates</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Tarif horaire</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Tarif journée</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Remise AM</th>
                    <th className="py-4 px-4 text-left font-semibold text-gray-900">Créneaux</th>
                    <th className="py-4 px-4 text-center font-semibold text-gray-900 rounded-tr-lg">Action</th>
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
                  <tr key={idx} className={`border-b border-gray-200 hover:bg-gray-50 transition-colors ${row.reserved ? 'opacity-60' : ''}`} aria-disabled={row.reserved ? true : undefined}>
                    <td className="py-4 px-4 font-medium text-gray-900">{row.w}</td>
                    <td className="py-4 px-4 text-gray-700">{row.d}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold">
                        {row.h}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                        {row.j}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center px-2 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-semibold">
                        {row.r}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{row.c}</td>
                    <td className="py-4 px-4 text-center">
                      {row.reserved ? (
                        <span title="Semaine complète – plus de créneaux disponibles" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-semibold rounded-md shadow-sm text-white bg-gray-400 cursor-not-allowed select-none">
                          Complet
                        </span>
                      ) : (
                        <a 
                          href="https://maisonsport.com/fr/profile/927576662/myriam-m?omnisendContactID=65cb1772c613deaa1396a153&utm_campaign=automation%3A+Transactional+Flow+(6537bd845397fc850450a200)&utm_content=6537c00f5397fc850450a21a&utm_medium=email&utm_source=omnisend" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 transform hover:scale-105 transition-all duration-200"
                        >
                          <span className="mr-2">🎿</span>
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
          </div>

          {/* Widget de réservation interactif par date/slot */}
          <BookingWidget blockedMorningDates={availability.morningsBlocked} blockedAfternoonDates={availability.afternoonsBlocked} bookingUrl={bookingUrl} />
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6 shadow-lg">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
              Blog
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Actus, conseils et bons plans Tignes & Val d'Isère
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Carte 1: Dates d'ouverture */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-4">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Dates d'ouverture</h3>
                    <p className="text-sm text-gray-500">Saison 2025-2026</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Tignes</p>
                      <p className="text-gray-600">Fin novembre → début mai</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="font-semibold text-gray-800">Val d'Isère</p>
                      <p className="text-gray-600">Début décembre → début mai</p>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <a href="https://www.tignes.net" target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    <span className="mr-1">🏔️</span> Tignes.net
                  </a>
                  <a href="https://www.valdisere.com" target="_blank" rel="noreferrer" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
                    <span className="mr-1">⛷️</span> Valdisere.com
                  </a>
                </div>
              </div>
            </div>

            {/* Carte 2: Programme d'animations */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mr-4">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Animations</h3>
                    <p className="text-sm text-gray-500">Événements & agenda</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 mb-2">🎉 À ne pas manquer</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center"><span className="mr-2">•</span> Concerts et festivals</li>
                      <li className="flex items-center"><span className="mr-2">•</span> Compétitions de ski</li>
                      <li className="flex items-center"><span className="mr-2">•</span> Soirées thématiques</li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <a href="https://www.tignes.net/que-faire-a-tignes/agenda" target="_blank" rel="noreferrer" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
                    <span className="mr-1">📅</span> Agenda Tignes
                  </a>
                  <a href="https://www.valdisere.com/agenda/" target="_blank" rel="noreferrer" className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm transition-colors">
                    <span className="mr-1">📆</span> Agenda Val d'Isère
                  </a>
                </div>
              </div>
            </div>

            {/* Carte 3: Applications officielles */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl mr-4">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Applications</h3>
                    <p className="text-sm text-gray-500">Tools officiels</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 mb-3">📱 Apps indispensables</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Météo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-600">Pistes</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-600">Webcams</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        <span className="text-gray-600">Navettes</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <a href="https://play.google.com/store/search?q=tignes&c=apps" target="_blank" rel="noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                    <span className="mr-1">🏔️</span> Apps Tignes
                  </a>
                  <a href="https://play.google.com/store/search?q=val%20d%27isere&c=apps" target="_blank" rel="noreferrer" className="inline-flex items-center text-green-600 hover:text-green-700 font-medium text-sm transition-colors">
                    <span className="mr-1">⛷️</span> Apps Val d'Isère
                  </a>
                </div>
              </div>
            </div>

            {/* Carte 4: Offices & Remontées */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl mr-4">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Services</h3>
                    <p className="text-sm text-gray-500">Offices & remontées</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 mb-3">🎿 Info pratiques</p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-center justify-between">
                        <span>🏢 Offices de tourisme</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Info</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>🚠 Remontées mécaniques</span>
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">Horaires</span>
                      </li>
                      <li className="flex items-center justify-between">
                        <span>🎫 Forfaits en ligne</span>
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Achat</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100 flex flex-wrap gap-3">
                  <a href="https://www.tignes.net" target="_blank" rel="noreferrer" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                    <span className="mr-1">🏔️</span> Office Tignes
                  </a>
                  <a href="https://www.compagniedesalpes.com/" target="_blank" rel="noreferrer" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                    <span className="mr-1">🚠</span> Remontées
                  </a>
                  <a href="https://www.valdisere.com" target="_blank" rel="noreferrer" className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium text-sm transition-colors">
                    <span className="mr-1">⛷️</span> Office Val d'Isère
                  </a>
                </div>
              </div>
            </div>

            {/* Carte 5: Conseils équipement */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl mr-4">
                    <ShieldAlert className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Équipement</h3>
                    <p className="text-sm text-gray-500">Conseils pro</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-600 text-xs font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Sécurité hors-piste</p>
                        <p className="text-sm text-gray-600">Casque, dorsale, DVA, pelle, sonde</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-blue-600 text-xs font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Location maline</p>
                        <p className="text-sm text-gray-600">Privilégier boutique proche des pistes</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-cyan-600 text-xs font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">Bootfitting</p>
                        <p className="text-sm text-gray-600">Pour le confort et contrôle optimal</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-medium">Expert</span>
                    <span className="text-xs text-gray-500">Conseil pro Myriam</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 6: Technique ski & snowboard */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl mr-4">
                    <Mountain className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">Technique</h3>
                    <p className="text-sm text-gray-500">Ski & snowboard</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">⛷️ Ski alpin</p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Appuis progressifs</li>
                          <li>• Regard loin devant</li>
                          <li>• Rythme et fluidité</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800 mb-2">🏂 Snowboard</p>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Posture centrée</li>
                          <li>• Dissociation épaules/bassin</li>
                          <li>• Transfert de poids fluide</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">Coach</span>
                    <span className="text-xs text-gray-500">Avec Myriam</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Weather Section */}
      <section id="weather" className="py-20 bg-gradient-to-br from-sky-50 via-blue-50 to-cyan-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-72 h-72 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
              <CloudSun className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-4">
              Météo (J+7)
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Temps réel et prévisions pour Tignes & Val d'Isère
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte Tignes */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-sky-100 to-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl mr-4">
                    <Mountain className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Tignes</h3>
                    <p className="text-sm text-gray-500">2,100m d'altitude</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-sky-50 to-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Température actuelle</span>
                    <span className="text-3xl font-bold text-sky-600">
                      {weather.tignes?.current?.temperature_2m ?? '--'}°C
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {renderForecast(weather.tignes, 'tignes')}
                </div>
              </div>
            </div>

            {/* Carte Val d'Isère */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mr-4">
                    <Compass className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Val d'Isère</h3>
                    <p className="text-sm text-gray-500">1,850m d'altitude</p>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Température actuelle</span>
                    <span className="text-3xl font-bold text-blue-600">
                      {weather.val?.current?.temperature_2m ?? '--'}°C
                    </span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {renderForecast(weather.val, 'val')}
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">📊</span>
                <span className="font-medium">Source:</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sky-600 font-semibold">Open-Meteo</span>
                <span className="text-gray-400">•</span>
                <span className="text-gray-500 text-sm">API libre et précise</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Avalanche Section */}
      <section id="avalanche" className="py-20 bg-gradient-to-br from-orange-50 via-red-50 to-amber-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-orange-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-red-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl mb-6 shadow-lg">
              <ShieldAlert className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-4">
              Risques d'avalanche & Sécurité
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Informations essentielles pour pratiquer en toute sécurité
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Carte Bulletin d'avalanche */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-red-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl mr-4">
                    <AlertTriangle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Bulletin avalanche</h3>
                    <p className="text-sm text-gray-500">Niveaux de risque</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4">
                    <p className="font-semibold text-gray-800 mb-3">🚨 Sources officielles</p>
                    <div className="space-y-3">
                      <a href="https://meteofrance.com/previsions-meteo-france/val-d-isere/73150" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600">🌦️</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Météo France</p>
                            <p className="text-sm text-gray-500">Val d'Isère</p>
                          </div>
                        </div>
                        <span className="text-orange-600 hover:text-orange-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                      
                      <a href="https://meteofrance.com/meteo-montagne/tignes/732961" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <span className="text-orange-600">🏔️</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">Météo France</p>
                            <p className="text-sm text-gray-500">Tignes</p>
                          </div>
                        </div>
                        <span className="text-orange-600 hover:text-orange-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                      
                      <a href="https://www.anena.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600">⚠️</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">ANENA</p>
                            <p className="text-sm text-gray-500">Association neige & avalanches</p>
                          </div>
                        </div>
                        <span className="text-orange-600 hover:text-orange-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                      
                      <a href="https://www.avalanches.org/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-3 bg-white rounded-lg hover:bg-orange-50 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                            <span className="text-red-600">🏔️</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">European Avalanche</p>
                            <p className="text-sm text-gray-500">Services - Alps</p>
                          </div>
                        </div>
                        <span className="text-orange-600 hover:text-orange-700">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Météo & Enneigement */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl mr-4">
                    <CloudSnow className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Météo & Enneigement</h3>
                    <p className="text-sm text-gray-500">Conditions actuelles</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-3">🏔️ Val d'Isère</p>
                        <div className="space-y-2">
                          <a href="https://www.valdisere.com/live/enneigement/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-amber-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-600">❄️</span>
                              <span className="text-sm font-medium text-gray-700">État des pistes</span>
                            </div>
                            <span className="text-amber-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </a>
                          <a href="https://www.valdisere.com/live/meteo-a-val-disere/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-amber-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-600">🌤️</span>
                              <span className="text-sm font-medium text-gray-700">Météo & col Iseran</span>
                            </div>
                            <span className="text-amber-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </a>
                          <a href="https://valdisere.roundshot.com/" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-amber-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-600">📹</span>
                              <span className="text-sm font-medium text-gray-700">Webcams en direct</span>
                            </div>
                            <span className="text-amber-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-gray-800 mb-3">🏂 Tignes</p>
                        <div className="space-y-2">
                          <a href="https://www.snowtrex.fr/france/val_disere/meteo.html" target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-white rounded-lg hover:bg-amber-50 transition-colors">
                            <div className="flex items-center gap-2">
                              <span className="text-amber-600">🌨️</span>
                              <span className="text-sm font-medium text-gray-700">Météo & prévisions neige</span>
                            </div>
                            <span className="text-amber-600">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Carte Équipement de sécurité */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl mr-4">
                    <ShieldAlert className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Équipement sécurité</h3>
                    <p className="text-sm text-gray-500">Hors-piste</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
                    <div className="space-y-4">
                      <div>
                        <p className="font-semibold text-gray-800 mb-3">⚠️ Obligatoire</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <span className="text-red-600 text-sm font-bold">📡</span>
                            </div>
                            <span className="text-gray-700">DVA (Détecteur Victimes Avalanche)</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <span className="text-red-600 text-sm font-bold">🔱</span>
                            </div>
                            <span className="text-gray-700">Pelle</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                              <span className="text-red-600 text-sm font-bold">📏</span>
                            </div>
                            <span className="text-gray-700">Sonde</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-semibold text-gray-800 mb-3">🛡️ Recommandé</p>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                              <span className="text-pink-600 text-xs">🎒</span>
                            </div>
                            <span className="text-sm text-gray-600">Sac airbag</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                              <span className="text-pink-600 text-xs">⛑️</span>
                            </div>
                            <span className="text-sm text-gray-600">Casque</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                              <span className="text-pink-600 text-xs">🦺</span>
                            </div>
                            <span className="text-sm text-gray-600">Gilet airbag</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-pink-100 rounded flex items-center justify-center">
                              <span className="text-pink-600 text-xs">📱</span>
                            </div>
                            <span className="text-sm text-gray-600">Téléphone chargé</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <span className="text-blue-600">🎓</span>
                      </div>
                      <div>
                        <p className="font-semibold text-blue-800">Formation disponible</p>
                        <p className="text-sm text-blue-600">Initiation recherche de victimes avec votre monitrice</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Conseils de sécurité */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex items-center mb-6">
                  <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl mr-4">
                    <CheckCircle className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Conseils sécurité</h3>
                    <p className="text-sm text-gray-500">Bonnes pratiques</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-600 text-xs font-bold">1</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Consulter bulletin</p>
                          <p className="text-sm text-gray-600">Vérifiez toujours le bulletin d'avalanche avant de partir</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-amber-600 text-xs font-bold">2</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Ne jamais seul</p>
                          <p className="text-sm text-gray-600">Partez toujours en groupe en hors-piste</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-600 text-xs font-bold">3</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Informer quelqu'un</p>
                          <p className="text-sm text-gray-600">Communiquez votre itinéraire et heure de retour</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-amber-600 text-xs font-bold">4</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Respecter zones</p>
                          <p className="text-sm text-gray-600">Suivez la signalisation et zones sécurisées</p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-yellow-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-yellow-600 text-xs font-bold">5</span>
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800">Adapter conditions</p>
                          <p className="text-sm text-gray-600">Modifiez votre itinéraire selon la météo</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                        <span className="text-red-600">🚨</span>
                      </div>
                      <div>
                        <p className="font-semibold text-red-800">Urgence</p>
                        <p className="text-sm text-red-600">Composez le 112 (numéro d'urgence européen)</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-yellow-100 to-amber-100 rounded-xl p-4 border-l-4 border-yellow-400">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">⚠️</span>
                      <div>
                        <p className="font-semibold text-yellow-800 mb-1">La sécurité avant tout</p>
                        <p className="text-sm text-yellow-700">En cas de doute, renoncez ou faites appel à un professionnel.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      <section id="cancellation" className="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 right-20 w-80 h-80 bg-green-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-emerald-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-6 shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Annulation Flexible
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Protection contre les annulations clients, inspirée des politiques Maison Sport
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Carte 21+ jours */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mr-3">
                    <span className="text-white font-bold">21+</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Plus de 21 jours</h3>
                    <p className="text-sm text-gray-500">Avant le cours</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Remboursement client</span>
                      <span className="text-2xl font-bold text-green-600">95%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Aucun paiement pour moniteur</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte 14-20 jours */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl mr-3">
                    <span className="text-white font-bold">14-20</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">14 à 20 jours</h3>
                    <p className="text-sm text-gray-500">Avant le cours</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Remboursement client</span>
                      <span className="text-2xl font-bold text-amber-600">50%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Si non rebooké: 50% paiement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte ≤13 jours */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-6 relative z-10">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl mr-3">
                    <span className="text-white font-bold">≤13</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">13 jours ou moins</h3>
                    <p className="text-sm text-gray-500">Avant le cours</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-700 font-medium">Remboursement client</span>
                      <span className="text-2xl font-bold text-red-600">0%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Si non rebooké: 100% paiement</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center gap-4 bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-gray-100">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="text-2xl">🔄</span>
                <span className="font-medium">Calendrier rouvert automatiquement</span>
              </div>
              <div className="text-gray-400">•</div>
              <div className="text-gray-500 text-sm">En cas d'annulation</div>
            </div>
            
            <div className="mt-8">
              <a href="#contact" className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <MessageCircle className="h-5 w-5" />
                <span>Nous contacter pour plus d'infos</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-80 h-80 bg-purple-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-pink-400 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-6 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              {t.contact.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.contact.description}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Carte Email */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-4">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 w-full">
                    <a href={`mailto:${t.contact.email}`} className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte Téléphone */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl mb-4">
                    <Phone className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Téléphone</h3>
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 w-full space-y-3">
                    <a href={`tel:${t.contact.phone.replace(/\s/g, '')}`} className="text-blue-600 hover:text-blue-700 font-medium transition-colors block">
                      {t.contact.phone}
                    </a>
                    <a href={`https://wa.me/${t.contact.phone.replace(/\s/g,'')}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      <span className="text-sm">💬</span>
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Carte Adresse */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden border border-gray-100">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mb-4">
                    <MapPin className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Adresse</h3>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-4 w-full">
                    <a 
                      href="https://www.google.com/maps/search/Val+d%27Isère,+France" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                    >
                      {t.contact.address}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* QR Code Section */}
          <div className="text-center">
            <div className="inline-flex flex-col items-center bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
                  <span className="text-white text-xl">📱</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">QR Code</h3>
                  <p className="text-sm text-gray-500">Scannez pour me contacter</p>
                </div>
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
                <img 
                  src={QRCode} 
                  alt="QR Code de contact" 
                  className="relative w-64 h-64 object-contain rounded-2xl shadow-lg border-2 border-white"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              
              <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                <span className="text-lg">📸</span>
                <span>Scannez avec votre smartphone</span>
              </div>
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


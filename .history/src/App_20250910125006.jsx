import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Menu, X, Mail, Phone, MapPin, Mountain, Snowflake, Compass, CloudSun, ImagePlus, ShieldAlert, BookOpen, Calendar, MessageCircle } from 'lucide-react'
import Logo from '@/assets/Logo.png'
import './App.css'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [weather, setWeather] = useState({ tignes: null, val: null })

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
        contact: 'Contact'
      },
      hero: {
        title: 'Cours de Ski & Snowboard',
        description: "Enseignement personnalisé, priorité absolue à la sécurité, soucieuse des bonnes pratiques, communication conviviale dans une atmosphère de confiance, organisation rigoureuse, innovation pédagogique en recherche constante de nouvelles techniques.",
        cta: 'Réserver vos cours'
      },
      about: {
        title: 'À propos de moi',
        description: "Reconnue pour mon expertise, ma pédagogie et mon attrait pour le milieu montagnard.\n\nJ’enseigne aux enfants et aux adultes les bases du ski alpin et du Snowboard. J’associe compétences pédagogiques et approche personnalisée pour m'adapter aux besoins de chacun.\n\nAu fil des années, j'ai guidé des groupes de skieurs sur des terrains variés en enseignant les techniques avancées de ski et les principes de sécurité.\n\n",
        experience: 'Années d\'expérience',
        projects: 'Projets réalisés',
        clients: 'Clients satisfaits'
      },
      services: {
        title: 'Nos Services',
        web: {
          title: 'Cours de Ski',
          description: 'Apprentissage du ski alpin pour tous niveaux'
        },
        mobile: {
          title: 'Cours de Snowboard',
          description: 'Initiation et perfectionnement en snowboard'
        },
        design: {
          title: 'Hors-piste',
          description: 'Sorties sécurisées en terrain non balisé'
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
      title: 'Multilingual Website',
      subtitle: 'Your professional web solution',
      nav: {
        home: 'Home',
        about: 'About',
        services: 'Services',
        blog: 'Blog',
        weather: 'Weather',
        avalanche: 'Avalanche',
        gallery: 'Gallery',
        booking: 'Book',
        contact: 'Contact'
      },
      hero: {
        title: 'Private Ski & Snowboard Lessons',
        description: 'Learn and progress safely with a certified instructor in Tignes & Val d’Isère.',
        cta: 'Book your lessons'
      },
      about: {
        title: 'About Us',
        description: 'We are a passionate team of developers and designers who create exceptional web experiences.',
        experience: 'Years of experience',
        projects: 'Completed projects',
        clients: 'Satisfied clients'
      },
      services: {
        title: 'Our Services',
        web: {
          title: 'Ski Lessons',
          description: 'Alpine skiing lessons for all levels'
        },
        mobile: {
          title: 'Snowboard Lessons',
          description: 'Snowboard initiation and improvement'
        },
        design: {
          title: 'Off-piste',
          description: 'Safe off-piste adventures'
        }
      },
      contact: {
        title: 'Contact Me',
        description: 'Ready to start your Holiday ? Contact me today.',
        email: 'meteniermyriam@yahoo.fr',
        phone: '+33 7 68 10 61 07',
        address: 'Val d\'Isere, France'
      }
    }/*,
    es: {
      title: 'Sitio Web Multilingüe',
      subtitle: 'Su solución web profesional',
      nav: {
        home: 'Inicio',
        about: 'Acerca de',
        services: 'Servicios',
        contact: 'Contacto'
      },
      hero: {
        title: 'Bienvenido a nuestro sitio web multilingüe',
        description: 'Creamos soluciones web innovadoras adaptadas a sus necesidades. Nuestro equipo experto le acompaña en todos sus proyectos digitales.',
        cta: 'Descubrir nuestros servicios'
      },
      about: {
        title: 'Acerca de Nosotros',
        description: 'Somos un equipo apasionado de desarrolladores y diseñadores que crean experiencias web excepcionales.',
        experience: 'Años de experiencia',
        projects: 'Proyectos completados',
        clients: 'Clientes satisfechos'
      },
      services: {
        title: 'Nuestros Servicios',
        web: {
          title: 'Desarrollo Web',
          description: 'Sitios web modernos y responsivos'
        },
        mobile: {
          title: 'Aplicaciones Móviles',
          description: 'Apps nativas iOS y Android'
        },
        design: {
          title: 'Diseño UI/UX',
          description: 'Interfaces de usuario intuitivas'
        }
      },
      contact: {
        title: 'Contáctanos',
        description: '¿Listo para comenzar su proyecto? Contáctenos hoy.',
        email: 'contact@example.com',
        phone: '+33 7 68 10 61 07',
        address: 'Val , Francia'
      }
    }*/
  }

  const t = translations[currentLang]

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const endpoints = [
          {
            key: 'tignes',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.468&longitude=6.909&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&forecast_days=7'
          },
          {
            key: 'val',
            url: 'https://api.open-meteo.com/v1/forecast?latitude=45.448&longitude=6.980&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,snowfall_sum&timezone=auto&forecast_days=7'
          }
        ]
        const responses = await Promise.all(endpoints.map(e => fetch(e.url)))
        const data = await Promise.all(responses.map(r => r.json()))
        setWeather({ tignes: data[0], val: data[1] })
      } catch (e) {
        // ignore errors in demo
      }
    }
    fetchWeather()
  }, [])

  const renderForecast = (data) => {
    if (!data || !data.daily) return <div className="text-gray-500">Chargement…</div>
    const days = data.daily.time
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {days.map((d, i) => (
          <div key={d} className="rounded-lg border p-3 bg-white/60">
            <div className="text-sm text-gray-600">{new Date(d).toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', day: '2-digit', month: '2-digit' })}</div>
            <div className="text-gray-900 font-medium">{Math.round(data.daily.temperature_2m_min[i])}° / {Math.round(data.daily.temperature_2m_max[i])}°C</div>
            <div className="text-sm text-gray-700">Neige: {Math.round((data.daily.snowfall_sum[i]||0))} cm • Précip.: {Math.round((data.daily.precipitation_sum[i]||0))} mm</div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-5 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <img src={Logo} alt="Tignes logo" className="h-24 w-24 object-contain" />
              <span className="text-xl font-bold text-gray-900">{t.title}</span>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.home}
              </a>
              <a href="#about" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.about}
              </a>
              <a href="#services" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.services}
              </a>
              <a href="#blog" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.blog}
              </a>
              <a href="#weather" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.weather}
              </a>
              <a href="#avalanche" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.avalanche}
              </a>
              <a href="#gallery" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.gallery}
              </a>
              <a href="#booking" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.booking}
              </a>
              <a href="#contact" className="nav-link">
                <Snowflake className="nav-snowflake h-3.5 w-3.5" /> {t.nav.contact}
              </a>
            </nav>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <select 
                value={currentLang} 
                onChange={(e) => setCurrentLang(e.target.value)}
                className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="fr">🇫🇷 FR</option>
                <option value="en">🇬🇧 EN</option>
            /*  <option value="es">🇪🇸 ES</option>*/
              </select>
              
              {/* Mobile menu button */}
              <button
                onClick={toggleMenu}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-1">
                <a href="#home" className="py-2 nav-link">{t.nav.home}</a>
                <a href="#about" className="py-2 nav-link">{t.nav.about}</a>
                <a href="#services" className="py-2 nav-link">{t.nav.services}</a>
                <a href="#blog" className="py-2 nav-link">{t.nav.blog}</a>
                <a href="#weather" className="py-2 nav-link">{t.nav.weather}</a>
                <a href="#avalanche" className="py-2 nav-link">{t.nav.avalanche}</a>
                <a href="#gallery" className="py-2 nav-link">{t.nav.gallery}</a>
                <a href="#booking" className="py-2 nav-link">{t.nav.booking}</a>
                <a href="#contact" className="py-2 nav-link">{t.nav.contact}</a>
              </nav>
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
                <CardDescription>{t.services.web.description}</CardDescription>
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
                <CardDescription>{t.services.mobile.description}</CardDescription>
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
                <CardDescription>{t.services.design.description}</CardDescription>
              </CardContent>
            </Card>
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
                {renderForecast(weather.tignes)}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Val d’Isère</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-gray-700 mb-3">Actuel: {weather.val?.current?.temperature_2m ?? '--'}°C</div>
                {renderForecast(weather.val)}
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
              <ShieldAlert className="h-7 w-7 text-blue-600" /> Risques d’avalanche & Sécurité
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Niveau de risque (1-5)</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">Consultez le bulletin: <a className="text-blue-600 hover:underline" href="https://meteofrance.com/bulletin-avalanches" target="_blank" rel="noreferrer">Météo-France</a></p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Équipement & Initiation DVA</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 text-gray-700 space-y-1">
                  <li>Pack DVA + pelle + sonde obligatoire hors-piste</li>
                  <li>Sac airbag recommandé selon conditions</li>
                  <li>Initiation recherche de victime avec monitrice</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
              <ImagePlus className="h-7 w-7 text-blue-600" /> Galerie (photos & vidéos)
            </h2>
            <p className="text-gray-600">Dépose locale (aperçu) – pas de stockage serveur.</p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <input type="file" accept="image/*,video/*" multiple className="block" onChange={(e)=>{
              const container = document.getElementById('gallery-preview');
              if(!container) return;
              container.innerHTML = '';
              Array.from(e.target.files||[]).slice(0,12).forEach(f=>{
                const url = URL.createObjectURL(f);
                const el = document.createElement(f.type.startsWith('video')?'video':'img');
                el.src = url; el.className = 'w-full h-48 object-cover rounded-lg';
                if(el.tagName==='VIDEO'){ el.controls=true; }
                container.appendChild(el);
              })
            }} />
            <div id="gallery-preview" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full"></div>
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
                      <a href="#cancellation" className="text-blue-600 hover:underline">Réserver</a>
                      {row.rule && <span className="ml-2 text-xs text-gray-500">+ Règle de réservation</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-6 text-sm text-gray-600">
            <p>
              Vacances UK: Noël (13/12/2025–05/01/2026), Half term (16–20/02/2026), Easter (28/03–19/04/2026). Périodes de forte affluence: Sem. 51–2 et vacances UK.
            </p>
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


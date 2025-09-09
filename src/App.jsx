import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Menu, X, Mail, Phone, MapPin } from 'lucide-react'
import Logo from '@/assets/Logo.png'
import './App.css'

function App() {
  const [currentLang, setCurrentLang] = useState('fr')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const translations = {
    fr: {
      title: "Myriam Val d'Isère - Tignes",
      subtitle: 'Votre solution professionnelle pour des vacances de rêves',
      nav: {
        home: 'Accueil',
        about: 'À propos',
        services: 'Services',
        contact: 'Contact'
      },
      hero: {
        title: 'Cours de Ski & Snowboard',
        description: "Enseignement personnalisé, priorité absolue à la sécurité consciencieuse des bonnes pratiques, communication dans une atmosphère de confiance et de convivialité, organisation méticuleux, innovation pédagogique en quête constante de nouvelles techniques et outils pédagogiques.",
        cta: 'Découvrir nos services'
      },
      about: {
        title: 'À propos de moi',
        description: "Reconnue pour mon expertise, ma pédagogie et mon amour pour la montagne.\n\nJ’enseigne aux enfants et aux adultes les bases du ski alpin ; j’allie mes compétences pédagogiques et mon approche personnalisée, m'adaptant aux besoins de chaque élève.\n\nAu fil des années, j'ai guidée des groupes de skieurs à travers des terrains variés, leur enseignant les techniques avancées de ski et les principes de sécurité en montagne.\n\nMa philosophie d'enseignement repose sur la passion, la patience et la sécurité. Je crois fermement que chaque skieur, quel que soit son niveau, peut améliorer ses compétences et prendre du plaisir sur les pistes.\n\nMon approche pédagogique est centrée sur l'écoute des besoins de ses élèves, l'encouragement et la création d'un environnement d'apprentissage positif.\n\nJe mets également un point d'honneur à sensibiliser mes élèves aux aspects de sécurité en montagne.\n\nEn dehors de l'enseignement du ski, je suis une grande amoureuse de la nature. Je pratique la randonnée, l'escalade et le VTT durant les mois d'été.",
        experience: 'Années d\'expérience',
        projects: 'Projets réalisés',
        clients: 'Clients satisfaits'
      },
      services: {
        title: 'Nos Services',
        web: {
          title: 'Développement Web',
          description: 'Sites web modernes et responsives'
        },
        mobile: {
          title: 'Applications Mobile',
          description: 'Apps iOS et Android natives'
        },
        design: {
          title: 'Design UI/UX',
          description: 'Interfaces utilisateur intuitives'
        }
      },
      contact: {
        title: 'Contactez-nous',
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
        contact: 'Contact'
      },
      hero: {
        title: 'Welcome to our multilingual website',
        description: 'We create innovative web solutions tailored to your needs. Our expert team supports you in all your digital projects.',
        cta: 'Discover our services'
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
          title: 'Web Development',
          description: 'Modern and responsive websites'
        },
        mobile: {
          title: 'Mobile Applications',
          description: 'Native iOS and Android apps'
        },
        design: {
          title: 'UI/UX Design',
          description: 'Intuitive user interfaces'
        }
      },
      contact: {
        title: 'Contact Us',
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
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition-colors">{t.nav.home}</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition-colors">{t.nav.about}</a>
              <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors">{t.nav.services}</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors">{t.nav.contact}</a>
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
              <nav className="flex flex-col space-y-2">
                <a href="#home" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.home}</a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.about}</a>
                <a href="#services" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.services}</a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 py-2">{t.nav.contact}</a>
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
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
            {t.hero.cta}
          </Button>
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
              <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
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
                  <img src={Logo} alt="Tignes logo" className="h-8 w-8 object-contain" />
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
                  <Phone className="h-6 w-6 text-blue-600" />
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
                  <Badge className="h-6 w-6 text-blue-600" />
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
                <p className="text-gray-600">{t.contact.email}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <CardTitle>Téléphone</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.contact.phone}</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <CardTitle>Adresse</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">{t.contact.address}</p>
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


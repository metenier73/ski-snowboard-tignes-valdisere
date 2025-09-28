import { cn } from '@/lib/utils';
import { BookOpen, Calendar, ChevronDown, Circle, CloudSun, Home, Image, Info, Mail, Menu, Settings, ShieldAlert, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const Navigation = ({ currentLang, setCurrentLang, translations }) => {
  const [currentHash, setCurrentHash] = useState(typeof window !== 'undefined' ? (window.location.hash || '#home') : '#home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openSub, setOpenSub] = useState(null); // 'home' | 'services' | null
  const menuRef = useRef(null);
  const t = translations[currentLang];

  // Gestion du clic en dehors du menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    // Gestion clavier: fermer avec Echap
    function handleKeyDown(e) {
      if (e.key === 'Escape') setIsMenuOpen(false);
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Suivi du hash pour état actif
  useEffect(() => {
    function handleHashChange() {
      setCurrentHash(window.location.hash || '#home');
    }
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Bloquer le scroll de l'arrière-plan quand le menu mobile est ouvert
  useEffect(() => {
    if (isMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMenuOpen]);

  // Structure du menu (tout cliquable) organisé en 3 groupes
  const menuItems = [
    // Groupe 1: Accueil (A propos & Galerie en sous-menu)
    { id: 'home', label: t.nav.home, href: '#home', groupStart: true },

    // Groupe 2: Réserver / Services / Blog (Météo & Avalanche passent en sous-menu de Services)
    { id: 'booking', label: t.nav.booking, href: '#booking', groupStart: true },
    { id: 'services', label: t.nav.services, href: '#services' },
    { id: 'blog', label: t.nav.blog, href: '#blog' },

    // Groupe 3: Contact
    { id: 'contact', label: t.nav.contact, href: '#contact', groupStart: true },
  ];

  // Icônes par item
  const getItemIcon = (id) => {
    switch (id) {
      case 'home':
        return <Home className="h-4 w-4" />;
      case 'about':
        return <Info className="h-4 w-4" />;
      case 'gallery':
        return <Image className="h-4 w-4" />;
      case 'booking':
        return <Calendar className="h-4 w-4" />;
      case 'services':
        return <Settings className="h-4 w-4" />;
      case 'blog':
        return <BookOpen className="h-4 w-4" />;
      case 'weather':
        return <CloudSun className="h-4 w-4" />;
      case 'avalanche':
        return <ShieldAlert className="h-4 w-4" />;
      case 'contact':
        return <Mail className="h-4 w-4" />;
      default:
        return <Circle className="h-3 w-3" />;
    }
  };

  // Vérifie si un lien est actif (basé sur le hash)
  const isActive = (href) => {
    if (!href || href === '#') return false;
    return href === currentHash;
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setOpenSub(null);
  };

  return (
    <nav ref={menuRef} className="relative" role="navigation" aria-label="Navigation principale">
      {/* Overlay pour le menu mobile */}
      <div
        className={cn(
          'fixed inset-0 bg-black/70 backdrop-blur-[1px] z-40 md:hidden transition-opacity duration-300 ease-in-out',
          'motion-reduce:transition-none',
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        onClick={() => { setIsMenuOpen(false); setOpenSub(null); }}
        aria-hidden="true"
      />
      
      {/* Bouton menu mobile */}
      <div className="md:hidden z-50">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={cn(
            'p-3 rounded-full transition-all duration-300',
            'text-gray-700 hover:text-blue-600',
            'bg-white/80 backdrop-blur-sm hover:bg-white',
            'shadow-md hover:shadow-lg',
            'fixed top-4 right-4',
            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
            'transform transition-transform hover:scale-105',
            'flex items-center justify-center',
            'w-12 h-12',
            'dark:bg-gray-800/80 dark:text-white dark:hover:bg-gray-700'
          )}
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 transition-transform duration-300" aria-hidden="true" />
          ) : (
            <Menu className="h-6 w-6 transition-transform duration-300" aria-hidden="true" />
          )}
        </button>
      </div>

      {/* Menu principal */}
      <div
        className={cn(
          'fixed md:relative inset-x-0 top-0 md:top-auto md:inset-x-auto',
          'bg-white/95 backdrop-blur-md md:bg-transparent md:backdrop-blur-none',
          'transition-transform transition-opacity duration-300 ease-in-out transform',
          'motion-reduce:transition-none motion-reduce:transform-none',
          'overflow-y-auto md:overflow-visible',
          'z-50',
          'md:mt-0',
          'h-screen md:h-auto',
          'pt-20 pb-8 md:pt-0 md:pb-0',
          'shadow-xl md:shadow-none',
          isMenuOpen
            ? 'translate-x-0 opacity-100 pointer-events-auto'
            : 'translate-x-full opacity-0 pointer-events-none',
          'md:translate-x-0 md:opacity-100 md:pointer-events-auto',
          'border-r border-gray-100 md:border-none',
          'dark:bg-gray-900/95 dark:md:bg-transparent',
          'w-4/5 max-w-sm md:w-auto md:max-w-none',
          'md:ml-auto',
          'right-0',
          'dark:scrollbar-thumb-gray-600'
        )}
      >
        <ul className="flex flex-col md:flex-row md:items-center md:space-x-1 lg:space-x-2 px-4 md:px-0">
          {menuItems.map((item, index) => (
            <React.Fragment key={item.id}>
              {item.groupStart && index !== 0 && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-700 my-2" aria-hidden="true" />
              )}
              <li
                className={cn(
                  'relative group',
                  item.groupStart && index !== 0 && 'mt-4 md:mt-0 md:ml-6 md:pl-6 md:border-l md:border-gray-200 dark:md:border-gray-700'
                )}
              >
                {item.id === 'home' ? (
                  <div className="relative group flex items-center justify-between md:block">
                    {/* Label navigable */}
                    <a
                      href={item.href}
                      onClick={handleMenuItemClick}
                      className={cn(
                        'block px-6 py-4 md:px-3 md:py-2',
                        'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400',
                        'transition-all duration-200',
                        'font-medium',
                        'rounded-lg md:rounded-none',
                        'hover:bg-gray-100 dark:hover:bg-gray-800 md:hover:bg-transparent',
                        'flex items-center',
                        'relative',
                        'after:content-["" ] after:absolute after:bottom-0 after:left-0',
                        'after:h-0.5 after:w-0 after:bg-blue-600 dark:after:bg-blue-400',
                        'after:transition-all after:duration-300 motion-reduce:transition-none',
                        'hover:after:w-full',
                        'md:after:bottom-1',
                        'md:after:left-1/2 md:after:-translate-x-1/2',
                        'md:after:w-0 md:group-hover:after:w-4/5'
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      <span className="mr-2 flex items-center justify-center">{getItemIcon(item.id)}</span>
                      <span className="ml-1">{item.label}</span>
                    </a>
                    {/* Chevron toggle (mobile only) */}
                    <button
                      className="md:hidden p-2 mr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSub(openSub === 'home' ? null : 'home');
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSub(openSub === 'home' ? null : 'home');
                      }}
                      aria-haspopup="menu"
                      aria-expanded={openSub === 'home'}
                      aria-controls="submenu-home"
                      aria-label="Ouvrir le sous-menu Accueil"
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', openSub === 'home' && 'rotate-180')} />
                    </button>
                    <div
                      id="submenu-home"
                      className={cn(
                        // Mobile animated collapse/expand
                        'overflow-hidden transition-all duration-300 ease-out transform md:transition-none',
                        openSub === 'home' ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
                        // Desktop hover menu behavior
                        'md:block md:absolute left-0 md:mt-2 md:w-56 bg-white rounded-md shadow-lg py-1 md:translate-y-0',
                        'md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible',
                        'z-50 border border-gray-100 md:overflow-visible'
                      )}
                    >
                      <a href="#home" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#home') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'home' ? 'opacity-100 delay-75 md:delay-0' : 'opacity-0 md:opacity-100')} title="Accueil">
                        <Home className="h-4 w-4 text-blue-600" />
                        <span>Accueil</span>
                      </a>
                      <div className="my-1 border-t border-gray-100" />
                      <a href="#about" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#about') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'home' ? 'opacity-100 delay-150 md:delay-0' : 'opacity-0 md:opacity-100')} title="À propos">
                        <Info className="h-4 w-4 text-gray-600" />
                        <span>{t.nav.about}</span>
                      </a>
                      <a href="#gallery" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#gallery') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'home' ? 'opacity-100 delay-200 md:delay-0' : 'opacity-0 md:opacity-100')} title="Galerie">
                        <Image className="h-4 w-4 text-gray-600" />
                        <span>{t.nav.gallery}</span>
                      </a>
                    </div>
                  </div>
                ) : item.id === 'services' ? (
                  <div className="relative group flex items-center justify-between md:block">
                    {/* Label navigable */}
                    <a
                      href={item.href}
                      onClick={handleMenuItemClick}
                      className={cn(
                        'block px-6 py-4 md:px-3 md:py-2',
                        'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400',
                        'transition-all duration-200',
                        'font-medium',
                        'rounded-lg md:rounded-none',
                        'hover:bg-gray-100 dark:hover:bg-gray-800 md:hover:bg-transparent',
                        'flex items-center',
                        'relative',
                        'after:content-["" ] after:absolute after:bottom-0 after:left-0',
                        'after:h-0.5 after:w-0 after:bg-blue-600 dark:after:bg-blue-400',
                        'after:transition-all after:duration-300 motion-reduce:transition-none',
                        'hover:after:w-full',
                        'md:after:bottom-1',
                        'md:after:left-1/2 md:after:-translate-x-1/2',
                        'md:after:w-0 md:group-hover:after:w-4/5'
                      )}
                      aria-current={isActive(item.href) ? 'page' : undefined}
                    >
                      <span className="mr-2 flex items-center justify-center">{getItemIcon(item.id)}</span>
                      <span className="ml-1">{item.label}</span>
                    </a>
                    {/* Chevron toggle (mobile only) */}
                    <button
                      className="md:hidden p-2 mr-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSub(openSub === 'services' ? null : 'services');
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setOpenSub(openSub === 'services' ? null : 'services');
                      }}
                      aria-haspopup="menu"
                      aria-expanded={openSub === 'services'}
                      aria-controls="submenu-services"
                      aria-label="Ouvrir le sous-menu Services"
                    >
                      <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', openSub === 'services' && 'rotate-180')} />
                    </button>
                    <div
                      id="submenu-services"
                      className={cn(
                        'overflow-hidden transition-all duration-300 ease-out transform md:transition-none',
                        openSub === 'services' ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1 pointer-events-none',
                        'md:block md:absolute left-0 md:mt-2 md:w-56 bg-white rounded-md shadow-lg py-1 md:translate-y-0',
                        'md:opacity-0 md:invisible md:group-hover:opacity-100 md:group-hover:visible',
                        'z-50 border border-gray-100 md:overflow-visible'
                      )}
                    >
                      <a href="#services" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#services') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'services' ? 'opacity-100 delay-75 md:delay-0' : 'opacity-0 md:opacity-100')} title="Tous les services">
                        <Settings className="h-4 w-4 text-gray-600" />
                        <span>Tous les services</span>
                      </a>
                      <a href="#blog" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#blog') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'services' ? 'opacity-100 delay-100 md:delay-0' : 'opacity-0 md:opacity-100')} title="Blog">
                        <BookOpen className="h-4 w-4 text-gray-600" />
                        <span>{t.nav.blog}</span>
                      </a>
                      <div className="my-1 border-t border-gray-100" />
                      <a href="#weather" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#weather') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'services' ? 'opacity-100 delay-150 md:delay-0' : 'opacity-0 md:opacity-100')} title="Prévisions météo">
                        <CloudSun className="h-4 w-4 text-blue-600" />
                        <span>Prévisions météo</span>
                      </a>
                      <a href="#avalanche" onClick={handleMenuItemClick} className={cn("flex items-center gap-2 px-4 py-2 text-sm rounded-md hover:bg-gray-100 transition-opacity duration-300 md:duration-150", isActive('#avalanche') ? 'text-blue-600 bg-blue-50' : 'text-gray-700', openSub === 'services' ? 'opacity-100 delay-200 md:delay-0' : 'opacity-0 md:opacity-100')} title="Risques d'avalanche">
                        <ShieldAlert className="h-4 w-4 text-red-600" />
                        <span>{t.nav.avalanche}</span>
                      </a>
                    </div>
                  </div>
                ) : (
                  <a
                    href={item.href}
                    onClick={handleMenuItemClick}
                    className={cn(
                      'block px-6 py-4 md:px-3 md:py-2',
                      'text-gray-800 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400',
                      'transition-all duration-200',
                      'font-medium',
                      'rounded-lg md:rounded-none',
                      'hover:bg-gray-100 dark:hover:bg-gray-800 md:hover:bg-transparent',
                      'flex items-center',
                      'group',
                      'relative',
                      'after:content-[""] after:absolute after:bottom-0 after:left-0',
                      'after:h-0.5 after:w-0 after:bg-blue-600 dark:after:bg-blue-400',
                      'after:transition-all after:duration-300 motion-reduce:transition-none',
                      'hover:after:w-full',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                      'focus:ring-offset-white dark:focus:ring-offset-gray-900',
                      'md:after:bottom-1',
                      'md:after:left-1/2 md:after:-translate-x-1/2',
                      'md:after:w-0 md:group-hover:after:w-4/5',
                      isActive(item.href) && 'text-blue-600 dark:text-blue-400 after:w-full md:after:w-4/5 bg-blue-50/50 dark:bg-blue-900/20',
                      item.id === 'booking' && 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm'
                    )}
                    aria-current={isActive(item.href) ? 'page' : undefined}
                    role="menuitem"
                    aria-label={item.label}
                  >
                    <span className="mr-2 flex items-center justify-center">{getItemIcon(item.id)}</span>
                    <span className="ml-1">{item.label}</span>
                  </a>
                )}
              </li>
            </React.Fragment>
          ))}

          {/* Sélecteur de langue */}
          <li className="mt-4 md:mt-0 md:ml-2 px-4 py-2 md:px-0 md:py-0">
            <div className="relative">
              <select
                value={currentLang}
                onChange={(e) => setCurrentLang(e.target.value)}
                className={cn(
                  'w-full md:w-auto',
                  'bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm',
                  'border border-gray-200 dark:border-gray-700',
                  'px-4 py-2.5 pr-10 text-sm md:text-base',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                  'transition-all duration-200',
                  'appearance-none',
                  'rounded-full',
                  'shadow-sm hover:shadow',
                  'cursor-pointer',
                  'hover:border-blue-400 dark:hover:border-blue-500',
                  'focus:border-blue-500 dark:focus:border-blue-500',
                  'text-gray-800 dark:text-gray-200',
                  'dark:focus:ring-offset-gray-900',
                  'font-medium',
                  'pl-3',
                  'h-11 md:h-10',
                  'flex items-center',
                  'hover:bg-white dark:hover:bg-gray-800'
                )}
                aria-label="Sélectionner la langue"
              >
                <option value="fr" className="bg-white dark:bg-gray-800">🇫🇷 Français</option>
                <option value="en" className="bg-white dark:bg-gray-800">🇬🇧 English</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

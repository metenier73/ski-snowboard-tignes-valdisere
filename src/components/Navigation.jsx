import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ChevronRight, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = ({ currentLang, setCurrentLang, translations }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const menuRef = useRef(null);
  const t = translations[currentLang];

  // Gestion du clic en dehors du menu
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
        setActiveSubmenu(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Structure des menus déroulants
  const menuItems = [
    {
      id: 'home',
      label: t.nav.home,
      href: '#home',
      submenu: [
        { label: t.nav.about, href: '#about' }
      ]
    },
    {
      id: 'services',
      label: t.nav.services,
      submenu: [
        { label: 'Tous les services', href: '#services' },
        { label: t.nav.blog, href: '#blog' },
        { 
          label: t.nav.weather, 
          href: '#weather',
          submenu: [
            { label: t.nav.avalanche, href: '#avalanche' }
          ]
        }
      ]
    },
    { 
      id: 'booking', 
      label: t.nav.booking, 
      href: '#booking' 
    },
    { 
      id: 'gallery', 
      label: t.nav.gallery, 
      href: '#gallery' 
    },
    { 
      id: 'contact', 
      label: t.nav.contact, 
      href: '#contact' 
    }
  ];

  const toggleSubmenu = (id, event) => {
    event.stopPropagation();
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  const handleMenuItemClick = (event, hasSubmenu = false) => {
    if (!hasSubmenu) {
      setIsMenuOpen(false);
      setActiveSubmenu(null);
    }
  };
  
  const renderSubmenu = (items, level = 0) => {
    return (
      <ul 
        className={cn(
          'bg-white rounded-md shadow-lg',
          'transition-all duration-200',
          'overflow-hidden',
          'z-50',
          level > 0 ? 'ml-2 mt-1' : 'mt-1',
          'border border-gray-100',
          'min-w-[200px]'
        )}
      >
        {items.map((item, index) => (
          <li key={`${item.id || item.label}-${index}`} className="relative group">
            {item.submenu ? (
              <>
                <button
                  onClick={(e) => toggleSubmenu(`${item.id || item.label}-${index}`, e)}
                  className={cn(
                    'w-full flex items-center justify-between',
                    'px-4 py-2',
                    'text-gray-700 hover:bg-gray-50',
                    'transition-colors duration-150',
                    'hover:text-blue-600',
                    'whitespace-nowrap',
                    'border-b border-gray-50 last:border-0',
                    'text-left',
                    'group'
                  )}
                  aria-expanded={activeSubmenu === `${item.id || item.label}-${index}`}
                  aria-haspopup="true"
                >
                  <span>{item.label}</span>
                  <ChevronRight className="h-4 w-4 ml-2" />
                </button>
                {activeSubmenu === `${item.id || item.label}-${index}` && (
                  <div className="relative">
                    {renderSubmenu(item.submenu, level + 1)}
                  </div>
                )}
              </>
            ) : (
              <a
                href={item.href}
                onClick={(e) => handleMenuItemClick(e, false)}
                className={cn(
                  'block px-4 py-2',
                  'text-gray-700 hover:bg-gray-50',
                  'transition-colors duration-150',
                  'hover:text-blue-600',
                  'whitespace-nowrap',
                  'border-b border-gray-50 last:border-0',
                  'flex items-center',
                  'group'
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav ref={menuRef} className="relative">
      {/* Bouton menu mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Menu principal */}
      <div
        className={cn(
          'absolute md:relative left-0 right-0 md:block',
          'bg-white md:bg-transparent shadow-lg md:shadow-none',
          'transition-all duration-300 ease-in-out',
          'overflow-hidden',
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 md:max-h-full opacity-0 md:opacity-100',
          'z-50',
          'mt-2 md:mt-0',
          'rounded-b-lg md:rounded-none',
          'border border-gray-100 md:border-none',
          'py-2 md:py-0'
        )}
      >
        <ul className="flex flex-col md:flex-row md:items-center md:space-x-2 lg:space-x-4">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onClick={(e) => toggleSubmenu(item.id, e)}
                    className={cn(
                      'w-full md:w-auto flex items-center justify-between',
                      'px-4 py-3 md:px-3 md:py-2',
                      'text-gray-700 hover:text-blue-600',
                      'transition-colors duration-200',
                      'font-medium',
                      'rounded-md',
                      'hover:bg-gray-50 md:hover:bg-transparent',
                      'text-left',
                      'group',
                      'md:group-hover:bg-gray-50',
                      'md:group-hover:rounded-b-none',
                      'relative'
                    )}
                    aria-expanded={activeSubmenu === item.id}
                    aria-haspopup="true"
                  >
                    <span>{item.label}</span>
                    <span className="ml-2">
                      {activeSubmenu === item.id ? (
                        <ChevronUp className="h-4 w-4 inline-block" />
                      ) : (
                        <ChevronDown className="h-4 w-4 inline-block" />
                      )}
                    </span>
                  </button>
                  
                  {/* Sous-menu */}
                  {(activeSubmenu === item.id || isMenuOpen) && (
                    <div className="md:absolute md:top-full md:left-0 md:z-50 md:pt-2">
                      {renderSubmenu(item.submenu)}
                    </div>
                  )}
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={(e) => handleMenuItemClick(e, false)}
                  className={cn(
                    'block px-4 py-3 md:px-3 md:py-2',
                    'text-gray-700 hover:text-blue-600',
                    'transition-colors duration-200',
                    'font-medium',
                    'rounded-md',
                    'hover:bg-gray-50 md:hover:bg-transparent',
                    'flex items-center',
                    'group'
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  {item.label}
                </a>
              )}
            </li>
          ))}

          {/* Sélecteur de langue */}
          <li className="mt-4 md:mt-0 md:ml-4 px-4 py-2 md:px-0 md:py-0">
            <select
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className={cn(
                'w-full md:w-auto',
                'bg-white border border-gray-300 rounded-md',
                'px-3 py-1.5 text-sm',
                'focus:outline-none focus:ring-2 focus:ring-blue-500',
                'transition-colors',
                'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpolyline points=\'6 9 12 15 18 9\'%3E%3C/polyline%3E%3C/svg%3E")]',
                'bg-no-repeat bg-[right_0.5rem_center]',
                'pr-8',
                'cursor-pointer',
                'hover:border-blue-400',
                'focus:border-blue-500',
                'dark:bg-gray-800 dark:border-gray-600 dark:text-white',
                'dark:hover:border-blue-500',
                'dark:focus:border-blue-500'
              )}
              aria-label="Sélectionner la langue"
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;

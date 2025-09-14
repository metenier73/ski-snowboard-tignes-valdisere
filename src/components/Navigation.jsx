import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Menu, X } from 'lucide-react';
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
    { id: 'home', label: t.nav.home, href: '#home' },
    { id: 'about', label: t.nav.about, href: '#about' },
    {
      id: 'services',
      label: t.nav.services,
      submenu: [
        { label: 'Tous les services', href: '#services' },
        { label: t.nav.booking, href: '#booking' },
        { label: t.nav.blog, href: '#blog' },
      ],
    },
    {
      id: 'info',
      label: 'Infos pratiques',
      submenu: [
        { label: t.nav.weather, href: '#weather' },
        { label: t.nav.avalanche, href: '#avalanche' },
      ],
    },
    { id: 'gallery', label: t.nav.gallery, href: '#gallery' },
    { id: 'contact', label: t.nav.contact, href: '#contact' },
  ];

  const toggleSubmenu = (id) => {
    setActiveSubmenu(activeSubmenu === id ? null : id);
  };

  const handleMenuItemClick = () => {
    setIsMenuOpen(false);
    setActiveSubmenu(null);
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
          'border border-gray-100 md:border-none'
        )}
      >
        <ul className="flex flex-col md:flex-row md:items-center md:space-x-2 lg:space-x-4">
          {menuItems.map((item) => (
            <li key={item.id} className="relative group">
              {item.submenu ? (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.id)}
                    className={cn(
                      'w-full md:w-auto flex items-center justify-between md:justify-center',
                      'px-4 py-3 md:px-3 md:py-2',
                      'text-gray-700 hover:text-blue-600',
                      'transition-colors duration-200',
                      'font-medium',
                      'rounded-md',
                      'hover:bg-gray-50 md:hover:bg-transparent',
                      'text-left md:text-center',
                      'group'
                    )}
                    aria-expanded={activeSubmenu === item.id}
                    aria-haspopup="true"
                    aria-controls={`submenu-${item.id}`}
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
                  <ul
                    id={`submenu-${item.id}`}
                    className={cn(
                      'md:absolute md:top-full md:left-0',
                      'md:bg-white md:rounded-md md:shadow-lg',
                      'md:min-w-[200px]',
                      'transition-all duration-200',
                      'overflow-hidden',
                      activeSubmenu === item.id || isMenuOpen
                        ? 'max-h-96 opacity-100'
                        : 'max-h-0 opacity-0 md:opacity-0 md:invisible',
                      'md:group-hover:opacity-100 md:group-hover:visible md:group-hover:max-h-96',
                      'md:border md:border-gray-100',
                      'z-50'
                    )}
                  >
                    {item.submenu.map((subItem, index) => (
                      <li key={index}>
                        <a
                          href={subItem.href}
                          onClick={handleMenuItemClick}
                          className={cn(
                            'block px-4 py-2',
                            'text-gray-700 hover:bg-gray-50',
                            'transition-colors duration-150',
                            'hover:text-blue-600',
                            'whitespace-nowrap',
                            'flex items-center',
                            'border-b border-gray-50 last:border-0',
                            'md:border-b-0 md:last:border-0'
                          )}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <a
                  href={item.href}
                  onClick={handleMenuItemClick}
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
                'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")]',
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
                'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")]',
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

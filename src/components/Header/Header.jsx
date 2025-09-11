import { useState } from 'react';
import { Menu, X, Snowflake } from 'lucide-react';
import Logo from '@/assets/Logo.png';

const Header = ({ currentLang, setCurrentLang, t, isMenuOpen, setIsMenuOpen }) => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src={Logo} alt="Tignes logo" className="h-16 w-16 object-contain" />
            <span className="ml-3 text-xl font-bold text-gray-900">
              <span className="block text-sm font-normal text-gray-500">Myriam</span>
              <span>Val d'Isère - Tignes</span>
            </span>
          </div>
          
          {/* Navigation desktop */}
          <nav className="hidden md:flex space-x-6">
            {Object.entries(t.nav).map(([key, value]) => (
              <a 
                key={key} 
                href={`#${key}`}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                <Snowflake className="h-3.5 w-3.5 mr-1" />
                {value}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center space-x-4">
            {/* Sélecteur de langue */}
            <div className="hidden md:flex space-x-2">
              <button 
                onClick={() => setCurrentLang('fr')} 
                className={`px-2 py-1 text-sm rounded ${currentLang === 'fr' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setCurrentLang('en')} 
                className={`px-2 py-1 text-sm rounded ${currentLang === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                EN
              </button>
            </div>
            
            {/* Bouton menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900"
              aria-label={isMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {Object.entries(t.nav).map(([key, value]) => (
              <a
                key={key}
                href={`#${key}`}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setIsMenuOpen(false)}
              >
                {value}
              </a>
            ))}
            <div className="flex space-x-2 px-3 py-2">
              <button 
                onClick={() => {
                  setCurrentLang('fr');
                  setIsMenuOpen(false);
                }} 
                className={`px-3 py-1 text-sm rounded ${currentLang === 'fr' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                Français
              </button>
              <button 
                onClick={() => {
                  setCurrentLang('en');
                  setIsMenuOpen(false);
                }} 
                className={`px-3 py-1 text-sm rounded ${currentLang === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                English
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

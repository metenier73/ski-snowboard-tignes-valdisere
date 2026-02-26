import React from 'react'
import Logo from '../assets/Logo.png'

// Composant Footer réutilisable
const Footer = ({ title, subtitle, currentLang }) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img 
            src={Logo} 
            alt="Tignes logo" 
            className="h-10 w-10 object-contain" 
            loading="lazy" 
            decoding="async" 
          />
          <span className="text-lg font-semibold">{title}</span>
        </div>
        <p className="text-gray-400">{subtitle}</p>
        <p className="text-gray-500 text-sm mt-4">
          © 2025 {title}. {currentLang === 'fr' ? 'Tous droits réservés.' : 'All rights reserved.'}
        </p>
      </div>
    </footer>
  )
}

export default Footer

import React from 'react'
import { cn } from '@/lib/utils'

// Composant pour les cartes de services réutilisable
const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  features = [], 
  className = '',
  currentLang = 'fr',
  variant = 'default' 
}) => {
  const variants = {
    default: 'bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300',
    gradient: 'bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-md hover:shadow-lg transition-all duration-300',
    dark: 'bg-gray-800 text-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300'
  }

  return (
    <div className={cn(variants[variant], className)}>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        
        {features.length > 0 && (
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default ServiceCard

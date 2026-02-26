import React from 'react'
import { Mail, Phone, MapPin } from 'lucide-react'

// Composant pour les informations de contact réutilisable
const ContactInfo = ({ email, phone, address, currentLang }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
          <Mail className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentLang === 'fr' ? 'Email' : 'Email'}
          </h3>
          <a 
            href={`mailto:${email}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {email}
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
          <Phone className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentLang === 'fr' ? 'Téléphone' : 'Phone'}
          </h3>
          <a 
            href={`tel:${phone}`}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            {phone}
          </a>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <MapPin className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {currentLang === 'fr' ? 'Adresse' : 'Address'}
          </h3>
          <p className="text-gray-600">{address}</p>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo

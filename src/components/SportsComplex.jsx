import React from 'react'
import { cn } from '@/lib/utils'

// Composant pour les cartes de sports complexes réutilisable
const SportsComplexCard = ({ 
  name, 
  description, 
  features = [], 
  activities = [], 
  icon = '🏊',
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 transform hover:scale-105 transition-all duration-200',
    featured: 'bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-2xl overflow-hidden border-4 border-white/20 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2',
    compact: 'bg-white/10 backdrop-blur-sm rounded-lg p-4 transform hover:bg-white/20 transition-all duration-200'
  }

  return (
    <div className={cn(variants[variant], className)}>
      <div className="relative z-10">
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl border-2 border-white/30 transform group-hover:rotate-12 transition-all duration-300">
              <span className="text-3xl">{icon}</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {name}
            </h3>
            <p className="text-lg text-white/90 leading-relaxed">
              {description}
            </p>
          </div>
        </div>

        {features.length > 0 && (
          <div className="space-y-3 mb-4">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-xl">🏊‍♂️</span>
              {variant === 'featured' ? 'Équipements principaux' : 'Équipements'}
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="bg-white/10 rounded-lg p-3">
                  <p className="text-white/90 text-sm">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activities.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-xl">🎿</span>
              {variant === 'featured' ? 'Activités disponibles' : 'Activités'}
            </h4>
            <div className="space-y-2">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-blue-300">•</span>
                  <p className="text-white/80 text-sm">{activity}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Composant pour les sections de sports complexes
const SportsComplexSection = ({ 
  title, 
  subtitle, 
  complexes = [], 
  variant = 'default',
  className = ''
}) => {
  return (
    <section className={cn('py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50', className)}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            {title}
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            {subtitle}
          </p>
        </div>
        
        <div className="space-y-8">
          {complexes.map((complex, index) => (
            <SportsComplexCard 
              key={index}
              {...complex}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export { SportsComplexCard, SportsComplexSection }
export default SportsComplexCard

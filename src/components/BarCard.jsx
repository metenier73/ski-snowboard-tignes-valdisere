import React from 'react'
import { cn } from '@/lib/utils'

// Composant pour les fiches de bars/restaurants réutilisable
const BarCard = ({ 
  name, 
  description, 
  rating, 
  specialties = [], 
  icon = '🍹',
  variant = 'default',
  className = ''
}) => {
  const variants = {
    default: 'bg-white/10 backdrop-blur-sm rounded-lg p-3 transform hover:translate-x-1 transition-all duration-200',
    featured: 'bg-white/20 backdrop-blur-sm rounded-xl p-4 transform hover:scale-105 transition-all duration-300 border border-white/30',
    compact: 'bg-white/10 backdrop-blur-sm rounded-lg p-2 transform hover:bg-white/20 transition-all duration-200'
  }

  return (
    <div className={cn(variants[variant], className)}>
      <div className="flex items-start gap-2">
        <span className="text-amber-300 mt-1 text-lg">{icon}</span>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <strong className="text-white font-medium">{name}</strong>
            {rating && (
              <span className="text-yellow-300 text-xs font-semibold">
                {rating}
              </span>
            )}
          </div>
          <p className="text-white/80 text-xs leading-relaxed">
            {description}
          </p>
          {specialties.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {specialties.map((specialty, index) => (
                <span 
                  key={index}
                  className="inline-block bg-white/10 rounded-full px-2 py-0.5 text-xs text-white/90"
                >
                  {specialty}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Composant pour les sections de bars par zone
const BarSection = ({ 
  title, 
  subtitle, 
  bars = [], 
  icon = '🍻',
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={cn('bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20', className)}>
      <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span className="text-2xl">{icon}</span>
        {title}
      </h4>
      {subtitle && (
        <p className="text-white/80 mb-4 text-sm">
          {subtitle}
        </p>
      )}
      <div className="space-y-3">
        {bars.map((bar, index) => (
          <BarCard 
            key={index}
            {...bar}
            variant="compact"
          />
        ))}
      </div>
    </div>
  )
}

export { BarCard, BarSection }
export default BarCard

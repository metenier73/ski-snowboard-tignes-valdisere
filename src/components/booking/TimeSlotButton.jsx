import { Button } from '@/components/ui/button.jsx'
import { AlertTriangle, CheckCircle, Sun } from 'lucide-react'

/**
 * Bouton de réservation pour un créneau horaire
 */
export function TimeSlotButton({ 
  isBlocked, 
  range, 
  bookingUrl, 
  label, 
  icon: Icon = Sun,
  isMorning = true,
  currentLang = 'fr'
}) {
  const disabledClasses = isBlocked 
    ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' 
    : ''

  return (
    <Button
      disabled={isBlocked}
      asChild={!isBlocked}
      className={`min-w-[220px] ${disabledClasses}`}
      title={isBlocked 
        ? (currentLang === 'fr' ? `${label} indisponible (${range})` : `${label} unavailable (${range})`)
        : (currentLang === 'fr' ? `Réserver ${label.toLowerCase()} (${range})` : `Book ${label.toLowerCase()} (${range})`)
      }
    >
      {isBlocked ? (
        <span className="inline-flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          {label} {currentLang === 'fr' ? 'indisponible' : 'unavailable'}
        </span>
      ) : (
        <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
          {isMorning ? <Sun className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
          {currentLang === 'fr' ? `Réserver ${label.toLowerCase()} (${range})` : `Book ${label.toLowerCase()} (${range})`}
        </a>
      )}
    </Button>
  )
}





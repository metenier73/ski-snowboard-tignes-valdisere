import { AlertTriangle, CheckCircle } from 'lucide-react'

/**
 * Badge d'indicateur d'état de disponibilité
 */
export function AvailabilityBadge({ state }) {
  const configs = {
    unavailable: {
      icon: AlertTriangle,
      className: 'bg-red-100 text-red-800 border-red-200',
      text: 'Indisponible toute la journée'
    },
    partial: {
      icon: AlertTriangle,
      className: 'bg-amber-100 text-amber-800 border-amber-200',
      text: 'Disponible partiellement'
    },
    full: {
      icon: CheckCircle,
      className: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      text: 'Disponible toute la journée'
    }
  }

  const config = configs[state]
  if (!config) return null

  const Icon = config.icon

  return (
    <span className={`inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold border ${config.className}`}>
      <Icon className="h-3.5 w-3.5" />
      {config.text}
    </span>
  )
}





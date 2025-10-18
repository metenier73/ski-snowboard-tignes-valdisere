import React, { useMemo, useState } from 'react'
import { Calendar } from '@/components/ui/calendar.jsx'
import { Button } from '@/components/ui/button.jsx'
import { AlertTriangle, CheckCircle, Calendar as CalendarIcon, Sun } from 'lucide-react'

// Helper to normalize Date to yyyy-mm-dd
function toISODate(d) {
  if (!d) return ''
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export default function BookingWidget({ blockedMorningDates = [], blockedAfternoonDates = [], bookingUrl }) {
  const [selected, setSelected] = useState(null)
  const blockedMorningSet = useMemo(() => new Set(blockedMorningDates), [blockedMorningDates])
  const blockedAfternoonSet = useMemo(() => new Set(blockedAfternoonDates), [blockedAfternoonDates])

  const iso = toISODate(selected)
  const isMorningBlocked = !!iso && blockedMorningSet.has(iso)
  const isAfternoonBlocked = !!iso && blockedAfternoonSet.has(iso)

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow">
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">Réserver par date</h3>
        </div>
        <Calendar
          mode="single"
          selected={selected}
          onSelect={setSelected}
          showOutsideDays
          // Season defaults
          defaultMonth={new Date(2025, 11, 10)}
        />
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow flex flex-col gap-4">
        <div>
          <div className="text-sm text-gray-500">Date sélectionnée</div>
          <div className="text-lg font-medium">
            {selected ? selected.toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
          </div>
        </div>

        {selected ? (
          <div className="space-y-3">
            <div className="flex gap-3 flex-wrap">
              <Button
                disabled={isMorningBlocked}
                asChild={!isMorningBlocked}
                className={`min-w-[220px] ${isMorningBlocked ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' : ''}`}
                title={isMorningBlocked ? 'Matin indisponible (09:00–13:00)' : 'Réserver le matin (09:00–13:00)'}
              >
                {isMorningBlocked ? (
                  <span className="inline-flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Matin indisponible
                  </span>
                ) : (
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    Réserver matin (09:00–13:00)
                  </a>
                )}
              </Button>

              <Button
                disabled={isAfternoonBlocked}
                asChild={!isAfternoonBlocked}
                className={`min-w-[220px] ${isAfternoonBlocked ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' : ''}`}
                title={isAfternoonBlocked ? "Après-midi indisponible (13:00–16:30)" : "Réserver l'après-midi (13:00–16:30)"}
              >
                {isAfternoonBlocked ? (
                  <span className="inline-flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Après-midi indisponible
                  </span>
                ) : (
                  <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    <CheckCircle className="h-4 w-4" />
                    Réserver après-midi (13:00–16:30)
                  </a>
                )}
              </Button>
            </div>

            {(isMorningBlocked || isAfternoonBlocked) && (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Indisponibilité ce jour</div>
                  <div className="text-xs">
                    {isMorningBlocked && !isAfternoonBlocked && "Matin (09:00–13:00) fermé. L'après-midi reste disponible."}
                    {!isMorningBlocked && isAfternoonBlocked && "Après-midi (13:00–16:30) fermé. Le matin reste disponible."}
                    {isMorningBlocked && isAfternoonBlocked && "Journée complète indisponible (matin et après-midi)."}
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">Sélectionnez une date dans le calendrier pour réserver un créneau.</div>
        )}
      </div>
    </div>
  )
}

import { Button } from '@/components/ui/button.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import { AlertTriangle, Calendar as CalendarIcon, CheckCircle, Sun } from 'lucide-react'
import { useMemo, useState } from 'react'

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
  
  // Dates avec créneaux partiels spéciaux (ne pas traiter comme complètement bloquées)
  const partialSlotSet = useMemo(() => new Map([
    ['2025-12-01', { blocked: '09:00–12:30', availableSlots: [{label: '12:30–13:00', range: '12:30–13:00'}, {label: 'Après-midi', range: '13:00–16:30'}] }],
    ['2025-12-06', { blocked: '11:00–13:00', availableSlots: [{label: 'Matin (09:00–11:00)', range: '09:00–11:00'}, {label: 'Après-midi', range: '13:00–16:30'}] }],
    ['2025-12-07', { blocked: '11:00–13:00', availableSlots: [{label: 'Matin (09:00–11:00)', range: '09:00–11:00'}, {label: 'Après-midi', range: '13:00–16:30'}] }]
  ]), [])
  const partialSlot = iso ? partialSlotSet.get(iso) : null
  
  // Si la date a un créneau partiel, ne pas la traiter comme complètement bloquée
  const isMorningBlocked = !!iso && blockedMorningSet.has(iso) && !partialSlot
  const isAfternoonBlocked = !!iso && blockedAfternoonSet.has(iso) && !partialSlot

  // Dates dont le matin s'étend exceptionnellement jusqu'à 14:00 (au lieu de 13:00)
  // et l'après-midi commence à 14:00 et se termine à 17:00
  const extendedMorningSet = useMemo(() => new Set([
    '2026-01-26',
    '2026-01-27',
    '2026-01-28',
    '2026-01-29',
    '2026-01-30'
  ]), [])
  const isExtendedMorning = !!iso && extendedMorningSet.has(iso)
  
  
  const morningRange = isExtendedMorning ? '09:00–14:00' : '09:00–13:00'
  const afternoonRange = isExtendedMorning ? '14:00–17:00' : '13:00–16:30'

  const availabilityState = (() => {
    if (!iso) return 'none'
    if (partialSlot) return 'partial'
    if (isMorningBlocked && isAfternoonBlocked) return 'unavailable'
    if (isMorningBlocked || isAfternoonBlocked) return 'partial'
    return 'full'
  })()

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
          modifiers={{
            unavailable: (date) => {
              const d = toISODate(date)
              return blockedMorningSet.has(d) && blockedAfternoonSet.has(d) && !partialSlotSet.has(d)
            },
            partial: (date) => {
              const d = toISODate(date)
              // Dates avec créneaux partiels
              if (partialSlotSet.has(d)) return true
              const m = blockedMorningSet.has(d)
              const a = blockedAfternoonSet.has(d)
              return (m && !a) || (!m && a)
            },
            full: (date) => {
              const d = toISODate(date)
              return !blockedMorningSet.has(d) && !blockedAfternoonSet.has(d) && !partialSlotSet.has(d)
            }
          }}
          modifiersClassNames={{
            unavailable: 'outline outline-2 outline-red-400 bg-red-50 text-red-900',
            partial: 'outline outline-2 outline-amber-400 bg-amber-50 text-amber-900',
            full: 'outline outline-2 outline-emerald-400 bg-emerald-50 text-emerald-900'
          }}
          className="rounded-md border"
        />
        <div className="mt-2 flex items-center gap-3 text-xs text-gray-600">
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-red-200 border border-red-300"></span> Indisponible</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-amber-200 border border-amber-300"></span> Partiel</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-emerald-200 border border-emerald-300"></span> Disponible</span>
        </div>
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
            {/* Indicateur d'état (rouge / orange / vert) */}
            <div>
              {availabilityState === 'unavailable' && (
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Indisponible toute la journée
                </span>
              )}
              {availabilityState === 'partial' && (
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                  <AlertTriangle className="h-3.5 w-3.5" />
                  Disponible partiellement
                </span>
              )}
              {availabilityState === 'full' && (
                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  <CheckCircle className="h-3.5 w-3.5" />
                  Disponible toute la journée
                </span>
              )}
            </div>

            {partialSlot ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Créneaux disponibles :</div>
                {partialSlot.availableSlots && partialSlot.availableSlots.map((slot, idx) => (
                  <Button
                    key={idx}
                    asChild
                    className="w-full"
                    title={`Réserver ${slot.range}`}
                  >
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 justify-center">
                      {idx === 0 ? <Sun className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      Réserver {slot.label} ({slot.range})
                    </a>
                  </Button>
                ))}
                <div className="text-xs text-gray-600 mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                  <span className="font-medium">Indisponible :</span> {partialSlot.blocked}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <Button
                  disabled={isMorningBlocked}
                  asChild={!isMorningBlocked}
                  className={`min-w-[220px] ${isMorningBlocked ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' : ''}`}
                  title={isMorningBlocked ? `Matin indisponible (${morningRange})` : `Réserver le matin (${morningRange})`}
                >
                  {isMorningBlocked ? (
                    <span className="inline-flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Matin indisponible
                    </span>
                  ) : (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <Sun className="h-4 w-4" />
                      Réserver matin ({morningRange})
                    </a>
                  )}
                </Button>

                <Button
                  disabled={isAfternoonBlocked}
                  asChild={!isAfternoonBlocked}
                  className={`min-w-[220px] ${isAfternoonBlocked ? 'bg-gray-300 text-gray-600 cursor-not-allowed hover:bg-gray-300' : ''}`}
                  title={isAfternoonBlocked ? `Après-midi indisponible (${afternoonRange})` : `Réserver l'après-midi (${afternoonRange})`}
                >
                  {isAfternoonBlocked ? (
                    <span className="inline-flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      Après-midi indisponible
                    </span>
                  ) : (
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Réserver après-midi ({afternoonRange})
                    </a>
                  )}
                </Button>
              </div>
            )}

            {partialSlot ? (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Créneau partiellement indisponible</div>
                  <div className="text-xs">
                    Le créneau {partialSlot.blocked} est réservé. {partialSlot.availableSlots?.length > 0 ? `${partialSlot.availableSlots.length} autre(s) créneau(x) restent disponibles.` : 'Les autres créneaux restent disponibles.'}
                  </div>
                </div>
              </div>
            ) : (isMorningBlocked || isAfternoonBlocked) && (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Indisponibilité ce jour</div>
                  <div className="text-xs">
                    {isMorningBlocked && !isAfternoonBlocked && `Matin (${morningRange}) fermé. L'après-midi reste disponible.`}
                    {!isMorningBlocked && isAfternoonBlocked && `Après-midi (${afternoonRange}) fermé. Le matin reste disponible.`}
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

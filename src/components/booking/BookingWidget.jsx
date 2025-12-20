import { Button } from '@/components/ui/button.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import { AlertTriangle, Calendar as CalendarIcon, CheckCircle, Sun } from 'lucide-react'
import { useState, useCallback } from 'react'
import {
  PARTIAL_SLOT_DATES,
  CALENDAR_CONFIG,
  DATE_MODIFIER_CLASSES
} from '@/config/booking.js'
import { useBookingAvailability, toISODate } from '@/hooks/useBookingAvailability.js'
import { AvailabilityBadge } from './AvailabilityBadge.jsx'
import { TimeSlotButton } from './TimeSlotButton.jsx'

/**
 * Composant de widget de réservation avec calendrier interactif
 * @param {Object} props
 * @param {string[]} props.blockedMorningDates - Dates où le matin est bloqué
 * @param {string[]} props.blockedAfternoonDates - Dates où l'après-midi est bloqué
 * @param {string} props.bookingUrl - URL de réservation
 */
export default function BookingWidget({ blockedMorningDates = [], blockedAfternoonDates = [], bookingUrl }) {
  const [selected, setSelected] = useState(null)
  
  // Utilisation du hook personnalisé pour gérer la disponibilité
  const {
    partialSlot,
    isMorningBlocked,
    isAfternoonBlocked,
    morningRange,
    afternoonRange,
    availabilityState,
    blockedMorningSet,
    blockedAfternoonSet
  } = useBookingAvailability(selected, blockedMorningDates, blockedAfternoonDates)

  // Fonctions de vérification pour les modificateurs du calendrier
  const checkUnavailable = useCallback((date) => {
    const d = toISODate(date)
    return blockedMorningSet.has(d) && blockedAfternoonSet.has(d) && !PARTIAL_SLOT_DATES.has(d)
  }, [blockedMorningSet, blockedAfternoonSet])

  const checkPartial = useCallback((date) => {
    const d = toISODate(date)
    // Dates avec créneaux partiels
    if (PARTIAL_SLOT_DATES.has(d)) return true
    const m = blockedMorningSet.has(d)
    const a = blockedAfternoonSet.has(d)
    return (m && !a) || (!m && a)
  }, [blockedMorningSet, blockedAfternoonSet])

  const checkFull = useCallback((date) => {
    const d = toISODate(date)
    return !blockedMorningSet.has(d) && !blockedAfternoonSet.has(d) && !PARTIAL_SLOT_DATES.has(d)
  }, [blockedMorningSet, blockedAfternoonSet])

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
          showOutsideDays={CALENDAR_CONFIG.showOutsideDays}
          defaultMonth={CALENDAR_CONFIG.defaultMonth}
          modifiers={{
            unavailable: checkUnavailable,
            partial: checkPartial,
            full: checkFull
          }}
          modifiersClassNames={DATE_MODIFIER_CLASSES}
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
              <AvailabilityBadge state={availabilityState} />
            </div>

            {partialSlot ? (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 mb-2">Créneaux disponibles :</div>
                {partialSlot.availableSlots?.map((slot, idx) => (
                  <Button
                    key={`${slot.range}-${idx}`}
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
                <TimeSlotButton
                  isBlocked={isMorningBlocked}
                  range={morningRange}
                  bookingUrl={bookingUrl}
                  label="Matin"
                  isMorning={true}
                />
                <TimeSlotButton
                  isBlocked={isAfternoonBlocked}
                  range={afternoonRange}
                  bookingUrl={bookingUrl}
                  label="Après-midi"
                  isMorning={false}
                />
              </div>
            )}

            {partialSlot ? (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">Créneau partiellement indisponible</div>
                  <div className="text-xs">
                    Le créneau {partialSlot.blocked} est réservé.{' '}
                    {partialSlot.availableSlots?.length > 0 
                      ? `${partialSlot.availableSlots.length} autre(s) créneau(x) restent disponibles.` 
                      : 'Les autres créneaux restent disponibles.'}
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

import { Button } from '@/components/ui/button.jsx'
import { Calendar } from '@/components/ui/calendar.jsx'
import {
    CALENDAR_CONFIG,
    DATE_MODIFIER_CLASSES,
    FULLY_AVAILABLE_DATES,
    FULLY_BLOCKED_DATES,
    PARTIAL_SLOT_DATES
} from '@/config/booking.js'
import { toISODate, useBookingAvailability } from '@/hooks/useBookingAvailability.js'
import { AlertTriangle, Calendar as CalendarIcon, CheckCircle, Sun } from 'lucide-react'
import { useCallback, useState } from 'react'
import { AvailabilityBadge } from './AvailabilityBadge.jsx'
import { TimeSlotButton } from './TimeSlotButton.jsx'

export default function BookingWidget({ blockedMorningDates = [], blockedAfternoonDates = [], bookingUrl, currentLang = 'fr' }) {
  const [selected, setSelected] = useState(null)
  
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
    return FULLY_BLOCKED_DATES.has(d)
  }, [])

  const checkPartial = useCallback((date) => {
    const d = toISODate(date)
    return PARTIAL_SLOT_DATES.has(d)
  }, [])

  const checkFull = useCallback((date) => {
    const d = toISODate(date)
    return FULLY_AVAILABLE_DATES.has(d)
  }, [])

  return (
    <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow">
        <div className="flex items-center gap-2 mb-3">
          <CalendarIcon className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold">{currentLang === 'fr' ? 'Réserver par date' : 'Book by date'}</h3>
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
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-red-200 border border-red-300"></span> {currentLang === 'fr' ? 'Indisponible' : 'Unavailable'}</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-amber-200 border border-amber-300"></span> {currentLang === 'fr' ? 'Partiel' : 'Partial'}</span>
          <span className="inline-flex items-center gap-1"><span className="inline-block h-3 w-3 rounded-sm bg-emerald-200 border border-emerald-300"></span> {currentLang === 'fr' ? 'Disponible' : 'Available'}</span>
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow flex flex-col gap-4">
        <div>
          <div className="text-sm text-gray-500">{currentLang === 'fr' ? 'Date sélectionnée' : 'Selected date'}</div>
          <div className="text-lg font-medium">
            {selected ? selected.toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : 'en-US', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }) : '—'}
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
                <div className="text-sm font-medium text-gray-700 mb-2">{currentLang === 'fr' ? 'Créneaux disponibles :' : 'Available time slots:'}</div>
                {partialSlot.availableSlots?.map((slot, idx) => (
                  <Button
                    key={`${slot.range}-${idx}`}
                    asChild
                    className="w-full"
                    title={`${currentLang === 'fr' ? `Réserver ${slot.range}` : `Book ${slot.range}`}`}
                  >
                    <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 justify-center">
                      {idx === 0 ? <Sun className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      {currentLang === 'fr' ? `Réserver ${slot.label} (${slot.range})` : `Book ${slot.label} (${slot.range})`}
                    </a>
                  </Button>
                ))}
                <div className="text-xs text-gray-600 mt-2 p-2 bg-orange-50 rounded border border-orange-200">
                  <span className="font-medium">{currentLang === 'fr' ? 'Indisponible :' : 'Unavailable:'}</span> {partialSlot.blocked}
                </div>
              </div>
            ) : (
              <div className="flex gap-3 flex-wrap">
                <TimeSlotButton
                  isBlocked={isMorningBlocked}
                  range={morningRange}
                  bookingUrl={bookingUrl}
                  label={currentLang === 'fr' ? 'Matin' : 'Morning'}
                  isMorning={true}
                  currentLang={currentLang}
                />
                <TimeSlotButton
                  isBlocked={isAfternoonBlocked}
                  range={afternoonRange}
                  bookingUrl={bookingUrl}
                  label={currentLang === 'fr' ? 'Après-midi' : 'Afternoon'}
                  isMorning={false}
                  currentLang={currentLang}
                />
              </div>
            )}

            {partialSlot ? (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{currentLang === 'fr' ? 'Créneau partiellement indisponible' : 'Partially unavailable time slot'}</div>
                  <div className="text-xs">
                    {currentLang === 'fr' 
                      ? `Le créneau ${partialSlot.blocked} est réservé. ${partialSlot.availableSlots?.length > 0 
                        ? `${partialSlot.availableSlots.length} autre(s) créneau(x) restent disponibles.` 
                        : 'Les autres créneaux restent disponibles.'}`
                      : `The ${partialSlot.blocked} slot is booked. ${partialSlot.availableSlots?.length > 0 
                        ? `${partialSlot.availableSlots.length} other slot(s) remain available.` 
                        : 'Other slots remain available.'}`
                    }
                  </div>
                </div>
              </div>
            ) : (isMorningBlocked || isAfternoonBlocked) && (
              <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-amber-800">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                  <div className="text-sm font-medium">{currentLang === 'fr' ? 'Indisponibilité ce jour' : 'Unavailability on this day'}</div>
                  <div className="text-xs">
                    {currentLang === 'fr' 
                      ? (isMorningBlocked && !isAfternoonBlocked && `Matin (${morningRange}) fermé. L'après-midi reste disponible.`) ||
                        (!isMorningBlocked && isAfternoonBlocked && `Après-midi (${afternoonRange}) fermé. Le matin reste disponible.`) ||
                        (isMorningBlocked && isAfternoonBlocked && "Journée complète indisponible (matin et après-midi).")
                      : (isMorningBlocked && !isAfternoonBlocked && `Morning (${morningRange}) closed. Afternoon remains available.`) ||
                        (!isMorningBlocked && isAfternoonBlocked && `Afternoon (${afternoonRange}) closed. Morning remains available.`) ||
                        (isMorningBlocked && isAfternoonBlocked && "Full day unavailable (morning and afternoon).")
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-gray-500">{currentLang === 'fr' ? 'Sélectionnez une date dans le calendrier pour réserver un créneau.' : 'Select a date from the calendar to book a time slot.'}</div>
        )}
      </div>
    </div>
  )
}

import { useMemo } from 'react'
import {
  PARTIAL_SLOT_DATES,
  EXTENDED_MORNING_DATES,
  EXTENDED_AFTERNOON_DATES,
  DEFAULT_TIME_SLOTS
} from '@/config/booking.js'

/**
 * Convertit une Date en format ISO (yyyy-mm-dd)
 * @param {Date|null} date - La date à convertir
 * @returns {string} La date au format ISO ou une chaîne vide
 */
export function toISODate(date) {
  if (!date) return ''
  const yyyy = date.getFullYear()
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const dd = String(date.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Hook personnalisé pour gérer la disponibilité des réservations
 * @param {Date|null} selectedDate - La date sélectionnée
 * @param {string[]} blockedMorningDates - Dates où le matin est bloqué
 * @param {string[]} blockedAfternoonDates - Dates où l'après-midi est bloqué
 * @returns {Object} Informations sur la disponibilité
 */
export function useBookingAvailability(selectedDate, blockedMorningDates = [], blockedAfternoonDates = []) {
  // Mémorisation des sets de dates bloquées
  const blockedMorningSet = useMemo(() => new Set(blockedMorningDates), [blockedMorningDates])
  const blockedAfternoonSet = useMemo(() => new Set(blockedAfternoonDates), [blockedAfternoonDates])

  const iso = toISODate(selectedDate)
  const partialSlot = iso ? PARTIAL_SLOT_DATES.get(iso) : null
  const isExtendedMorning = !!iso && EXTENDED_MORNING_DATES.has(iso)
  const isExtendedAfternoon = !!iso && EXTENDED_AFTERNOON_DATES.has(iso)

  // Calcul de la disponibilité
  const isMorningBlocked = !!iso && blockedMorningSet.has(iso) && !partialSlot
  const isAfternoonBlocked = !!iso && blockedAfternoonSet.has(iso) && !partialSlot

  // Créneaux horaires
  const morningRange = isExtendedMorning
    ? DEFAULT_TIME_SLOTS.morning.extended
    : DEFAULT_TIME_SLOTS.morning.standard
  
  // Pour les créneaux partiels, utiliser le créneau spécifié dans availableSlots
  // Sinon, utiliser le créneau standard ou étendu selon la date
  let afternoonRange = isExtendedMorning
    ? DEFAULT_TIME_SLOTS.afternoon.extended
    : DEFAULT_TIME_SLOTS.afternoon.standard
  
  // Si c'est une date avec après-midi étendu et pas de créneau partiel spécifique
  if (isExtendedAfternoon && !partialSlot) {
    afternoonRange = '13:00–17:00'
  }

  // État de disponibilité
  const availabilityState = useMemo(() => {
    if (!iso) return 'none'
    if (partialSlot) return 'partial'
    if (isMorningBlocked && isAfternoonBlocked) return 'unavailable'
    if (isMorningBlocked || isAfternoonBlocked) return 'partial'
    return 'full'
  }, [iso, partialSlot, isMorningBlocked, isAfternoonBlocked])

  return {
    iso,
    partialSlot,
    isExtendedMorning,
    isMorningBlocked,
    isAfternoonBlocked,
    morningRange,
    afternoonRange,
    availabilityState,
    blockedMorningSet,
    blockedAfternoonSet
  }
}





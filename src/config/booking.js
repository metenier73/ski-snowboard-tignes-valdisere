/**
 * Configuration pour le système de réservation
 * Contient les créneaux spéciaux, dates étendues et autres règles de disponibilité
 */

// Dates avec créneaux partiels spéciaux (ne pas traiter comme complètement bloquées)
export const PARTIAL_SLOT_DATES = new Map([
  [
    '2025-12-01',
    {
      blocked: '09:00–12:30',
      availableSlots: [
        { label: '12:30–13:00', range: '12:30–13:00' },
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-02',
    {
      blocked: '09:00–11:00',
      availableSlots: [
        { label: 'Matin (11:00–13:00)', range: '11:00–13:00' },
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-04',
    {
      blocked: '11:00–13:00',
      availableSlots: [
        { label: 'Matin (09:00–11:00)', range: '09:00–11:00' },
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-08',
    {
      blocked: '11:00–13:00 et 14:00–16:00',
      availableSlots: [
        { label: 'Matin (09:00–11:00)', range: '09:00–11:00' },
        { label: 'Après-midi (13:00–14:00)', range: '13:00–14:00' }
      ]
    }
  ],
  [
    '2025-12-13',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-21',
    {
      blocked: '09:00–12:00',
      availableSlots: [
        { label: 'Midi et après-midi', range: '12:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-22',
    {
      blocked: '09:00–12:00',
      availableSlots: [
        { label: 'Midi et après-midi', range: '12:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-23',
    {
      blocked: '09:00–14:00',
      availableSlots: [
        { label: 'Après-midi', range: '14:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-06',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-07',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-08',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-10',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-13',
    {
      blocked: '12:00–14:00',
      availableSlots: [
        { label: 'Matin (09:00–12:00)', range: '09:00–12:00' },
        { label: 'Après-midi (14:00–17:00)', range: '14:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-01',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-02-02',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-02-03',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-02-15',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-16',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-17',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-18',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-19',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ],
  [
    '2026-02-20',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
      ]
    }
  ]
]);

// Dates dont le matin s'étend exceptionnellement jusqu'à 14:00 (au lieu de 13:00)
// et l'après-midi commence à 14:00 et se termine à 17:00
export const EXTENDED_MORNING_DATES = new Set([
  '2026-01-26',
  '2026-01-27',
  '2026-01-28',
  '2026-01-29',
  '2026-01-30'
]);

// Dates avec après-midi étendu jusqu'à 17:00 (au lieu de 16:30)
export const EXTENDED_AFTERNOON_DATES = new Set([
  '2026-01-13',
  '2026-02-15',
  '2026-02-16',
  '2026-02-17',
  '2026-02-18',
  '2026-02-19',
  '2026-02-20'
]);

// Créneaux horaires par défaut
export const DEFAULT_TIME_SLOTS = {
  morning: {
    standard: '09:00–13:00',
    extended: '09:00–14:00'
  },
  afternoon: {
    standard: '13:00–16:30',
    extended: '14:00–17:00'
  }
};

// Configuration du calendrier
export const CALENDAR_CONFIG = {
  defaultMonth: new Date(2025, 11, 10), // Décembre 2025
  showOutsideDays: true
};

// Classes CSS pour les modificateurs de dates
export const DATE_MODIFIER_CLASSES = {
  unavailable: 'outline outline-2 outline-red-400 bg-red-50 text-red-900',
  partial: 'outline outline-2 outline-amber-400 bg-amber-50 text-amber-900',
  full: 'outline outline-2 outline-emerald-400 bg-emerald-50 text-emerald-900'
};





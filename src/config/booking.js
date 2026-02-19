/**
 * Configuration pour le système de réservation
 * Contient les créneaux spéciaux, dates étendues et autres règles de disponibilité
 */

// Dates avec créneaux partiels spéciaux (ne pas traiter comme complètement bloquées)
export const PARTIAL_SLOT_DATES = new Map([
  // Décembre 2025
  [
    '2025-12-01',
    {
      blocked: '09:00–12:30',
      availableSlots: [
        { label: '12:30–16:30', range: '12:30–16:30' }
      ]
    }
  ],
  [
    '2025-12-02',
    {
      blocked: '09:00–11:00',
      availableSlots: [
        { label: '11:00–16:30', range: '11:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-04',
    {
      blocked: '11:00–13:00',
      availableSlots: [
        { label: 'Matin (09:00–11:00)', range: '09:00–11:00' },
        { label: 'Après-midi (13:00–16:30)', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2025-12-08',
    {
      blocked: '11:00–13:00 et 14:00–16:00',
      availableSlots: [
        { label: 'Matin (09:00–11:00)', range: '09:00–11:00' },
        { label: 'Midi (13:00–14:00)', range: '13:00–14:00' },
        { label: 'Fin journée (16:00–16:30)', range: '16:00–16:30' }
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
  // Janvier 2026
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
    '2026-01-09',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–17:00' }
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
      blocked: '09:00–14:00',
      availableSlots: [
        { label: 'Après-midi', range: '14:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-14',
    {
      blocked: '10:30–13:30',
      availableSlots: [
        { label: 'Matin (09:00–10:30)', range: '09:00–10:30' },
        { label: 'Après-midi (13:30–16:30)', range: '13:30–16:30' }
      ]
    }
  ],
  [
    '2026-01-15',
    {
      blocked: '10:30–13:30',
      availableSlots: [
        { label: 'Matin (09:00–10:30)', range: '09:00–10:30' },
        { label: 'Après-midi (13:30–16:30)', range: '13:30–16:30' }
      ]
    }
  ],
  [
    '2026-01-16',
    {
      blocked: '10:30–16:30',
      availableSlots: [
        { label: 'Matin (09:00–10:30)', range: '09:00–10:30' }
      ]
    }
  ],
  [
    '2026-01-18',
    {
      blocked: '09:00–12:00 et 16:30–18:00',
      availableSlots: [
        { label: 'Midi et après-midi', range: '12:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-19',
    {
      blocked: '09:00–12:00 et 13:00–16:30',
      availableSlots: [
        { label: 'Midi', range: '12:00–13:00' }
      ]
    }
  ],
  [
    '2026-01-20',
    {
      blocked: '09:00–12:00',
      availableSlots: [
        { label: 'Midi et après-midi', range: '12:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-21',
    {
      blocked: '09:00–12:00',
      availableSlots: [
        { label: 'Midi et après-midi', range: '12:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-22',
    {
      blocked: '09:00–13:00 et 13:30–16:30',
      availableSlots: [
        { label: 'Midi (13:00–13:30)', range: '13:00–13:30' }
      ]
    }
  ],
  [
    '2026-01-23',
    {
      blocked: '09:00–13:00 et 13:30–16:30',
      availableSlots: [
        { label: 'Midi (13:00–13:30)', range: '13:00–13:30' }
      ]
    }
  ],
  [
    '2026-01-25',
    {
      blocked: '13:00–16:30',
      availableSlots: [
        { label: 'Matin', range: '09:00–13:00' }
      ]
    }
  ],
  [
    '2026-01-27',
    {
      blocked: '09:00–14:00',
      availableSlots: [
        { label: 'Après-midi', range: '14:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-28',
    {
      blocked: '09:00–14:00',
      availableSlots: [
        { label: 'Après-midi', range: '14:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-29',
    {
      blocked: '09:00–14:00',
      availableSlots: [
        { label: 'Après-midi', range: '14:00–16:30' }
      ]
    }
  ],
  [
    '2026-01-31',
    {
      blocked: '09:00–12:15',
      availableSlots: [
        { label: 'Après-midi', range: '12:15–16:30' }
      ]
    }
  ],
  // Février 2026
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
    '2026-02-04',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-02-05',
    {
      blocked: '09:00–13:30',
      availableSlots: [
        { label: 'Fin journée', range: '13:30–16:30' }
      ]
    }
  ],
  [
    '2026-02-10',
    {
      blocked: '09:00–13:30',
      availableSlots: [
        { label: 'Fin journée', range: '13:30–16:30' }
      ]
    }
  ],
  [
    '2026-02-14',
    {
      blocked: '13:00–16:30',
      availableSlots: [
        { label: 'Matin', range: '09:00–13:00' }
      ]
    }
  ],
  [
    '2026-02-21',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  // Mars 2026
  [
    '2026-03-01',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  // Mars 2026
  [
    '2026-03-29',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-03-30',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-03-31',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  // Avril 2026
  [
    '2026-04-01',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-04-02',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ],
  [
    '2026-04-03',
    {
      blocked: '09:00–13:00',
      availableSlots: [
        { label: 'Après-midi', range: '13:00–16:30' }
      ]
    }
  ]
]);

// Dates complètement disponibles
export const FULLY_AVAILABLE_DATES = new Set([
  '2025-12-03', '2025-12-05', '2025-12-06', '2025-12-07', 
  '2025-12-09', '2025-12-10', '2025-12-11', '2025-12-12', '2025-12-27',
  '2026-01-11', '2026-01-17', '2026-01-24',
  // Février 2026 - journées complètes
  '2026-02-06', '2026-02-07', '2026-02-08', '2026-02-11', 
  '2026-02-12', '2026-02-13'
]);

// Dates complètement bloquées
export const FULLY_BLOCKED_DATES = new Set([
  // Décembre 2025
  '2025-12-14', '2025-12-15', '2025-12-16', '2025-12-17', '2025-12-18', '2025-12-19',
  '2025-12-24', '2025-12-25', '2025-12-26', '2025-12-28', '2025-12-29', '2025-12-30', '2025-12-31',
  '2026-01-01', '2026-01-02', '2026-01-04', '2026-01-05', '2026-01-12',
  // Février 2026 - journées complètement bloquées
  '2026-02-09', '2026-02-15', '2026-02-16', '2026-02-17', '2026-02-18', '2026-02-19', '2026-02-20'
]);

// Dates dont le matin s'étend exceptionnellement jusqu'à 14:00 (au lieu de 13:00)
export const EXTENDED_MORNING_DATES = new Set([
  '2026-01-26', '2026-01-27', '2026-01-28', '2026-01-29', '2026-01-30'
]);

// Dates avec après-midi étendu jusqu'à 17:00 (au lieu de 16:30)
export const EXTENDED_AFTERNOON_DATES = new Set([
  '2026-01-09', '2026-01-13', '2026-02-21'
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





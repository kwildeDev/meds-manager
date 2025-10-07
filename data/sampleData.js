export const medications = [
  {
    id: '1',
    name: 'Lisinopril',
    active: true,
    reminders: [
      { time: '08:00', takenToday: false, notes: 'Take with food' },
      { time: '20:00', takenToday: false, notes: 'Take with water' }
    ],
    prescription: {
      dosesAvailable: 3,
      lowThreshold: 5,
      orderedDate: '2025-10-01',
      collectionDue: '2025-10-03',
      collected: false
    }
  },
  {
    id: '2',
    name: 'Vitamin D',
    active: true,
    reminders: [
      { time: '09:00', takenToday: false, notes: 'Take with meal' }
    ],
    prescription: {
      dosesAvailable: 11,
      lowThreshold: 10,
    }
  }
];

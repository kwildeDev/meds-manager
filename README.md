# Meds Manager

I am working on a mobile app using React Native in Expo Snack to help me remember to take my medications and make sure I order my repeats on time.

Currently, I am looking into what database solution would be best, as I had hoped to use MongoDB, but it will not be possible to get that working with Expo Snack.

## App Features / Layout

### Home Screen

- List of active medications
    - Show next dose time, status (taken/not taken), remaining tablets
    - Quick buttons: “Mark as Taken,” “Edit Med,” “Add Med”

### Medication Detail

- Edit name, dosage, reminders, times
- View reminder history
- Manage prescription info (tablets, threshold, etc.)

### Reminder Notifications

- Daily reminders pop as push notifications at set times.
- Marking as taken removes the alert until the next scheduled time.
- If a dose is missed, the alert disappears when the next one is due.

### Prescription Management

- When tablets ≤ threshold → notification: “Order new prescription?”
- Mark order as done → record ordered date
- After preset days → reminder: “Check if prescription is ready to collect”
- Mark collected → resets tablets count, ready for next cycle


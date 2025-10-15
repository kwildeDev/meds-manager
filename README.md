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

## Mobile Views

### Main Viewing Screens:

<table>
    <tr>
        <td align="center">
            <b>Medications Screen</b>
            <br><br>
            <img alt="Medications Screen" src="https://github.com/user-attachments/assets/a1f90ce2-e78c-4a3f-ba32-c75aada7ad2c" />
        </td>
        <td align="center">
            <b>Prescriptions Screen</b>
            <br><br>
            <img alt="Prescriptions Screen" src="https://github.com/user-attachments/assets/8e9f4b33-0e42-4350-9888-1707ae29453e" />
        </td>
        <td align="center">
            <b>Medication Detail Screen</b>
            <br><br>
            <img alt="Medication Detail Screen" src="https://github.com/user-attachments/assets/e12de58e-e99b-4a1d-bdaf-dda241100657" />
        </td>
    </tr>
</table>

### Adding A New Medication:

<table>
    <tr>
        <td align="center">
            <b>Add New Medication Screen</b>
            <br><br>
            <img alt="Add New Medication Screen" src="https://github.com/user-attachments/assets/62801d28-8659-4712-8aee-985162c57ef1" />
        </td>
        <td align="center">
            <b>Time Picker - Digital Format</b>
            <br><br>
            <img alt="Time Picker in Digital Format" src="https://github.com/user-attachments/assets/c0bc7ca5-95a2-4324-965a-e7d139d7705c" />
        </td>
        <td align="center">
            <b>Time Picker - Analogue Format</b>
            <br><br>
            <img alt="Time Picker in Analogue Format" src="https://github.com/user-attachments/assets/b842f238-fb82-422f-a623-85c4cdc50961" />
        </td>
        <td align="center">
            <b>Add Additional Reminders</b>
            <br><br>
            <img alt="Add Additional Reminders" src="https://github.com/user-attachments/assets/48d7de63-b073-444f-8b04-1184d014184e" />
        </td>
    </tr>
</table>






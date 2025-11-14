import * as Notifications from 'expo-notifications';

/**
 * Schedule a local notification for a medication reminder using the reliable daily repeat trigger.
 * @param {string} medName - Name of the medication
 * @param {string} message - Notification body text
 * @param {number} hours - 0-23
 * @param {number} minutes - 0-59
 * @returns {string} notificationId
 */

export async function scheduleMedicationNotification(
  medicationName,
  message,
  hours,
  minutes
) {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: medicationName,
        body: message,
        sound: true,
        priority: Notifications.AndroidNotificationPriority.HIGH,
        data: { screen: 'MedList', medName: medicationName },
      },
      trigger: {
        hour: hours,
        minute: minutes,
        repeats: true,
      },
    });

    console.log(
      `✅ Scheduled daily notification for ${medicationName} at ${hours
        .toString()
        .padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')} (${notificationId})`
    );
    return notificationId;
  } catch (error) {
    console.error('Error scheduling medication notification:', error);
    throw error;
  }
}

/**
 * Cancel a scheduled notification
 * @param {string} notificationId
 */
export async function cancelNotification(notificationId) {
  if (notificationId) {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  }
}

/**
 * Cancel all notifications for a medication (if it has multiple)
 * @param {array} notificationIds - Array of notification IDs
 */
export async function cancelAllNotifications(notificationIds) {
  if (Array.isArray(notificationIds)) {
    for (const id of notificationIds) {
      await Notifications.cancelScheduledNotificationAsync(id);
    }
  }
}

/**
 * Get all scheduled notifications (for debugging)
 */
export async function getAllScheduledNotifications() {
  return await Notifications.getAllScheduledNotificationsAsync();
}

/**
 * Reschedule a notification for the next occurrence
 * Call this after a notification fires to set up the next day's reminder
 */
export async function rescheduleForNextDay(
  notificationId,
  medicationName,
  message,
  hours,
  minutes
) {
  await cancelNotification(notificationId);

  const newId = await scheduleMedicationNotification(
    medicationName,
    message,
    hours,
    minutes
  );

  return newId;
}

/**
 * Schedule a midnight notification to reset "takenToday" flags
 * This should be called once when the app starts
 */
export async function scheduleMidnightReset() {
  try {
    const scheduled = await Notifications.getAllScheduledNotificationsAsync();
    const existingReset = scheduled.find(
      (n) => n.content.data.type === 'midnight_reset'
    );
    if (existingReset) {
      await Notifications.cancelScheduledNotificationAsync(
        existingReset.identifier
      );
    }

    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Medication Tracker',
        body: 'Daily reset processing...',
        shouldShowAlert: false,
        data: { type: 'midnight_reset' },
      },
      trigger: {
        hour: 0,
        minute: 0,
        repeats: true,
      },
    });

    console.log('Scheduled DAILY midnight reset:', notificationId);
    return notificationId;
  } catch (error) {
    console.error('Error scheduling midnight reset:', error);
    throw error;
  }
}

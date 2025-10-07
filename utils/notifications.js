import * as Notifications from 'expo-notifications';

export async function scheduleDailyNotification(medication, time) {
  const [hour, minute] = time.split(':').map(Number);

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Time for ${medication.name}`,
      body: 'Mark as taken in the app',
    },
    trigger: {
      hour,
      minute,
      repeats: true,
    },
  });
}

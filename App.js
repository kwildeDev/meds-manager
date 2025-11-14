import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState, useRef } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MedList from './components/MedList';
import MedDetail from './components/MedDetail';
import Prescription from './components/Prescription';
import MedForm from './components/MedForm';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
import { loadData, saveData } from './utils/storage';
import {
  scheduleMedicationNotification,
  scheduleMidnightReset,
} from './utils/notifications';

const Stack = createNativeStackNavigator();

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
  materialLight: MD3LightTheme,
  materialDark: MD3DarkTheme,
});

const CombinedDefaultTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: '#6200EE',
    onPrimary: '#FFFFFF',
    secondary: '#03DAC6',
    onSecondary: '#000000',
    secondaryVariant: '#018786',
    primaryVariant: '#3700B3',
    surface: '#FFFFFF',
    error: '#C51162',
    surfaceDisabled: '#E0E0E0',
    primaryContainer: '#6200EE',
    onPrimaryContainer: '#FFFFFF',
  },
  fonts: MD3LightTheme.fonts,
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      setExpoPushToken(token);
      if (token) {
        savePushToken(token);
      }
      try {
        await scheduleMidnightReset();
        console.log('✅ Midnight reset scheduled');
      } catch (error) {
        console.error('Failed to schedule midnight reset:', error);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        const data = notification.request.content.data;
        const notificationId = notification.request.identifier;        
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener(
        async (response) => {
          console.log('👆 User tapped notification:', response);
          const data = response.notification.request.content.data;
        }
      );

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MedList"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="MedList" component={MedList} />
            <Stack.Screen name="Prescription" component={Prescription} />
            <Stack.Screen name="MedForm" component={MedForm} />
            <Stack.Screen name="MedDetail" component={MedDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Device.isDevice) {
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }

    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log('Push token:', token);
  } else {
    alert('Must use a physical device for notifications!');
    console.warn(
      'Cannot get push token or schedule notifications in a simulator.'
    );
  }
  return token;
}

async function savePushToken(token) {
  try {
    await AsyncStorage.setItem('expoPushToken', token);
    console.log('Push token saved locally:', token);
  } catch (error) {
    console.error('Error saving push token:', error);
  }
}

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedList from './components/MedList';
import MedDetail from './components/MedDetail';
import Prescription from './components/Prescription';
import MedForm from './components/MedForm';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { MD3LightTheme, MD3DarkTheme, Provider as PaperProvider, adaptNavigationTheme } from 'react-native-paper';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';

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
    secondaryVariant: "#018786",
    primaryVariant: "#3700B3",
    surface: '#FFFFFF',
    error: '#C51162',
    surfaceDisabled: '#E0E0E0',
    primaryContainer: '#6200EE',
    onPrimaryContainer: '#FFFFFF',
  },
  fonts: MD3LightTheme.fonts,
};

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider theme={CombinedDefaultTheme}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MedList"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="MedList"
              component={MedList}
            />
            <Stack.Screen
              name="Prescription"
              component={Prescription}
            />
            <Stack.Screen
              name="MedForm"
              component={MedForm}
            />
            <Stack.Screen
              name="MedDetail"
              component={MedDetail}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

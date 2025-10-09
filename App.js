import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MedList from './components/MedList';
import MedDetail from './components/MedDetail';
import Prescription from './components/Prescription';
import MedForm from './components/MedForm';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';

const Stack = createNativeStackNavigator();

// Helper to wrap components and show fallback if undefined
const checkComponent = (Comp, name) =>
  Comp
    ? Comp
    : () => (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>{name} is undefined!</Text>
        </View>
      );

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="MedList"
            screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="MedList"
              component={checkComponent(MedList, 'MedList')}
            />
            <Stack.Screen
              name="Prescription"
              component={checkComponent(Prescription, 'Prescription')}
            />
            <Stack.Screen
              name="MedForm"
              component={checkComponent(MedForm, 'MedForm')}
            />
            <Stack.Screen
              name="MedDetail"
              component={checkComponent(MedDetail, 'MedDetail')}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

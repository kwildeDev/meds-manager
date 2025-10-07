import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import MedList from './components/MedList';
import Prescription from './components/Prescription';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [screen, setScreen] = useState('meds');

  const styles = StyleSheet.create({
    container: {
      marginTop: 50,
      //flex: 1,
    },
    layoutContainer: {
      
      
    },
    buttonView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      margin: 10,
    },
    titleText: {
      alignSelf: 'center',
      fontSize: 24,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>

        <View>
        <Text style={styles.titleText}>Meds Manager</Text>
        </View>
        
        <View style={styles.buttonView}>  
          <Button title="Medications" onPress={() => setScreen('meds')} />
          <Button title="Prescriptions" onPress={() => setScreen('pres')} />
        </View>
        
        <ScrollView style={styles.layoutContainer}>
          {screen === 'meds' ? <MedList /> : <Prescription />}
        </ScrollView>
        
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

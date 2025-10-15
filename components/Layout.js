import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { Appbar, SegmentedButtons, useTheme } from 'react-native-paper';
import DownloadJSON from './DownloadJSON';

export default function Layout({ children, navigation, route }) {
  const [value, setValue] = useState('');
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    buttonView: {
      padding: 10,
      margin: 10,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header theme={{ colors: { surface: '#6200EE', onSurface: '#FFFFFF'} }}>
        <Appbar.BackAction 
          onPress={() => {navigation.goBack();}} 
        />
        <Appbar.Content title="Meds Manager" theme={{ colors: { surface: '#6200EE', onSurface: '#FFFFFF'} }}/>
        <Appbar.Action
          icon="plus"
          color={colors.onPrimary}
          onPress={() => navigation.navigate('MedForm')}
        />
        <Appbar.Action
          icon="download"
          color={colors.onPrimary}
          onPress={() => navigation.navigate('DownloadJSON')}
        />
      </Appbar.Header>

      <View style={styles.buttonView}>
        <SegmentedButtons
          value={value}
          onValueChange={(newValue) => {
            setValue(newValue);
            if (newValue === 'medlist' && route.name !== 'MedList') {
              navigation.navigate('MedList');
            } else if (
              newValue === 'prescription' &&
              route.name !== 'Prescription'
            ) {
              navigation.navigate('Prescription');
            }
          }}
          buttons={[
            {
              value: 'medlist',
              label: 'Medications',
              checkedColor: colors.primary,
              icon: 'alarm',
            },
            {
              value: 'prescription',
              label: 'Prescriptions',
              checkedColor: colors.primary,
              icon: 'text-box-outline',
            },
          ]}
        />
      </View>

      <ScrollView style={styles.layoutContainer}>{children}</ScrollView>
    </SafeAreaView>
  );
}

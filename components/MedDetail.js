import React from 'react';
import Layout from './Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Button } from 'react-native';

export default function MedDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const med = route.params?.med;

  if (!med) {
    return (
      <Layout navigation={navigation} route={route}>
        <Text style={{ fontSize: 18, color: 'red' }}>
          No medication data provided.
        </Text>
      </Layout>
    );
  }
  
  return (
    <Layout navigation={navigation} route={route}>
      <Text style={{ fontSize: 20 }}>{med.name}</Text>
      <Text>Reminders: {med.reminders[0].time}</Text>
      <Text>Tablets left: {med.prescription.dosesAvailable}</Text>
      <Button title="Mark Taken" onPress={() => { /* update db */ }} />
    </Layout>
  );
}

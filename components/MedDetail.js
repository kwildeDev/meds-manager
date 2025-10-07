// MedDetail.js (simplified)
import React from 'react';
import { View, Text, Button } from 'react-native';

export default function MedDetail({ route, navigation }) {
  const { med } = route.params; // med passed in from navigation

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>{med.name}</Text>
      <Text>Reminders: {med.times.join(", ")}</Text>
      <Text>Tablets left: {med.stock}</Text>
      <Button title="Mark Taken" onPress={() => { /* update db */ }} />
    </View>
  );
}

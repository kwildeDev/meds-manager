import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, Alert, StyleSheet } from 'react-native';
import { loadData, saveData } from '../utils/storage';

export default function Prescription() {
  const [meds, setMeds] = useState([]);

  useEffect(() => {
    async function loadMeds() {
      const stored = await loadData('medications');
      if (stored) setMeds(stored);
    }
    loadMeds();
  }, []);

  const updatePrescription = async (medId, field, value) => {
    const updated = meds.map(m => {
      if (m.id === medId) {
        m.prescription[field] = value;
      }
      return m;
    });
    setMeds(updated);
    await saveData('medications', updated);
  };

  const checkLowStock = (med) => {
    if (med.prescription.tabletsRemaining <= med.prescription.lowThreshold) {
      return true;
      //Alert.alert(`${med.name} is low`, 'Time to order a new prescription!');
    }
  };

  const checkIfOrdered = (med) => {
    return typeof(med.prescription.collectionDue) === 'string'
  };

  const styles = StyleSheet.create({
    medsCard: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 5,
    },
  });

  return (
    <View>
      <FlatList
        data={meds.filter(m => m.prescription)}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          
          <View style={styles.medsCard}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            <Text>Tablets Remaining: {item.prescription.tabletsRemaining}</Text>
            <Text>Low Threshold: {item.prescription.lowThreshold}</Text>
            <Text>Need to Order: {checkLowStock && !item.prescription.collectionDue ? 'Yes' : 'No'}</Text>
            <Text>Need to Collect: {item.prescription.collectionDue ? 'Yes' : 'No'}</Text>
            <Text>Collection Due: {item.prescription.collectionDue || '-'}</Text>
            <View style={styles.buttonRow}>
              <Button
                title="Mark Ordered"
                onPress={() => {
                  updatePrescription(item.id, 'orderDone', true);
                  updatePrescription(item.id, 'collectionDue', new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]);
                }}
                disabled={!!item.prescription.collectionDue}
              />
              <Button
                title="Mark Collected"
                onPress={() => {
                  updatePrescription(item.id, 'collected', true);
                  updatePrescription(item.id, 'collectionDue', new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]);
                }}
                disabled={!item.prescription.collectionDue}
              />
            </View>
          </View>
        )}
      />
    </View>
  );
}

import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, Alert, StyleSheet } from 'react-native';
import { Card, Text, Button, Divider } from 'react-native-paper';
import { loadData, saveData } from '../utils/storage';

export default function Prescription() {
  const [meds, setMeds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

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

  return (
    <Layout navigation={navigation} route={route}>
      <FlatList
        data={meds.filter(m => m.prescription)}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          
          <Card mode="outlined" style={{ margin: 10 }}>
            <Card.Title title={item.name} />
            <Card.Content>
            <Text>Tablets Remaining: {item.prescription.dosesAvailable}</Text>
            <Text>Low Threshold: {item.prescription.lowThreshold}</Text>
            <Text>Need to Order: {checkLowStock(item) && !item.prescription.collectionDue ? 'Yes' : 'No'}</Text>
            <Text>Need to Collect: {item.prescription.collectionDue ? 'Yes' : 'No'}</Text>
            <Text>Collection Due: {item.prescription.collectionDue || '-'}</Text>
            </Card.Content>
            <Card.Actions style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={() => {
                  updatePrescription(item.id, 'orderDone', true);
                  updatePrescription(item.id, 'collectionDue', new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]);
                }}
                disabled={!!item.prescription.collectionDue}
              >
              Mark Ordered
              </Button>
              <Button
                mode="contained"
                onPress={() => {
                  updatePrescription(item.id, 'collected', true);
                  updatePrescription(item.id, 'collectionDue', new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0]);
                }}
                disabled={!item.prescription.collectionDue}
              >
              Mark Collected
              </Button>
            
            </Card.Actions>
          </Card>
        )}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
    buttonRow: {
      justifyContent: "left",
      marginTop: 5,
    },
  });

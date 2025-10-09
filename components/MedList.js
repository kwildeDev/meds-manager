import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Layout from './Layout';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Card, Button, Text, FAB } from 'react-native-paper';
import { medications as sampleData } from '../data/sampleData';
import { saveData, loadData } from '../utils/storage';

export default function MedList() {
  const [meds, setMeds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    async function loadMeds() {
      const stored = await loadData('medications');
      if (stored) setMeds(stored);
      else {
        setMeds(sampleData);
        saveData('medications', sampleData);
      }
    }
    loadMeds();
  }, []);

  const markTaken = async (medId, reminderIndex) => {
    const updated = meds.map((m) => {
      if (m.id === medId) {
        m.reminders[reminderIndex].takenToday = true;
      }
      return m;
    });
    setMeds(updated);
    await saveData('medications', updated);
  };

  const downloadJSON = async () => {
    const data = await loadData('medications');
    if (!data) {
      alert('No data to export.');
      return;
    }

    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'medications.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  //const viewMedDetail =

  const styles = StyleSheet.create({
    medsCard: {
      margin: 10,
      padding: 10,
      borderWidth: 1,
    },
    doseRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 10,
      marginBottom: 10,
    },
  });

  return (
    <Layout navigation={navigation} route={route}>
      <FlatList
        data={meds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.medsCard}>
              <Text style={{ fontSize: 18 }}>{item.name}</Text>
            {item.reminders.map((r, i) => (
              <View key={i} style={styles.doseRow}>
                <Text>
                  {r.time} - {r.takenToday ? '✅ Taken' : '❌ Not taken'}
                </Text>
                {!r.takenToday && (
                  <Button
                    title="Mark Taken"
                    onPress={() => markTaken(item.id, i)}
                  />
                )}
              </View>
            ))}
            <TouchableOpacity
              onPress={() => navigation.navigate('MedDetail', { med: item })}>
              <Text style={{ color: '#007AFF', marginTop: 10 }}>
                View Details
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Download Medications JSON" onPress={downloadJSON} />
    </Layout>
  );
}

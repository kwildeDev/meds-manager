import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { medications as sampleData } from '../data/sampleData';
import { saveData, loadData } from '../utils/storage';

export default function MedList() {
  const [meds, setMeds] = useState([]);

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
    const updated = meds.map(m => {
      if (m.id === medId) {
        m.reminders[reminderIndex].takenToday = true;
      }
      return m;
    });
    setMeds(updated);
    await saveData('medications', updated);
  };

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
    <View>
      <FlatList
        data={meds}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.medsCard}>
            <Text style={{ fontSize: 18 }}>{item.name}</Text>
            {item.reminders.map((r, i) => (
              <View key={i} style={styles.doseRow}>
                <Text>{r.time} - {r.takenToday ? '✅ Taken' : '❌ Not taken'}</Text>
                {!r.takenToday && <Button title="Mark Taken" onPress={() => markTaken(item.id, i)} />}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
}

import React, { useEffect, useState, useCallback } from 'react';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import Layout from './Layout';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Button, Text, IconButton, useTheme } from 'react-native-paper';
import { medications as sampleData } from '../data/sampleData';
import { saveData, loadData } from '../utils/storage';

export default function MedList() {
  const [meds, setMeds] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const { colors } = useTheme();

  useFocusEffect(
    useCallback(() => {
      const fetchMeds = async () => {
        const data = await loadData('medications');
        setMeds(data || []);
      };
      fetchMeds();
    }, [])
  );

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

  return (
    <Layout navigation={navigation} route={route}>
      <FlatList
        data={meds}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card mode="outlined" style={{ margin: 10 }}>
            <Card.Title title={item.name} />
            <Card.Content>
              {item.reminders.map((r, i) => (
                <View key={i} style={styles.doseRow}>
                  <Text>
                    {r.time} - {r.takenToday ? '✅ Taken' : '❌ Not taken'}
                  </Text>
                  {!r.takenToday && (
                    <Button
                      mode="outlined"
                      textColor={colors.secondaryVariant}
                      onPress={() => markTaken(item.id, i)}>
                      Mark Taken
                    </Button>
                  )}
                </View>
              ))}
            </Card.Content>
            <Card.Actions>
              <Button
                mode="contained"
                onPress={() => navigation.navigate('MedDetail', { med: item })}>
                View Details
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  doseRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});

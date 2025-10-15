import React from 'react';
import Layout from './Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList } from 'react-native';
import { Text, Card, Button, Divider, List, useTheme } from 'react-native-paper';
import { saveData, loadData } from '../utils/storage';

export default function MedDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const med = route.params?.med;
  const { colors } = useTheme();

  const handleDelete = async (m) => {
    const existingMeds = await loadData('medications');
    const updatedMeds = existingMeds.filter((m) => m.id !== med.id);
    await saveData('medications', updatedMeds);
    navigation.goBack();
  };

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
      <Card mode="outlined" style={{ margin: 10 }}>
        <Card.Title title={med.name} />
        <Card.Content>
          <List.Section>
            <List.Subheader style={{ marginLeft: -16, fontSize: 16 }}>Reminders</List.Subheader>
            <Divider theme={{ colors: { outlineVariant: '#9E9E9E' } }} />
            <FlatList
              data={med.reminders}
              keyExtractor={(_, i) => i.toString()}
              renderItem={({ item }) => (
                <List.Item
                  title={item.time}
                  right={() => (
                    <Text style={{ alignSelf: 'center' }}>
                      {item.notes || ''}
                    </Text>
                  )}
                  left={props => (
                    <List.Icon 
                      {...props}
                      icon="alarm"
                      color={colors.primary}
                      style={{ marginTop: -4 }}
                    />
                  )}
                />
              )}
            />
            <Divider theme={{ colors: { outlineVariant: '#9E9E9E' } }} />
            <List.Item
              title="Tablets left"
              right={() => (
                <Text style={{ alignSelf: 'center' }}>
                  {med.prescription.dosesAvailable}
                </Text>
              )}
            />
            <Divider theme={{ colors: { outlineVariant: '#9E9E9E' } }} />
            <List.Item
              title="Low threshold"
              right={() => (
                <Text style={{ alignSelf: 'center' }}>
                  {med.prescription.lowThreshold}
                </Text>
              )}
            />
          </List.Section>
        </Card.Content>
        <Card.Actions>
          <Button
            icon="pen"
            mode="contained"
            onPress={() => {
              /* display editing screen */
            }}>
            Edit
          </Button>
          <Button
            icon="delete"
            mode="outlined"
            textColor={colors.secondaryVariant}
            onPress={() => handleDelete(med)}>
            Delete
          </Button>
        </Card.Actions>
      </Card>
    </Layout>
  );
}

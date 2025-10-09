import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { saveData, loadData } from '../utils/storage';

export default function MedForm() {
  const navigation = useNavigation();
  const route = useRoute();

  const onSubmit = async (formData) => {
    const existing = await loadData('medications');
    const meds = existing || [];

    const newMed = {
      id: meds.length + 1,
      name: formData.name,
      active: true,
      reminders: [
        {
          time: '09:00', // static for now, can be dynamic later
          takenToday: false,
          notes: 'Take with meal',
        },
      ],
      prescription: {
        dosesAvailable: parseInt(formData.stock),
        lowThreshold: parseInt(formData.threshold),
      },
    };

    const updated = [...meds, newMed];
    await saveData('medications', updated);

    alert('Medication saved.');
    
  };

  const {
    control,
    handleSubmit,
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      name: '',
      stock: '',
      threshold: '',
    },
  });

  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      width: '100%',
      textAlign: 'left',
      padding: 10,
      borderRadius: 5,
      marginTop: 10,
      marginBottom: 10,
    },
    errorMessage: {
      color: 'red',
      alignSelf: 'stretch',
      fontSize: 12,
    },
    buttonView: {
      marginTop: 10,
    },
  });

  const placeholderColour = '#888';

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset()
    }
  });

  return (
    <Layout navigation={navigation} route={route}>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Medication name"
            placeholderTextColor={placeholderColour}
            value={value}
            onChangeText={onChange}
          />
        )}
        name="name"
      />
      {errors.name && (
        <Text style={styles.errorMessage}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Doses available"
            placeholderTextColor={placeholderColour}
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
        name="stock"
      />
      {errors.stock && (
        <Text style={styles.errorMessage}>This is required.</Text>
      )}

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Low stock threshold"
            placeholderTextColor={placeholderColour}
            value={value}
            onChangeText={onChange}
            keyboardType="numeric"
          />
        )}
        name="threshold"
      />
      {errors.threshold && (
        <Text style={styles.errorMessage}>This is required.</Text>
      )}

      <View style={styles.buttonView}>
        <Button title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </Layout>
  );
}

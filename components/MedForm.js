import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, TextInput, Text, HelperText } from 'react-native-paper';
import { useForm, FormProvider, Controller } from 'react-hook-form';
import { saveData, loadData } from '../utils/storage';
import AddReminder from './AddReminder';
import {
  scheduleMedicationNotification,
} from '../utils/notifications';

export default function MedForm() {
  const navigation = useNavigation();
  const route = useRoute();

  const methods = useForm({
    defaultValues: {
      name: '',
      stock: '',
      threshold: '',
      reminderTimes: [{ time: null, notes: '' }],
    },
  });

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  const onSubmit = async (formData) => {
    const existing = await loadData('medications');
    const meds = existing || [];

    const reminders = formData.reminderTimes
      .filter((r) => r.time)
      .map((r) => ({
        time: r.time.toLocaleTimeString('en-UK', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
        notes: r.notes,
        takenToday: false,
      }));

    const notificationIds = [];
    for (const reminder of formData.reminderTimes) {
      if (reminder.time) {
        try {
          const hours = reminder.time.getHours();
          const minutes = reminder.time.getMinutes();
          const notificationId = await scheduleMedicationNotification(
            formData.name,
            `Time to take ${formData.name}`,
            hours,
            minutes
          );
          notificationIds.push(notificationId);
          console.log('Scheduled notification:', notificationId);
        } catch (error) {
          console.error('Error scheduling notification:', error);
        }
      }
    }

    const newMed = {
      id: meds.length + 1,
      name: formData.name,
      active: true,
      reminders,
      notificationIds,
      prescription: {
        dosesAvailable: parseInt(formData.stock),
        lowThreshold: parseInt(formData.threshold),
      },
    };

    const updated = [...meds, newMed];
    await saveData('medications', updated);

    alert('Medication saved.');
  };

  return (
    <Layout navigation={navigation} route={route}>
      <FormProvider {...methods}>
        <ScrollView style={styles.formView}>
          <Controller
            control={methods.control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="outlined"
                label="Medication Name"
                placeholder="Medication name"
                value={value}
                onChangeText={onChange}
                error={!!errors.name}
              />
            )}
            name="name"
          />
          <HelperText type="error" visible={!!errors.name}>
            This is required.
          </HelperText>

          <AddReminder />

          <Controller
            control={methods.control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="outlined"
                label="Doses Available"
                placeholder="Number of doses available"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                error={!!errors.stock}
              />
            )}
            name="stock"
          />
          <HelperText type="error" visible={!!errors.stock}>
            This is required.
          </HelperText>

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({
              field: { onChange, onBlur, value },
              fieldState: { error },
            }) => (
              <TextInput
                mode="outlined"
                label="Low Stock Threshold"
                placeholder="Threshold needed for reorder"
                value={value}
                onChangeText={onChange}
                keyboardType="numeric"
                error={!!errors.threshold}
              />
            )}
            name="threshold"
          />
          <HelperText type="error" visible={!!errors.threshold}>
            This is required.
          </HelperText>

          <View>
            <Button mode="contained" onPress={handleSubmit(onSubmit)}>
              Save
            </Button>
          </View>
        </ScrollView>
      </FormProvider>
    </Layout>
  );
}

const styles = StyleSheet.create({
  formView: {
    margin: 10,
  },
});

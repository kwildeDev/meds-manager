import React from 'react';
import { View, ScrollView } from 'react-native';
import {
  Text,
  IconButton,
  HelperText,
  TextInput,
  Divider,
  useTheme,
} from 'react-native-paper';
import { useFormContext, Controller, useFieldArray } from 'react-hook-form';
import TimePicker from './TimePicker';

const MAX_REMINDERS = 6;

const AddReminder = () => {
  const { colors } = useTheme();

  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'reminderTimes',
  });

  const handleAddTime = () => {
    if (fields.length < MAX_REMINDERS) {
      append({ time: null, notes: '' });
    } else {
      alert(`You can only set up to ${MAX_REMINDERS} reminder times.`);
    }
  };

  return (
    <View>
      <Text variant="titleMedium">Schedule Reminder Times</Text>

      <ScrollView>
        {fields.map((item, index) => (
          <View key={item.id}>
            <Divider
              theme={{ colors: { outlineVariant: '#9E9E9E' } }}
              style={{ marginTop: 5, marginBottom: 5 }}
            />
            <Text variant="labelMedium" style={{ marginBottom: 5 }}>
              Time {index + 1}
            </Text>
            <View>
              <View>
                <Controller
                  control={control}
                  name={`reminderTimes.${index}.time`}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <View>
                      <TimePicker
                        value={value}
                        onChange={onChange}
                        error={!!error}
                      />
                    </View>
                  )}
                  error={!!errors.reminderTimes?.[index]?.time}
                />
              </View>
              <HelperText
                type="error"
                visible={!!errors.reminderTimes?.[index]?.time}>
                This is required.
              </HelperText>
              <View>
                <Controller
                  control={control}
                  name={`reminderTimes.${index}.notes`}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <View>
                      <TextInput
                        mode="outlined"
                        label="Note"
                        placeholder="Enter a note if required"
                        value={value}
                        onChangeText={onChange}
                      />
                    </View>
                  )}
                />
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'right' }}>
              {fields.length > 1 && (
                <IconButton
                  mode="contained"
                  iconColor={colors.onSecondary}
                  containerColor={colors.secondary}
                  icon="delete-outline"
                  onPress={() => remove(index)}
                />
              )}
              <IconButton
                mode="contained"
                iconColor={colors.onSecondary}
                containerColor={colors.secondary}
                icon="plus"
                onPress={handleAddTime}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AddReminder;

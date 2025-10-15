import React, { useState } from 'react';
import { View, Pressable } from 'react-native';
import { TextInput, Portal, PaperProvider } from 'react-native-paper';
import { TimePickerModal } from 'react-native-paper-dates';

const TimePicker = ({ value, onChange, error }) => {
  const [open, setOpen] = useState(false);

  const displayTime =
    value instanceof Date
      ? value.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      : 'HH:MM';

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = ({ hours, minutes }) => {
    const selected = new Date();
    selected.setHours(hours);
    selected.setMinutes(minutes);
    onChange(selected);
    handleClose();
  };

  return (
    <View>
      <Pressable onPress={handleOpen}>
        <TextInput
          mode="outlined"
          label="Reminder time"
          value={displayTime}
          placeholder="HH:MM"
          editable={false}
          right={<TextInput.Icon icon="clock-outline" onPress={handleOpen} />}
          outlineColor={error ? '#C51162' : open ? '#6200EE' : undefined}
          outlineStyle={open || error ? { borderWidth: 2 } : undefined}
          theme={
            open || error
              ? {
                  colors: { onSurfaceVariant: error ? '#C51162' : '#6200EE' },
                }
              : undefined
          }
          textColor={error ? '#C51162' : open ? '#6200EE' : undefined}
        />
      </Pressable>
      <Portal>
      <PaperProvider>
        <TimePickerModal
          visible={open}
          onDismiss={handleClose}
          onConfirm={handleConfirm}
          label="Select time"
          cancelLabel="Cancel"
          confirmLabel="OK"
          defaultInputType="keyboard"
          locale="en-GB"
        />
        </PaperProvider>
      </Portal>
    </View>
  );
};

export default TimePicker;

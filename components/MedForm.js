// MedForm.js (simplified)
import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function MedForm({ navigation }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");

  const handleSave = () => {
    // push to MongoDB API
    navigation.goBack();
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="Medication name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        placeholder="Stock count"
        value={stock}
        onChangeText={setStock}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
}

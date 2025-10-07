import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveData(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function loadData(key) {
  const json = await AsyncStorage.getItem(key);
  return json != null ? JSON.parse(json) : null;
}

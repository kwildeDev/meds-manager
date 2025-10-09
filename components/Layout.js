import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';

export default function Layout({ children, navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleText}>Meds Manager</Text>
      </View>

      <View style={styles.buttonView}>
        <Button
          title="Medications"
          onPress={() => navigation.navigate('MedList')}
          disabled={route.name === 'MedList'}
        />
        <Button
          title="Prescriptions"
          onPress={() => navigation.navigate('Prescription')}
          disabled={route.name === 'Prescription'}
        />
        <Button
          title="+"
          onPress={() => navigation.navigate('MedForm')}
          disabled={route.name === 'MedForm'}
        />
      </View>

      <ScrollView style={styles.layoutContainer}>{children}</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  layoutContainer: {},
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    margin: 10,
  },
  titleText: {
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

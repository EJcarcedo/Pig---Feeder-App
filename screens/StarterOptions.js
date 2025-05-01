import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';

const StarterOptions = ({ navigation }) => {
  const [distance1, setDistance1] = useState('Full');
  const [distance2, setDistance2] = useState('Half Full');

  useEffect(() => {
    // Simulate regular data refresh with mock values
    const intervalId = setInterval(() => {
      // You can update this to randomize or cycle values if needed
      setDistance1('Full');
      setDistance2('Half Full');
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // const handlePress = () => {
  //   Alert.alert(
  //     "Confirm Exit",
  //     "Are you sure you want to close the app?",
  //     [
  //       { text: "Cancel", style: "cancel" },
  //       { text: "OK", onPress: () => BackHandler.exitApp() }
  //     ]
  //   );
  // };

  const feeding = () => {
    Alert.alert(
      "Confirm Process",
      "Are you sure you want to feed now?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Dry Feeds", onPress: () => console.log("Dry Feeds activated") },
        { text: "Wet Feeds", onPress: () => console.log("Wet Feeds activated") }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Starter</Text>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={feeding}
      >
        <Text style={styles.buttonText}>Feed Now</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={() => navigation.navigate('Schedule', { previousScreen: 'Starter' })}
      >
        <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity
        accessibilityRole="button"
        style={styles.button}
        onPress={() => navigation.navigate('Type')}
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
      <Text style={styles.sensorData}>Feed Container: {distance1}</Text>
      <Text style={styles.sensorData}>Water Container: {distance2}</Text>
    </View>
  );
};

export default StarterOptions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 5,
    backgroundColor: '#313833',
    width: 336,
    height: 58,
    margin: 10,
  },
  buttonText: {
    fontSize: 24,
    color: '#F5F5F5',
    padding: 15,
    textAlign: 'center',
  },
  sensorData: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
  title:{
    fontSize: 24,
    color: '#000',
    padding: 15,
    textAlign: 'center',
  }
});

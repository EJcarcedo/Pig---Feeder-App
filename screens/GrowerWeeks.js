import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, BackHandler } from 'react-native';

const GrowerWeeks = ({ navigation, route }) => {
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

  const handlePress = () => {
    Alert.alert(
      "Confirm Exit",
      "Are you sure you want to close the app?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => BackHandler.exitApp() }
      ]
    );
  };

  const papap = (source) => {
      console.log(' papap called with:', source);
      Alert.alert("Feeding Started", `Feeding sequence of type ${source || 'Unknown'} started`);
      setTimeout(() => {
        Alert.alert("Feeding Completed", `Feeding sequence of type ${source || 'Unknown'} completed`);
      }, 10000);
  };

 const feeding = (source2) => {
  Alert.alert(
    `Confirm Process Feed For ${source2 || 'Unknown'}`,
    "Are you sure you want to feed now?",
    [
      { text: "Cancel", style: "cancel" },
      { text: "Dry Feeds", onPress: () => papap(`Dry (${source2})`) },
      { text: "Wet Feeds", onPress: () => papap(`Wet (${source2})`) }
    ]
  );
};

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold',marginTop: 10 }}>
        Grower Weeks
      </Text>

      <TouchableOpacity
        style={styles.button1}
        onPress={() => {
        navigation.navigate('Options')}}
      >
      <Text style={styles.buttonText}>back</Text>
      </TouchableOpacity>

         <TouchableOpacity
           accessibilityRole="button"
           style={styles.button}
            onPress={() => feeding('10-13 Weeks')}
         >
           <Text style={styles.buttonText}>10 - 13 Weeks</Text>
         </TouchableOpacity>
      
         <TouchableOpacity
           accessibilityRole="button"
           style={styles.button}
           onPress={() => feeding('13-15 Weeks')}
         >
           <Text style={styles.buttonText}>13 - 15 Weeks</Text>
         </TouchableOpacity>

         <TouchableOpacity
           accessibilityRole="button"
           style={styles.button}
            onPress={() => feeding('16-18 Weeks')}
         >
           <Text style={styles.buttonText}>16 - 18 Weeks</Text>
         </TouchableOpacity>

         <TouchableOpacity
           accessibilityRole="button"
           style={styles.button}
            onPress={() => feeding('19-20 Weeks')}
         >
           <Text style={styles.buttonText}>19 - 20 Weeks</Text>
         </TouchableOpacity>
        <TouchableOpacity
          accessibilityRole="button"
          style={styles.button}
          onPress={() => navigation.navigate('Schedule', { previousScreen: 'Grower' })}
        >
          <Text style={styles.buttonText}>Schedule</Text>
        </TouchableOpacity>
   
         <Text style={styles.sensorData}>Feed Container: {distance1}</Text>
         <Text style={styles.sensorData}>Water Container: {distance2}</Text>
       </View>
  );
};

export default GrowerWeeks;

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
  button1: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#313833',
    padding: 5,
    borderRadius: 5,
    marginTop: 50
  },
  sensorData: {
    fontSize: 18,
    color: '#000',
    marginTop: 20,
  },
});

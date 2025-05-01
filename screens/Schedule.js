import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ScheduleScreen({ route, navigation }) {
  const [schedules, setSchedules] = useState([]);
  

  useEffect(() => {
    const loadSchedules = async () => {
      try {
        const storedSchedules = await AsyncStorage.getItem('schedules');
        if (storedSchedules) {
          setSchedules(JSON.parse(storedSchedules));
        }
      } catch (error) {
        console.error('Error loading schedules:', error);
      }
    };
    loadSchedules();
  }, [route.params?.schedules]);

  const cancelSchedule = async (index) => {
    if (index < 0 || index >= schedules.length) {
      Alert.alert('Error', 'Invalid schedule index');
      return;
    }

    try {
      const updatedSchedules = schedules.filter((_, i) => i !== index);
      setSchedules(updatedSchedules);
      await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      Alert.alert('Success', 'Schedule cancelled locally');
    } catch (error) {
      console.error('Error cancelling schedule:', error.message);
      Alert.alert('Error', 'Failed to cancel schedule');
    }
  };

  const formatTime = (hour, minute) => {
    const h = parseInt(hour, 10);
    const m = minute.toString().padStart(2, '0');
    const suffix = h >= 12 ? 'PM' : 'AM';
    const hour12 = h % 12 === 0 ? 12 : h % 12;
    return `${hour12}:${m} ${suffix}`;
  };

  const formatRepeatDays = (daysObj) => {
    const shortNames = {
      Mon: 'M', Tue: 'T', Wed: 'W', Thu: 'Th',
      Fri: 'F', Sat: 'S', Sun: 'Sun'
    };
  
    return Object.entries(daysObj)
      .filter(([_, val]) => val)
      .map(([day]) => shortNames[day])
      .join(', ');
  };
  
  

  return (
    <View style={styles.container}>

    <TouchableOpacity
    style={styles.button1}
    onPress={() => {
      if (route.params?.previousScreen) {
        navigation.navigate(route.params.previousScreen);
      } else {
        navigation.goBack();
      }
      
    }}
  >
    <Text style={styles.buttonText}>back</Text>
  </TouchableOpacity>

      {schedules.length > 0 ? (
        <ScrollView style={styles.scheduleList}>
          {schedules.map((schedule, index) => (
            <View key={index} style={styles.scheduleItem}>
              <Text style={styles.fonts}>{formatTime(schedule.hour, schedule.minute)}</Text>
              <Text style={styles.font}>Repeat Days: {formatRepeatDays(schedule.repeatDays)}</Text>
              <Text style={styles.font}> Type: {schedule.source || 'Unknown'}</Text>
              <Button title="Cancel" onPress={() => cancelSchedule(index)} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Image testID="noSchedulesImage" source={require('../Images/2.jpg')} style={styles.image} />
      )}

       <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate('Set', { previousScreen: route.params?.previousScreen })
        }
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scheduleList: {
    marginTop: 90,
  },
  scheduleItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 400,
    height: 400,
  },
  button: {
    borderRadius: 45,
    backgroundColor: '#313833',
    width: 70,
    height: 70,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  button1: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#313833',
    padding: 10,
    borderRadius: 5,
    marginTop: 50
  },
  buttonText: {
    fontSize: 40,
    color: '#F5F5F5',
  },

  font:{
    fontSize: 15
  },
  fonts:{
    fontSize: 16
  }
});

export default ScheduleScreen;

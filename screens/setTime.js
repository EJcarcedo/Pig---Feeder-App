import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SelectList } from 'react-native-dropdown-select-list';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';


const SetAlarmScreen = () => {
  const [selectedHour, setSelectedHour] = useState('12 AM');
  const [selectedMinute, setSelectedMinute] = useState('00');
  const [selectedSecond] = useState('00');
  const [feedType, setFeedType] = useState('Dry');
  const [repeatDays, setRepeatDays] = useState({
    Sun: false, Mon: false, Tue: false, Wed: false, Thu: false, Fri: false, Sat: false,
  });
  const [schedules, setSchedules] = useState([]);
  const maxSchedules = 7;
  const route = useRoute();
  const previousScreen = route.params?.previousScreen || 'Set Alarm'; // fallback title


  const navigation = useNavigation();

  useEffect(() => {
    const loadSchedules = async () => {
      const storedSchedules = await AsyncStorage.getItem('schedules');
      if (storedSchedules) {
        setSchedules(JSON.parse(storedSchedules));
      }
    };
    loadSchedules();
  }, []);

  const hours = [
    { key: '12 AM', value: '12 AM' }, { key: '1 AM', value: '1 AM' }, { key: '2 AM', value: '2 AM' },
    { key: '3 AM', value: '3 AM' }, { key: '4 AM', value: '4 AM' }, { key: '5 AM', value: '5 AM' },
    { key: '6 AM', value: '6 AM' }, { key: '7 AM', value: '7 AM' }, { key: '8 AM', value: '8 AM' },
    { key: '9 AM', value: '9 AM' }, { key: '10 AM', value: '10 AM' }, { key: '11 AM', value: '11 AM' },
    { key: '12 PM', value: '12 PM' }, { key: '1 PM', value: '1 PM' }, { key: '2 PM', value: '2 PM' },
    { key: '3 PM', value: '3 PM' }, { key: '4 PM', value: '4 PM' }, { key: '5 PM', value: '5 PM' },
    { key: '6 PM', value: '6 PM' }, { key: '7 PM', value: '7 PM' }, { key: '8 PM', value: '8 PM' },
    { key: '9 PM', value: '9 PM' }, { key: '10 PM', value: '10 PM' }, { key: '11 PM', value: '11 PM' },
  ];

  const minutes = Array.from({ length: 60 }, (_, i) => ({
    key: i.toString().padStart(2, '0'), value: i.toString().padStart(2, '0')
  }));

  const toggleDay = (day) => {
    setRepeatDays((prevDays) => ({
      ...prevDays, [day]: !prevDays[day],
    }));
  };

  const saveSchedule = async () => {
    if (Object.values(repeatDays).every((day) => !day)) {
      Alert.alert('Error', 'Please select at least one day');
      return;
    }

    if (schedules.length >= maxSchedules) {
      Alert.alert('Error', 'You can only set up to 7 schedules');
      return;
    }

    const hour24Format = convertTo24HourFormat(selectedHour);
    const feedTypeValue = feedType === 'Dry' ? 1 : 0;

    const schedule = {
      hour: hour24Format,
      minute: selectedMinute,
      seconds: selectedSecond,
      repeatDays: repeatDays,
      feedType: feedTypeValue,
      source: route.params?.previousScreen || 'Unknown',
    };

    try {
      const updatedSchedules = [...schedules, schedule];
      setSchedules(updatedSchedules);
      await AsyncStorage.setItem('schedules', JSON.stringify(updatedSchedules));
      Alert.alert('Saved', 'Schedule saved locally');
      navigation.replace('Schedule', { schedules: updatedSchedules, previousScreen: route.params?.previousScreen });
    } catch (error) {
      Alert.alert('Error', 'Failed to save schedule locally');
      console.error(error);
    }
  };

  const convertTo24HourFormat = (hour12) => {
    const [hour, period] = hour12.split(' ');
    let hour24 = parseInt(hour, 10);
    if (period === 'PM' && hour24 !== 12) hour24 += 12;
    if (period === 'AM' && hour24 === 12) hour24 = 0;
    return hour24.toString().padStart(2, '0');
  };

  const repeatDaysToBitMask = (days) => {
    return Object.values(days).map(day => (day ? '1' : '0')).join('');
  };

  return (
      <View style={styles.container}>
      
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10, marginTop: 50 }}>
        {route.params?.previousScreen?.replace('Weeks', '') || 'Set Alarm'} Schedule
      </Text>

      <Text style={styles.label}>Hour</Text>
      <View testID="select-hour">
        <SelectList data={hours} setSelected={setSelectedHour} defaultOption={{ key: '12 AM', value: '12 AM' }} />
      </View>

      <Text style={styles.label}>Minute</Text>
      <View testID="select-minute">
        <SelectList data={minutes} setSelected={setSelectedMinute} defaultOption={{ key: '00', value: '00' }} />
      </View>

      <Text style={styles.label}>Feed Type</Text>
      <View testID="select-feed-type">
        <SelectList
          data={[{ key: 'Dry', value: 'Dry' }, { key: 'Wet', value: 'Wet' }]}
          setSelected={setFeedType}
          defaultOption={{ key: 'Dry', value: 'Dry' }}
        />
      </View>

      <View style={styles.repeatContainer}>
        {Object.keys(repeatDays).map((day) => (
          <TouchableOpacity
            key={day}
            style={[styles.dayButton, repeatDays[day] && styles.dayButtonActive]}
            onPress={() => toggleDay(day)}
            testID={`day-button-${day.toLowerCase()}`}
          >
            <Text style={styles.dayText}>{day}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Save Schedule" onPress={saveSchedule} testID="save-schedule-button" />
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.replace('Schedule', {
            previousScreen: route.params?.previousScreen,
          })
        }
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  repeatContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  dayButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  dayButtonActive: {
    backgroundColor: '#007AFF',
  },
  dayText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default SetAlarmScreen;

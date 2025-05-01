import React from 'react';
import { render, fireEvent, waitFor, screen, act } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import SetAlarmScreen from '../setTime'; // Adjust this to match your file path

jest.spyOn(Alert, 'alert'); // Mock Alert.alert

beforeEach(async () => {
  await AsyncStorage.clear(); // Ensure storage is reset before each test
  jest.clearAllMocks(); // Reset mocks
});

const renderWithNavigation = (ui) => {
  console.log("Rendering component with NavigationContainer...");
  let utils = render(
    <NavigationContainer>
      {ui}
    </NavigationContainer>
  );
  console.log("Component rendered.");
  return utils;
};
test('prevents exceeding max schedules', async () => {
  await AsyncStorage.setItem('schedules', JSON.stringify(Array(7).fill({}))); // Simulate max schedules stored

  console.log("Rendering component with NavigationContainer...");
  const { getByTestId } = await renderWithNavigation(<SetAlarmScreen />);
  console.log("Component rendered.");

  // ✅ Wait for the schedules state to update after AsyncStorage loads
  await waitFor(() => expect(getByTestId('save-schedule-button')).toBeTruthy());

  fireEvent.press(getByTestId('day-button-mon')); // Select Monday to bypass "no day selected" validation

  fireEvent.press(getByTestId('save-schedule-button')); // Try saving an 8th schedule

  // ✅ Wait for the alert to be triggered
  await waitFor(() =>
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'You can only set up to 7 schedules'),
    { timeout: 3000 }
  );
});

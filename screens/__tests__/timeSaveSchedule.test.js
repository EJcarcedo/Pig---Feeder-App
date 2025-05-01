import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import axios from 'axios';
import SetAlarmScreen from '../setTime'; // Adjust the import to match your file path

jest.spyOn(Alert, 'alert'); // Mock Alert.alert

jest.mock('axios'); // Mock Axios to avoid real network requests

beforeEach(async () => {
  await AsyncStorage.clear(); // Ensure storage is reset before each test
  jest.clearAllMocks(); // Reset mocks
});

const renderWithNavigation = (ui) => {
  return render(
    <NavigationContainer>
      {ui}
    </NavigationContainer>
  );
};

test('saves schedule and navigates correctly', async () => {
  // Mock Axios post request to simulate a successful API call
  axios.post.mockResolvedValueOnce({ status: 200 });

  // Render the SetAlarmScreen component
  const { getByTestId } = renderWithNavigation(<SetAlarmScreen />);

  // Select a day to pass the "no day selected" validation
  fireEvent.press(getByTestId('day-button-mon'));

  // Press the "Save Schedule" button
  fireEvent.press(getByTestId('save-schedule-button'));

  // Wait for the "Success" alert to be shown
  await waitFor(() =>
    expect(Alert.alert).toHaveBeenCalledWith('Success', 'Schedule saved successfully')
  );
});

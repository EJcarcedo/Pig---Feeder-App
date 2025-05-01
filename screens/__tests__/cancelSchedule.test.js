import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ScheduleScreen from '../Schedule'; // Adjust the import based on your file structure
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Alert } from 'react-native';

const mockAxios = new MockAdapter(axios);

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage');

describe('ScheduleScreen - Cancel Schedule', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    mockAxios.reset(); // Reset the mock adapter before each test
    jest.spyOn(Alert, 'alert'); // Spy on Alert.alert
  });

  it('cancels a schedule and makes an API call', async () => {
    const mockSchedules = [
      { hour: 8, minute: 30, repeatDays: { Monday: true, Tuesday: false } },
    ];

    // Mock AsyncStorage to return schedules
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockSchedules));
    mockAxios.onPost('http://192.168.4.1/cancel_alarm').reply(200, 'Schedule cancelled');

    const { getByText } = render(<ScheduleScreen route={{ params: {} }} navigation={{ navigate: jest.fn() }} />);

    // Simulate pressing the "Cancel" button
    const cancelButton = await waitFor(() => getByText('Cancel'));
    fireEvent.press(cancelButton);

    // Verify the API call was made
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('http://192.168.4.1/cancel_alarm');

    // Wait for the alert to be shown
    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalledWith(
        'Success',
        'Schedule cancelled successfully'
      );
    });

    // Verify the schedule is removed from AsyncStorage
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('schedules', JSON.stringify([]));
  });
});

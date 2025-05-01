import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ScheduleScreen from '../Schedule'; // Adjust the import based on your file structure
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('ScheduleScreen - Load Schedules', () => {
  it('loads schedules from AsyncStorage and displays them', async () => {
    const mockSchedules = [
      { hour: 8, minute: 30, repeatDays: { Monday: true, Tuesday: false } },
      { hour: 12, minute: 0, repeatDays: { Wednesday: true, Thursday: true } },
    ];

    // Mock AsyncStorage to return schedules
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify(mockSchedules));

    const navigationMock = { navigate: jest.fn() };

    const { getByText } = render(
      <ScheduleScreen route={{ params: {} }} navigation={navigationMock} />
    );

    // Wait for the schedules to load and check if the items are rendered
    await waitFor(() => {
      expect(getByText('8:30')).toBeTruthy();
      expect(getByText('Repeat Days: Monday')).toBeTruthy();
      expect(getByText('12:0')).toBeTruthy();
      expect(getByText('Repeat Days: Wednesday, Thursday')).toBeTruthy();
    });
  });
});

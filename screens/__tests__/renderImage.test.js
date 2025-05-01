import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import ScheduleScreen from '../Schedule'; // Adjust the import based on your file structure
import AsyncStorage from '@react-native-async-storage/async-storage';

jest.mock('@react-native-async-storage/async-storage');

describe('ScheduleScreen - Render Image', () => {
  it('renders image when there are no schedules', async () => {
    // Mock AsyncStorage to return no schedules
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));

    const { getByTestId } = render(
      <ScheduleScreen route={{ params: {} }} navigation={{ navigate: jest.fn() }} />
    );

    // Check if the image is rendered using testID
    await waitFor(() => {
      expect(getByTestId('noSchedulesImage')).toBeTruthy(); // This will find the image
    });
  });
});

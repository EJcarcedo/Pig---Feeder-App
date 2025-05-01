import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ScheduleScreen from '../Schedule'; // Adjust the import based on your file structure
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native'; // Wrap in navigation container for testing

jest.mock('@react-native-async-storage/async-storage');

describe('ScheduleScreen - Navigation', () => {
  it('navigates to the "Set" screen when the "+" button is pressed', async () => {
    // Mock AsyncStorage to return no schedules
    AsyncStorage.getItem.mockResolvedValueOnce(JSON.stringify([]));

    const mockNavigate = jest.fn(); // Mock navigation function

    const { getByText } = render(
      <NavigationContainer>
        <ScheduleScreen
          route={{ params: {} }}
          navigation={{ navigate: mockNavigate }} // Pass mocked navigate function
        />
      </NavigationContainer>
    );

    // Fire the press event on the "+" button
    fireEvent.press(getByText('+'));

    // Wait for the navigation to be called
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('Set'); // Check if it navigates to the 'Set' screen
    });
  });
});

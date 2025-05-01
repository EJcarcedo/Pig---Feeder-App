import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../option';
import { Alert, BackHandler } from 'react-native';

describe('DetailsScreen - Alerts', () => {
  beforeAll(() => {
    // Mock Alert.alert to spy on it
    jest.spyOn(Alert, 'alert').mockImplementation(() => {});
    
    // Mock BackHandler.exitApp to prevent actual exit during test
    jest.spyOn(BackHandler, 'exitApp').mockImplementation(() => {});
  });

  afterAll(() => {
    // Clean up the mocks
    Alert.alert.mockRestore();
    BackHandler.exitApp.mockRestore();
  });

  it('triggers an alert when "Exit" button is pressed', () => {
    const { getByText } = render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);
    const exitButton = getByText('Exit');

    // Fire the press event on the Exit button
    fireEvent.press(exitButton);

    // Check if Alert.alert was called with the correct arguments
    expect(Alert.alert).toHaveBeenCalledWith(
      'Confirm Exit',
      'Are you sure you want to close the app?',
      expect.any(Array)
    );
  });
});

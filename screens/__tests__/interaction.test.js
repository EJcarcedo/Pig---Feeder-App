import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../option'; // Adjust the import based on your file structure
import { Alert, BackHandler } from 'react-native';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mockAxios = new MockAdapter(axios);

describe('DetailsScreen - Interactions', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    mockAxios.reset(); // Reset the mock adapter before each test
  });

  it('shows alert when feeding options are selected', () => {
    const { getByText } = render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);

    // Mock the Alert.alert function
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // Simulate selecting "Dry Feeds"
      buttons[1].onPress(); // Assuming "Dry Feeds" is the second button
    });

    // Mock the POST request for Dry Feeds
    mockAxios.onPost('http://192.168.4.1/servo/on1').reply(200, 'Servos On1');

    // Simulate pressing the "Feed Now" button
    const feedNowButton = getByText('Feed Now');
    fireEvent.press(feedNowButton);

    // Check if the alert was called
    expect(Alert.alert).toHaveBeenCalledWith(
      "Confirm Process",
      "Are you sure you want to feed now?",
      expect.any(Array)
    );
  });

  it('initiates Dry Feeds when selected', async () => {
    const { getByText } = render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);

    // Mock the Alert.alert function
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // Simulate selecting "Dry Feeds"
      buttons[1].onPress(); // Assuming "Dry Feeds" is the second button
    });

    // Mock the POST request for Dry Feeds
    mockAxios.onPost('http://192.168.4.1/servo/on1').reply(200, 'Servos On1');

    // Simulate pressing the "Feed Now" button
    const feedNowButton = getByText('Feed Now');
    fireEvent.press(feedNowButton);

    // Check if the POST request was made
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('http://192.168.4.1/servo/on1');
  });

  it('initiates Wet Feeds when selected', async () => {
    const { getByText } = render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);

    // Mock the Alert.alert function
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // Simulate selecting "Wet Feeds"
      buttons[2].onPress(); // Assuming "Wet Feeds" is the third button
    });

    // Mock the POST request for Wet Feeds
    mockAxios.onPost('http://192.168.4.1/servo/on').reply(200, 'Servos On'); // For Wet Feeding

    // Simulate pressing the "Feed Now" button
    const feedNowButton = getByText('Feed Now');
    fireEvent.press(feedNowButton);

    // Check if the POST request was made
    expect(mockAxios.history.post.length).toBe(1);
    expect(mockAxios.history.post[0].url).toBe('http://192.168.4.1/servo/on');
  });

  it('calls exit function when Exit button is pressed', () => {
    const { getByText } = render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);

    // Mock the Alert.alert function to simulate user selection
    jest.spyOn(Alert, 'alert').mockImplementation((title, message, buttons) => {
      // Simulate pressing "OK" to exit
      buttons[1].onPress();
    });

    // Mock BackHandler.exitApp
    jest.spyOn(BackHandler, 'exitApp').mockImplementation(() => {});

    // Simulate pressing the "Exit" button
    const exitButton = getByText('Exit');
    fireEvent .press(exitButton);

    // Check if the exit function is called
    expect(BackHandler.exitApp).toHaveBeenCalled();
  });

  it('navigates to Schedule when Schedule button is pressed', () => {
    const navigateMock = jest.fn();
    const { getByText } = render(<DetailsScreen navigation={{ navigate: navigateMock }} />);

    // Simulate pressing the "Schedule" button
    const scheduleButton = getByText('Schedule');
    fireEvent.press(scheduleButton);

    // Check if navigation was called
    expect(navigateMock).toHaveBeenCalledWith('Schedule');
  });
});
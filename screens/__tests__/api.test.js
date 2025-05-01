import React from 'react';
import { render, waitFor, screen } from '@testing-library/react-native';
import DetailsScreen from '../option';  // Update the path as necessary
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Mock axios instance
const mockAxios = new MockAdapter(axios);

describe('DetailsScreen - API Calls', () => {
  // Reset mocks after each test
  afterEach(() => {
    mockAxios.reset();
  });

  it('fetches data and updates container statuses correctly', async () => {
    // Mock API response
    const dataResponse = `Feed: 60\nWater: 70`;
    mockAxios.onGet('http://192.168.4.1/ultrasonic/data').reply(200, dataResponse);

    // Render the component
    render(<DetailsScreen navigation={{ navigate: jest.fn() }} />);

    // Wait for the loading text to appear (if necessary)
    await waitFor(() => expect(screen.getByText('Feed Container: Loading...')).toBeTruthy());
    await waitFor(() => expect(screen.getByText('Water Container: Loading...')).toBeTruthy());

    // Give a little more time for the state updates
    await waitFor(() => expect(screen.getByText('Feed Container: Refill')).toBeTruthy());
    await waitFor(() => expect(screen.getByText('Water Container: Refill')).toBeTruthy());
  });
});

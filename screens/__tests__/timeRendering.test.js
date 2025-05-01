import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import SetAlarmScreen from '../setTime'; // Adjust the path if needed
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

jest.mock('axios');
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => Promise.resolve(null)),
}));

const renderWithNavigation = () => (
  <NavigationContainer>
    <SetAlarmScreen />
  </NavigationContainer>
);

describe('SetAlarmScreen Tests', () => {
  it('renders correctly', () => {
    const { getByTestId } = render(renderWithNavigation());
    
    expect(getByTestId('select-hour')).toBeTruthy();
    expect(getByTestId('select-minute')).toBeTruthy();
    expect(getByTestId('select-feed-type')).toBeTruthy();
    expect(getByTestId('save-schedule-button')).toBeTruthy();
    expect(getByTestId('cancel-button')).toBeTruthy();
  }); })





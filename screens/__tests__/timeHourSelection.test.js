import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SetAlarmScreen from '../setTime';

const renderWithNavigation = (ui) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

test('updates hour selection correctly', async () => {
  renderWithNavigation(<SetAlarmScreen />);

  // Open the hour dropdown by pressing the default value '12 AM'
  fireEvent.press(screen.getByText('12 AM'));

  // Select a new hour, '3 PM'
  fireEvent.press(screen.getByText('3 PM'));

  // Verify that the new hour is displayed
  expect(screen.getByText('3 PM')).toBeTruthy();
});

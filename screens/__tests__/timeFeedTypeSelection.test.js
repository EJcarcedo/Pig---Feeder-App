import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SetAlarmScreen from '../setTime';

const renderWithNavigation = (ui) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

test('updates feed type correctly', async () => {
  renderWithNavigation(<SetAlarmScreen />);
  
  // Open the feed type dropdown
  fireEvent.press(screen.getByText('Dry'));

  // Select the 'Wet' option
  fireEvent.press(screen.getByText('Wet'));

  // Expect the selected feed type to be 'Wet'
  expect(screen.getByText('Wet')).toBeTruthy();
});

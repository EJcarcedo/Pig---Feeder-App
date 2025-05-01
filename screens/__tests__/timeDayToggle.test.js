import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SetAlarmScreen from '../setTime';

const renderWithNavigation = (ui) => {
  return render(<NavigationContainer>{ui}</NavigationContainer>);
};

test('toggles day selection correctly', async () => {
  renderWithNavigation(<SetAlarmScreen />);

  // Find the Monday button
  const mondayButton = screen.getByTestId('day-button-mon');

  // Initial state: unselected
  expect(mondayButton).not.toHaveStyle({ backgroundColor: '#007AFF' });

  // Toggle Monday (select it)
  fireEvent.press(mondayButton);

  // Verify that the button is now selected
  expect(mondayButton).toHaveStyle({ backgroundColor: '#007AFF' });

  // Toggle Monday again (deselect it)
  fireEvent.press(mondayButton);

  // Verify that the button is unselected again
  expect(mondayButton).not.toHaveStyle({ backgroundColor: '#007AFF' });
});

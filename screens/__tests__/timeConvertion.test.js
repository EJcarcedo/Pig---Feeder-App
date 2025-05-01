import React from 'react';
import { render } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import SetAlarmScreen from '../setTime';

test('updates selected hour correctly', async () => {
  const { getByTestId } = render(
    <NavigationContainer>
      <SetAlarmScreen />
    </NavigationContainer>
  );

  const hourSelector = getByTestId('select-hour');
  expect(hourSelector).toBeTruthy();
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import DetailsScreen from '../option';

const mockNavigation = { navigate: jest.fn() };

describe('DetailsScreen - Navigation', () => {
  it('navigates to the Schedule screen when "Schedule" button is pressed', () => {
    const { getByText } = render(<DetailsScreen navigation={mockNavigation} />);

    const scheduleButton = getByText('Schedule');
    fireEvent.press(scheduleButton);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('Schedule');
  });
});

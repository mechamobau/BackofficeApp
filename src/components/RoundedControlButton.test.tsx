import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import RoundedControlButton from './RoundedControlButton';
import {ReactTestInstance} from 'react-test-renderer';

describe('RoundedControlButton | component | integration test', () => {
  it('should renders correctly', () => {
    const {toJSON} = render(
      <RoundedControlButton>This is a button</RoundedControlButton>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
  it('should renders the children inside a button label text', () => {
    const {queryByText, rerender} = render(
      <RoundedControlButton>This is a button</RoundedControlButton>,
    );

    expect(queryByText('This is a button')).toBeTruthy();

    rerender(
      <RoundedControlButton>This is a change children</RoundedControlButton>,
    );

    expect(queryByText('This is a button')).not.toBeTruthy();
  });
  it('should call onPress when button is pressed', () => {
    const onPressMock = jest.fn();

    const {queryByA11yRole} = render(
      <RoundedControlButton onPress={onPressMock} accessibilityRole="button">
        This is a button
      </RoundedControlButton>,
    );

    const button = queryByA11yRole('button');

    expect(button).toBeTruthy();

    fireEvent.press(button as ReactTestInstance);

    expect(onPressMock).toHaveBeenCalled();
  });
});

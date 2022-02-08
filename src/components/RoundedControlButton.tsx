import React from 'react';
import type {ReactText} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import useTheme from '../hooks/useTheme';

type RoundedControlButtonProps = TouchableOpacityProps & {
  children: ReactText;
};

function RoundedControlButton({
  children,
  ...touchableOpacityProps
}: RoundedControlButtonProps) {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[styles.controlButton, {borderColor: theme.buttonBorderColor}]}
      {...touchableOpacityProps}
    >
      <Text style={[styles.controlButtonText, {color: theme.textColor}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  controlButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  controlButtonText: {
    fontSize: 22,
  },
});

export default RoundedControlButton;

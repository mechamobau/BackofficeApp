import React from 'react';
import type {ReactText} from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import useTheme from '../hooks/useTheme';

type RoundedControlButtonProps = Omit<TouchableOpacityProps, 'style'> & {
  children: ReactText;
  buttonStyle?: ViewStyle;
  textStyle?: TextStyle;
};

function RoundedControlButton({
  children,
  buttonStyle = {},
  textStyle = {},
  ...touchableOpacityProps
}: RoundedControlButtonProps) {
  const {theme} = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.controlButton,
        {borderColor: theme.buttonBorderColor, ...buttonStyle},
      ]}
      {...touchableOpacityProps}
    >
      <Text
        style={[
          styles.controlButtonText,
          {color: theme.textColor, ...textStyle},
        ]}
      >
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

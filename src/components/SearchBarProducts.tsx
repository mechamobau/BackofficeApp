import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {ThemeType} from '../context/ThemeProvider';
import RoundedControlButton from './RoundedControlButton';

type Props = {
  value?: string;
  onChangeText?: (value: string) => void;
  onClearPress?: () => void;
  theme: ThemeType;
};

function SearchBarProducts({value, onChangeText, onClearPress, theme}: Props) {
  return (
    <View style={styles.textInputContainer}>
      <TextInput
        style={[
          styles.textInput,
          {borderColor: theme.buttonBorderColor, color: theme.textColor},
        ]}
        placeholderTextColor={theme.placeholderColor}
        placeholder="Pesquisar..."
        onChangeText={onChangeText}
        value={value}
        autoFocus
      />
      <RoundedControlButton
        onPress={onClearPress}
        buttonStyle={styles.closeButton}
        textStyle={styles.closeButtonText}
      >
        X
      </RoundedControlButton>
    </View>
  );
}

const styles = StyleSheet.create({
  textInputContainer: {
    width: '100%',
  },
  textInput: {
    width: '100%',
    fontSize: 24,
    padding: 15,
    paddingRight: 60,
    borderRadius: 10,
    borderWidth: 2,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    transform: [
      {
        translateY: 11,
      },
      {
        translateX: -12,
      },
    ],
  },
  closeButtonText: {
    fontWeight: 'bold',
  },
});

export default SearchBarProducts;

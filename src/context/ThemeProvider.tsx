import React from 'react';
import type {ReactNode} from 'react';

import COLORS from '../constants/COLORS';
import {useColorScheme} from 'react-native';

export type ThemeType = typeof lightTheme; // This is the type definition for my theme object.

export const lightTheme = {
  textColor: COLORS.black,
  placeholderColor: COLORS.dark,
  buttonBorderColor: COLORS.black,
};

export const darkTheme: ThemeType = {
  textColor: COLORS.white,
  placeholderColor: COLORS.light,
  buttonBorderColor: COLORS.lighter,
};

type Theme = {
  theme: ThemeType;
  isDark: boolean;
};

export const ThemeContext = React.createContext<Theme>({
  theme: lightTheme,
  isDark: false,
});

type Props = {
  children: ReactNode;
};

function ThemeProvider({children}: Props) {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === 'dark';

  const value = {
    theme: isDark ? darkTheme : lightTheme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;

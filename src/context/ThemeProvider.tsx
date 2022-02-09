import React, {useMemo} from 'react';
import type {ReactNode} from 'react';

import COLORS from '../constants/COLORS';
import {useColorScheme} from 'react-native';

export type ThemeType = typeof lightTheme; // This is the type definition for my theme object.

export const lightTheme = {
  textColor: COLORS.black,
  buttonBorderColor: COLORS.dark,
};

export const darkTheme: ThemeType = {
  textColor: COLORS.white,
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

  const theme = useMemo(() => (isDark ? darkTheme : lightTheme), [isDark]);

  const value = {
    theme,
    isDark,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeProvider;

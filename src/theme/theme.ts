import COLORS from './COLORS';

export type ThemeType = typeof lightTheme; // This is the type definition for my theme object.

export const lightTheme = {
  textColor: COLORS.black,
  buttonBorderColor: COLORS.dark,
};

export const darkTheme: ThemeType = {
  textColor: COLORS.white,
  buttonBorderColor: COLORS.lighter,
};

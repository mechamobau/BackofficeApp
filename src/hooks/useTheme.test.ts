import {renderHook} from '@testing-library/react-hooks';
import useTheme from './useTheme';
import ThemeProvider, {darkTheme, lightTheme} from '../context/ThemeProvider';
import COLORS from '../constants/COLORS';
import React from 'react';
import {useColorScheme} from 'react-native';

jest.mock('react-native', () => ({
  useColorScheme: jest.fn(),
}));

describe('useTheme | hook | integration test', () => {
  afterEach(jest.clearAllMocks);

  it('should change theme when colorScheme updates', async () => {
    (useColorScheme as jest.Mock).mockImplementation(() => 'dark');

    const {result, rerender} = renderHook(() => useTheme(), {
      wrapper: ThemeProvider,
    });

    expect(result.current).toEqual({
      theme: darkTheme,
      isDark: true,
    });

    (useColorScheme as jest.Mock).mockImplementation(() => 'light');

    rerender();

    expect(result.current).toEqual({
      theme: lightTheme,
      isDark: false,
    });
  });

  it("should returns context when 'ThemeContext' is provided", () => {
    (useColorScheme as jest.Mock).mockReturnValue('light');
    const {result} = renderHook(() => useTheme(), {wrapper: ThemeProvider});

    expect(result.current).toStrictEqual({
      isDark: false,
      theme: {
        buttonBorderColor: COLORS.dark,
        textColor: COLORS.black,
      },
    });
  });

  it("should throw an error when 'ThemeContext' isn't provided", async () => {
    const useContextOriginal = React.useContext;
    const useContextSpy = jest.spyOn(React, 'useContext');
    useContextSpy.mockImplementation(() => null);

    const {result} = renderHook(() => useTheme());

    expect(result.error).toEqual(
      Error("'useTheme' should be used within 'ThemeProvider'"),
    );

    useContextSpy.mockClear();
    React.useContext = useContextOriginal;
  });
});

import {renderHook} from '@testing-library/react-hooks';
import useTheme from './useTheme';
import ThemeProvider from '../context/ThemeProvider';
import COLORS from '../constants/COLORS';
import React from 'react';

describe('useTheme | hook | integration test', () => {
  afterEach(jest.clearAllMocks);

  it("should returns context when 'ThemeContext' is provided", () => {
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
    jest.spyOn(React, 'useContext').mockImplementation(() => null);

    const {result} = renderHook(() => useTheme());

    expect(result.error).toEqual(
      Error("'useTheme' should be used within 'ThemeProvider'"),
    );
  });
});

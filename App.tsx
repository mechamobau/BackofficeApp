import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {ProductList, ProductProvider, withParent, ThemeProvider} from './src';
import useTheme from './src/hooks/useTheme';
import pipe from './src/utils/pipe';

const App = () => {
  const {isDark} = useTheme();

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <ProductList />
    </SafeAreaView>
  );
};

const enhance = pipe(withParent(ThemeProvider), withParent(ProductProvider));

export default enhance(App);

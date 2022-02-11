import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useLayoutEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  ProductList,
  ProductProvider,
  withParent,
  ThemeProvider,
  SearchBarProducts,
} from './src';
import STORAGE_KEY from './src/constants/STORAGE_KEY';
import {State as ProductState} from './src/context/ProductProvider';
import useProductList from './src/hooks/useProductList';
import useTheme from './src/hooks/useTheme';
import pipe from './src/utils/pipe';

const App = () => {
  const {theme, isDark} = useTheme();

  const {
    state: productState,
    updateList,
    filterByName,
    clearFilters,
    updateQuantity,
    removeProduct,
  } = useProductList();

  useLayoutEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then(storageValue => {
      if (storageValue) {
        const parsedStorageValue = JSON.parse(storageValue) as ProductState;

        updateList(parsedStorageValue.products);
        filterByName(parsedStorageValue.searchTerm);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(productState));
  }, [productState]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={styles.container}>
        <SearchBarProducts
          theme={theme}
          onChangeText={filterByName}
          value={productState.searchTerm}
          onClearPress={clearFilters}
        />
        <ScrollView>
          <ProductList
            theme={theme}
            products={productState.products}
            onIncreaseQuantity={updateQuantity}
            onDecreaseQuantity={updateQuantity}
            onRemoveProduct={removeProduct}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

const enhance = pipe(withParent(ThemeProvider), withParent(ProductProvider));

export default enhance(App);

import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import ProductItem from './ProductItem';
import {ProductListItem} from '../context/ProductProvider';
import {ThemeType} from '../context/ThemeProvider';

type Props = {
  products: ProductListItem[];
  theme: ThemeType;
  onDecreaseQuantity?: (productId: number, newQuantity: number) => void;
  onIncreaseQuantity?: (productId: number, newQuantity: number) => void;
  onRemoveProduct?: (productId: number) => void;
};

function ProductList({
  products,
  theme,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onRemoveProduct,
}: Props) {
  if (products.length === 0) {
    return (
      <View style={styles.emptyListContainer}>
        <Text style={[styles.emptyListText, {color: theme.textColor}]}>
          Sem produtos cadastrados
        </Text>
        <Text style={[styles.emptyListText, {color: theme.textColor}]}>
          Insira um novo
        </Text>
      </View>
    );
  }

  return (
    <>
      {products.map(
        ({id, name, value, quantity, visible}) =>
          visible && (
            <ProductItem
              key={id}
              name={name}
              value={value}
              quantity={quantity}
              onIncreaseQuantity={newQuantity =>
                onIncreaseQuantity?.(id, newQuantity)
              }
              onDecreaseQuantity={newQuantity =>
                onDecreaseQuantity?.(id, newQuantity)
              }
              onRemoveProduct={() => onRemoveProduct?.(id)}
            />
          ),
      )}
    </>
  );
}

const styles = StyleSheet.create({
  emptyListContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  emptyListText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductList;

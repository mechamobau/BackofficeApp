import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import useTheme from '../hooks/useTheme';
import Product from '../models/Product';
import RoundedControlButton from './RoundedControlButton';

type BaseProps = Pick<Product, 'name' | 'quantity' | 'value'>;

type Props = BaseProps & {
  onRemovePress?: () => void;
  onAddPress?: () => void;
};

function ProductItem(props: Props) {
  const {name, quantity, value, onRemovePress, onAddPress} = props;

  const formattedValue = value.toFixed(2);

  const {theme} = useTheme();

  return (
    <View style={styles.container} accessible>
      <View>
        <Text style={[styles.title, {color: theme.textColor}]}>{name}</Text>
        <Text style={[styles.value, {color: theme.textColor}]}>
          ${formattedValue}
        </Text>
      </View>
      <View style={styles.quantityControlWrapper}>
        {quantity >= 1 && (
          <RoundedControlButton
            accessibilityRole="button"
            accessibilityLabel="Remover produto"
            onPress={onRemovePress}
          >
            -
          </RoundedControlButton>
        )}
        <Text
          style={[styles.quantity, {color: theme.textColor}]}
          accessibilityLabel={`Número de produtos: ${quantity}`}
        >
          {quantity}
        </Text>
        <RoundedControlButton
          accessibilityRole="button"
          accessibilityLabel="Adicionar produto"
          onPress={onAddPress}
        >
          +
        </RoundedControlButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 6,
  },
  value: {
    fontSize: 16,
  },
  quantity: {
    marginVertical: 0,
    marginHorizontal: 15,
    fontSize: 19,
  },
  mainInfoWrapper: {},
  quantityControlWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: '100%',
  },
});

export default ProductItem;

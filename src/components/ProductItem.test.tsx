import React, {ReactNode} from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import ProductItem from './ProductItem';
import ThemeProvider from '../context/ThemeProvider';

const AllProviders = ({children}: {children: ReactNode}) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('ProductItem | component | integration test', () => {
  it('renders correctly', () => {
    const {queryByText, queryByA11yLabel} = render(
      <ProductItem name="Product name display" quantity={2} value={100} />,
      {wrapper: AllProviders},
    );

    expect(queryByText('Product name di...')).not.toBeNull();
    expect(queryByText('Valor unitário: $100.00')).not.toBeNull();
    expect(queryByText('Valor total: $200.00')).not.toBeNull();
    expect(queryByA11yLabel('Número de produtos: 2')).not.toBeNull();
  });

  it('calls increase and decrease quantity handlers on pressing', () => {
    const increaseFn = jest.fn();
    const decreaseFn = jest.fn();

    const {getByA11yLabel} = render(
      <ProductItem
        name="Product name display"
        quantity={2}
        value={100}
        onIncreaseQuantity={increaseFn}
        onDecreaseQuantity={decreaseFn}
      />,
      {wrapper: AllProviders},
    );

    fireEvent.press(getByA11yLabel('Aumentar quantidade'));

    expect(increaseFn).toHaveBeenCalled();

    fireEvent.press(getByA11yLabel('Diminuir quantidade'));

    expect(decreaseFn).toHaveBeenCalled();
  });

  it('calls remove product handler on pressing', () => {
    const removeFn = jest.fn();

    const {getByA11yLabel} = render(
      <ProductItem
        name="Product name display"
        quantity={2}
        value={100}
        onRemoveProduct={removeFn}
      />,
      {wrapper: AllProviders},
    );

    fireEvent.press(getByA11yLabel('Remover produto'));

    expect(removeFn).toHaveBeenCalled();
  });

  it('matches snapshot', () => {
    const {toJSON} = render(
      <ProductItem name="Product name display" quantity={2} value={100} />,
      {wrapper: AllProviders},
    );

    expect(toJSON()).toMatchSnapshot();
  });
});

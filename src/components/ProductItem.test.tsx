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

    expect(queryByText('Product name display')).not.toBeNull();
    expect(queryByText('$100.00')).not.toBeNull();
    expect(queryByA11yLabel('Número de produtos: 2')).not.toBeNull();
  });

  it('calls add and remove quantity handlers on pressing', () => {
    const addFn = jest.fn();
    const removeFn = jest.fn();

    const {getByA11yLabel} = render(
      <ProductItem
        name="Product name display"
        quantity={2}
        value={100}
        onAddPress={addFn}
        onRemovePress={removeFn}
      />,
      {wrapper: AllProviders},
    );

    fireEvent.press(getByA11yLabel('Adicionar produto'));

    expect(addFn).toHaveBeenCalled();

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

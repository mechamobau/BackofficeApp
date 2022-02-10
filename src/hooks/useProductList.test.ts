import {act, renderHook} from '@testing-library/react-hooks';
import useProductList from './useProductList';
import ProductProvider, {ProductListItem} from '../context/ProductProvider';
import React from 'react';

const productMock1 = {
  id: 1,
  name: 'Product 1',
  quantity: 1,
  value: 123,
  order: 1,
  visible: true,
};

const productMock2 = {
  id: 2,
  name: 'Product 2',
  quantity: 1,
  value: 123,
  order: 2,
  visible: true,
};

describe('useProductList | hook | integration test', () => {
  afterEach(jest.clearAllMocks);

  describe('functions methods', () => {
    it("should adds a product to state when 'addProduct' is called", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      act(() => {
        result.current.addProduct({
          name: productMock1.name,
          quantity: productMock1.quantity,
          value: productMock1.value,
        });
        result.current.addProduct({
          name: productMock2.name,
          quantity: productMock2.quantity,
          value: productMock2.value,
        });
      });

      expect(result.current.state.products).toEqual([
        productMock1,
        productMock2,
      ]);
    });

    it("should update list item when 'updateItem' is called", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      const newProductMock1 = {
        name: 'Product updated 1',
        quantity: 3,
      };

      act(() => {
        result.current.addProduct({
          name: productMock1.name,
          quantity: productMock1.quantity,
          value: productMock1.value,
        });
        result.current.addProduct({
          name: productMock2.name,
          quantity: productMock2.quantity,
          value: productMock2.value,
        });
      });

      act(() => {
        result.current.updateItem(productMock1.id, newProductMock1);
      });

      expect(result.current.state.products).toStrictEqual([
        {
          ...productMock1,
          ...newProductMock1,
        },
        productMock2,
      ]);
    });

    it("should update list when 'updateList' is called", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      act(() => {
        result.current.addProduct({
          name: productMock1.name,
          quantity: productMock1.quantity,
          value: productMock1.value,
        });
        result.current.addProduct({
          name: productMock2.name,
          quantity: productMock2.quantity,
          value: productMock2.value,
        });
      });

      expect(result.current.state.products).toStrictEqual([
        productMock1,
        productMock2,
      ]);

      const newList: ProductListItem[] = [
        {
          id: 1,
          name: 'Updated product 1',
          order: 2,
          quantity: 1,
          value: 1234,
          visible: false,
        },
      ];

      act(() => {
        result.current.updateList(newList);
      });

      expect(result.current.state.products).toBe(newList);
    });

    it("should update quantity of an item when 'updateQuantity' is called", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      act(() => {
        result.current.addProduct({
          name: productMock1.name,
          quantity: productMock1.quantity,
          value: productMock1.value,
        });
        result.current.addProduct({
          name: productMock2.name,
          quantity: productMock2.quantity,
          value: productMock2.value,
        });
      });

      expect(result.current.state.products).toStrictEqual([
        productMock1,
        productMock2,
      ]);

      const NEW_PRODUCT_ITEM_1_QUANTITY = 4;

      act(() => {
        result.current.updateQuantity(
          productMock1.id,
          NEW_PRODUCT_ITEM_1_QUANTITY,
        );
      });

      expect(result.current.state.products).toStrictEqual([
        {
          ...productMock1,
          quantity: NEW_PRODUCT_ITEM_1_QUANTITY,
        },
        productMock2,
      ]);
    });

    it("should apply filter when 'filterByName' is called with a searchTerm", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      act(() => {
        result.current.addProduct({
          name: productMock1.name,
          quantity: productMock1.quantity,
          value: productMock1.value,
        });
        result.current.addProduct({
          name: productMock2.name,
          quantity: productMock2.quantity,
          value: productMock2.value,
        });
      });

      expect(result.current.state.products).toStrictEqual([
        productMock1,
        productMock2,
      ]);

      act(() => {
        result.current.filterByName('Product 2');
      });

      expect(result.current.state.products).toStrictEqual([
        {
          ...productMock1,
          visible: false,
        },
        productMock2,
      ]);

      act(() => {
        result.current.clearFilters();
      });

      expect(result.current.state.products).toStrictEqual([
        productMock1,
        productMock2,
      ]);
    });
  });

  describe('state', () => {
    it("should returns context when 'ProductContext' is provided", () => {
      const {result} = renderHook(() => useProductList(), {
        wrapper: ProductProvider,
      });

      expect(result.current.state).toEqual({
        products: [],
      });
    });

    it("should throw an error when 'ProductContext' isn't provided", async () => {
      jest.spyOn(React, 'useContext').mockImplementation(() => null);

      const {result} = renderHook(() => useProductList());

      expect(result.error).toEqual(
        Error("'useProductList' should be used within 'ProductProvider'"),
      );
    });
  });
});

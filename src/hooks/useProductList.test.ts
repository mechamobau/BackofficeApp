import {renderHook} from '@testing-library/react-hooks';
import useProductList from './useProductList';
import ProductProvider from '../context/ProductProvider';
import React from 'react';

describe('useProductList | hook | integration test', () => {
  afterEach(jest.clearAllMocks);

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

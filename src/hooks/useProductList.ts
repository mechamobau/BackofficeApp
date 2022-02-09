import {useContext} from 'react';
import {ProductContext} from '../context/ProductProvider';

function useProductList() {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("'useProductList' should be used within 'ProductProvider'");
  }

  return context;
}

export default useProductList;

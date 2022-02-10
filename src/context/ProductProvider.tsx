import React, {createContext, ReactNode, useMemo, useReducer} from 'react';
import Product from '../models/Product';

type ProductListItem = Product & {
  order: number;
  visible: boolean;
};

type State = {
  products: ProductListItem[];
};

enum ActionType {
  ADD_PRODUCT,
  UPDATE_LIST,
  UPDATE_ITEM,
  UPDATE_QUANTITY,
  CLEAR_FILTERS,
  FILTER_BY_NAME,
}

type Action =
  | {
      type: ActionType.ADD_PRODUCT;
      product: Omit<Product, 'id'>;
    }
  | {
      type: ActionType.UPDATE_LIST;
      products: ProductListItem[];
    }
  | {
      type: ActionType.UPDATE_ITEM;
      productId: Product['id'];
      product: Partial<Omit<Product, 'id'>>;
    }
  | {
      type: ActionType.UPDATE_QUANTITY;
      productId: Product['id'];
      quantity: Product['quantity'];
    }
  | {
      type: ActionType.CLEAR_FILTERS;
    }
  | {
      type: ActionType.FILTER_BY_NAME;
      searchTerm: string;
    };

type ProductContext = {
  state: State;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateList: (products: ProductListItem[]) => void;
  updateItem: (
    productId: Product['id'],
    product: Partial<Omit<Product, 'id'>>,
  ) => void;
  updateQuantity: (
    productId: Product['id'],
    quantity: Product['quantity'],
  ) => void;
  clearFilters: () => void;
  filterByName: (searchTerm: string) => void;
};

const initialValue: State = {
  products: [],
};

export const ProductContext = createContext<ProductContext | null>(null);

type Props = {
  children: ReactNode;
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case ActionType.ADD_PRODUCT:
      return {
        products: [
          ...state.products,
          {
            ...action.product,
            id: 1,
            order: state.products.length + 1,
            visible: true,
          },
        ],
      };
    case ActionType.UPDATE_LIST:
      return {
        products: action.products,
      };
    case ActionType.UPDATE_ITEM:
      return {
        products: state.products.map(product => {
          if (product.id === action.productId) {
            return {
              ...product,
              ...action.product,
            };
          }

          return product;
        }),
      };
    case ActionType.UPDATE_QUANTITY:
      return {
        products: state.products.map(product => {
          if (product.id === action.productId) {
            return {
              ...product,
              quantity: action.quantity,
            };
          }

          return product;
        }),
      };
    case ActionType.CLEAR_FILTERS:
      return {
        products: state.products.map(product => ({
          ...product,
          visible: true,
        })),
      };
    case ActionType.FILTER_BY_NAME:
      return state;
  }
}

function ProductProvider({children}: Props) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  const addProduct = (product: Omit<Product, 'id'>) =>
    dispatch({
      type: ActionType.ADD_PRODUCT,
      product,
    });

  const updateList = (products: ProductListItem[]) =>
    dispatch({
      type: ActionType.UPDATE_LIST,
      products,
    });

  const updateItem = (
    productId: Product['id'],
    product: Partial<Omit<Product, 'id'>>,
  ) =>
    dispatch({
      type: ActionType.UPDATE_ITEM,
      product,
      productId,
    });

  const updateQuantity = (
    productId: Product['id'],
    quantity: Product['quantity'],
  ) =>
    dispatch({
      type: ActionType.UPDATE_QUANTITY,
      productId,
      quantity,
    });

  const clearFilters = () =>
    dispatch({
      type: ActionType.CLEAR_FILTERS,
    });

  const filterByName = (searchTerm: string) =>
    dispatch({
      type: ActionType.FILTER_BY_NAME,
      searchTerm,
    });

  const value = useMemo(
    () => ({
      state,
      addProduct,
      updateList,
      updateItem,
      updateQuantity,
      clearFilters,
      filterByName,
    }),
    [state],
  );

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
}

export default ProductProvider;
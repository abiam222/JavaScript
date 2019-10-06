import { Product } from "../product";
import * as fromRoot from "../../state/app.state";
import { createFeatureSelector, createSelector, State } from "@ngrx/store";
import { ProductActions, ProductActionTypes } from "./product.actions";

//This file is the reducer. The export function is

//In the first param, by setting the value we don't necessarily need to write the type.
//I have it here though for reference
export function reducer(
  state: ProductState = initialState,
  action: ProductActions
): ProductState {
  switch (action.type) {
    case ProductActionTypes.ToggleProductCode:
      console.log(state);
      console.log("payload:" + action.payload);
      return {
        ...state, //we have this cause we want to copy what we have (that is not showProductCode)
        showProductCode: action.payload
      };
    case ProductActionTypes.SetCurrentProduct:
      return {
        ...state,
        //currentProduct: { ...action.payload }
        currentProductId: action.payload.id
      };
    case ProductActionTypes.ClearCurrentProduct:
      return {
        ...state,
        //currentProduct: null
        currentProductId: null
      };
    case ProductActionTypes.InitializeCurrentProduct:
      return {
        ...state,
        currentProductId: 0
        // currentProduct: {
        //   //see if changing this works
        //   id: 0,
        //   productName: "",
        //   productCode: "New",
        //   description: "El Weyy",
        //   starRating: 0
        // }
      };
    case ProductActionTypes.LoadSuccess:
      return {
        ...state,
        products: action.payload,
        error: "" //added this, when added error
      };
    case ProductActionTypes.LoadFail:
      return {
        ...state,
        products: [],
        error: action.payload
      };
    default:
      return state;
  }
}

export interface ProductState {
  showProductCode: boolean;
  //currentProduct: Product;
  currentProductId: number | null;
  products: Product[];
  error: string;
}

//I don't want my state to have "undefined" at first
//I want to set defaults
const initialState: ProductState = {
  showProductCode: true, //initially appears checked
  currentProductId: null, //not initialially selected
  products: [],
  error: ""
};

//extend interface
//doing this for lazy loading purposes
//instead of having this in the app.state
//I want it to be "global" but not mess up lazy loading
export interface State extends fromRoot.State {
  products: ProductState;
}

/*

We want to establish logical boundaries around our lazy loaded features.
To maintain that boundary, we want to keep our lazy loaded feature areas 
complete separate from our initial bundled code. 

Extending the state interface for lazy loaded features
*/

//we defined the 'products' in the products.module file
//this gives all "all the products"
const getProductFeatureState = createFeatureSelector<ProductState>("products");

//adding selector
//this gives us the "sowProductCode strip from products"
//we export this so we can retrive this info later on from this file reducer
export const getShowProductCode = createSelector(
  getProductFeatureState,
  state => state.showProductCode
);

//selector for the array of products
export const getProducts = createSelector(
  getProductFeatureState,
  state => state.products
);

export const getCurrentProductId = createSelector(
  getProductFeatureState,
  state => state.currentProductId
);

export const getCurrentProduct = createSelector(
  getProductFeatureState,
  getCurrentProductId,
  (state, currentProductId) => {
    if (currentProductId === 0) {
      return {
        id: 0,
        productName: "",
        productCode: "New",
        description: "",
        starRating: 0
      };
    } else {
      return currentProductId
        ? state.products.find(p => p.id === currentProductId) //if not null
        : null; //if null
    }
  }
);

export const getError = createSelector(
  getProductFeatureState,
  state => state.error
);

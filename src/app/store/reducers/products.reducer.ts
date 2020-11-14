import {createReducer, on} from '@ngrx/store';
import {Product} from '../../product';
import {setProduct, setProducts} from '../actions/products.action';

const initProductsState: Product[] = [];
const initProductState: Product = {id: 0, name: 'product not found', description: 'product not found', imageUrl: '1', price: 0};

export const productsReducer = createReducer(
  initProductsState,
  on(setProducts, ((state, props) => props.products)),
);

export const productReducer = createReducer(
  initProductState,
  on(setProduct, ((state, props) => props.product)),
);


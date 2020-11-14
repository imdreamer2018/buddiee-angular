import {AppState} from '../../app.states';

export const selectorProducts = (state: AppState) => state.products;

export const selectorProduct = (state: AppState) => state.product;

import {createAction, props} from '@ngrx/store';
import {Product} from '../../product';
import {Page} from '../../page';

export const loadProducts = createAction('[product list component] load products', props<{ pageNumber: number}>());
export const setProducts = createAction('[product list component]', props<{products: Page<Product[]>}>());

export const loadProduct = createAction('[product detail component], load product detail');
export const setProduct = createAction('[product detail component]', props<{product: Product}>());

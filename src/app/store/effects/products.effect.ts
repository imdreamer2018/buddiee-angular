import {createEffect, ofType} from '@ngrx/effects';
import {Injectable} from '@angular/core';
import {ProductsService} from '../../service/products.service';
import {loadProduct, loadProducts, setProduct, setProducts} from '../actions/products.action';
import {catchError, map, mergeMap, switchMap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Actions} from '@ngrx/effects';

@Injectable()
export class ProductsEffect {
  loadProductsEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProducts),
      mergeMap((action) => this.productsService.getProducts(action.pageNumber).pipe(
        map(products => setProducts({products})),
        catchError(() => EMPTY)
      ))
    );
  });
  loadProductEffect$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadProduct),
      switchMap((action) => this.productsService.getProduct(action.id).pipe(
        map(product => setProduct({product})),
        catchError(() => EMPTY)
      ))
    );
  });

  constructor(private actions$: Actions,
              private productsService: ProductsService) {
  }
}

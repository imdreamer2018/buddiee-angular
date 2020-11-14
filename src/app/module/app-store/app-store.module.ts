import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {productReducer, productsReducer} from '../../store/reducers/products.reducer';
import {EffectsModule} from '@ngrx/effects';
import {ProductsEffect} from '../../store/effects/products.effect';


@NgModule({
  imports: [
    StoreModule.forRoot({products: productsReducer, product: productReducer}),
    EffectsModule.forRoot([ProductsEffect])
  ],
  exports: [
    StoreModule
  ]
})
export class AppStoreModule { }

import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../product';
import {Page} from '../page';
import {ProductsApi} from '../api/products';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  pageSize = 10;

  constructor(private productsApi: ProductsApi) { }

  getProducts(pageNumber): Observable<Page<Product[]>> {
    return this.productsApi.getProducts(pageNumber, this.pageSize);
  }
  getProduct(id): Observable<Product> {
    return this.productsApi.getProduct(id);
  }
}

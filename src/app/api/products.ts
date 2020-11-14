import {GET, Query, RebirthHttpClient, Any} from '@ng-zorro/rebirth-http';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Page} from '../page';
import {Product} from '../product';

@Injectable()
export class ProductsApi extends RebirthHttpClient {
  static BASE_URL: 'http://127.0.0.1:8080';
  constructor(http: HttpClient) {
    super(http);
  }

  @GET(`${ProductsApi.BASE_URL}/products`)
  getProducts(
    @Query('pageNumber') pageNumber: number,
    @Query('pageSize') pageSize: number
  ): Observable<Page<Product[]>> {
    return Any;
  }

  @GET(`${ProductsApi.BASE_URL}/product/:id`)
  getProduct(
    @Query('id') id: number,
  ): Observable<Product> {
    return Any;
  }
}

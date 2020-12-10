import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from '../../page';
import {Product} from '../../product';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {BASE_URL, Header} from '../options';
import {handleError} from '../handleError';

@Injectable({
  providedIn: 'root'
})
export class ProductsApi {
  BASE_URL = BASE_URL;
  header: Header = {
    headers: new HttpHeaders({
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {
  }

  getProducts(pageNumber: number, pageSize: number): Observable<Page<Product[]>> {
    if (pageNumber && pageSize) {
      this.header.params =  new HttpParams()
        .set('pageNumber', pageNumber.toString())
        .set('pageSize', pageSize.toString());
    }
    return this.http.get<Page<Product[]>>(`${this.BASE_URL}/products`, this.header);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`, this.header)
      .pipe(
        catchError(handleError)
      );
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.BASE_URL}/products`, product, this.header);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/products/${id}`, this.header);
  }
}

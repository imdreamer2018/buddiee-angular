import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from '../page';
import {Product} from '../product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApi {
  BASE_URL: 'http://127.0.0.1:8080';
  constructor(private http: HttpClient) {
  }

  getProducts(pageNumber: number, pageSize: number): Observable<Page<Product[]>> {
      return this.http.get<Page<Product[]>>(`http://127.0.0.1:8080/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`http://127.0.0.1:8080/products/${id}`);
  }
}

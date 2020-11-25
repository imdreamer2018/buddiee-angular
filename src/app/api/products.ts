import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from '../page';
import {Product} from '../product';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsApi {
  BASE_URL: string;
  header: object;
  constructor(private http: HttpClient) {
    this.BASE_URL = 'http://127.0.0.1:4200';
    this.header = {
      Accept: 'application/json;charset=UTF-8',
     'Content-Type': 'application/json',
    };
  }

  getProducts(pageNumber: number, pageSize: number): Observable<Page<Product[]>> {
      return this.http.get<Page<Product[]>>(`${this.BASE_URL}/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }

  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.BASE_URL}/products/${id}`);
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.BASE_URL}/products`, product, this.header);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/products/${id}`);
  }
}

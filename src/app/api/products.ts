import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Page} from '../page';
import {Product} from '../product';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

interface Header {
  headers: any;
  params?: any;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsApi {
  BASE_URL = 'http://localhost:4200/api';
  header: Header = {
    headers: new HttpHeaders({
      Accept: 'application/json;charset=UTF-8',
      'Content-Type': 'application/json',
    })
  };
  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.'
    );
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
        catchError(this.handleError)
      );
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post<Product>(`${this.BASE_URL}/products`, product, this.header);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.BASE_URL}/products/${id}`, this.header);
  }
}

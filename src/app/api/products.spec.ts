import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Page} from '../page';
import {Product} from '../product';

describe('product api', () => {
  const products: Page<Product[]> = {
    currentPage: 1,
    totalPage: 10,
    data: [
      {
        id: 1,
        name: '雪碧',
        description: '大声你的逼逼',
        imageUrl: 'http://####',
        price: 2.5,
      },
      {
        id: 2,
        name: '可乐',
        description: '快乐水',
        imageUrl: 'http://####',
        price: 2.5,
      },
    ]
  };
  const mockProduct: Product = {
    id: 1,
    name: '雪碧',
    description: '大声你的逼逼',
    imageUrl: 'http://####',
    price: 2.5,
  };
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return products page when get products by pageNumber and pageSize', () => {
    http.get<Page<Product[]>>('/products?pageNumber=1&pageSize=10')
      .subscribe(productsResponse => {
      expect(productsResponse).toEqual(products);
    });
    const req = httpTestingController.expectOne('/products?pageNumber=1&pageSize=10');
    expect(req.request.method).toEqual('GET');
    req.flush(products);
  });

  it('should return product when get product by id', () => {
    http.get<Product>('/products/1')
      .subscribe(productResponse => {
        expect(productResponse).toEqual(mockProduct);
      });
    const req = httpTestingController.expectOne('/products/1');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProduct);
  });
});

import { HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Page} from '../page';
import {Product} from '../product';

describe('product api', () => {
  const mockProducts: Page<Product[]> = {
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
      expect(productsResponse).toEqual(mockProducts);
    });
    const req = httpTestingController.expectOne('/products?pageNumber=1&pageSize=10');
    expect(req.request.method).toEqual('GET');
    req.flush(mockProducts);
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

  it('should return 404 error when get product by id and product is not existed', () => {
    const emsg = 'can not find basic info of product with id is 1';

    http.get<Product>('/products/1')
      .subscribe(
        product => fail('should have failed with 404 error'),
        (error: HttpErrorResponse) => {
          expect(error.status).toEqual(404, 'status');
          expect(error.error).toEqual(emsg, 'message');
        }
      );

    const req = httpTestingController.expectOne('/products/1');
    req.flush(emsg, { status: 404, statusText: emsg});
  });
});

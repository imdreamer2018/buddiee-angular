import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import {Product} from '../product';
import {ProductsApi} from '../api/products';
import {Page} from '../page';
import {of} from 'rxjs';

describe('ProductsService', () => {
  let service: ProductsService;
  let productsApiSpy: jasmine.SpyObj<ProductsApi>;
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
  beforeEach(() => {
    const spy = jasmine.createSpyObj('ProductsApi', ['getProducts']);
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        { provide: ProductsApi, useValue: spy}
      ]
    });
    service = TestBed.inject(ProductsService);
    productsApiSpy = TestBed.inject(ProductsApi) as jasmine.SpyObj<ProductsApi>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return products page when get products by pageNumber and pageSize', () => {
    productsApiSpy.getProducts.and.returnValue(of(products));
    service.getProducts(1).subscribe(productsPage => {
      expect(productsPage).toEqual(products);
    });
    expect(productsApiSpy.getProducts).toHaveBeenCalledTimes(1);
  });
});

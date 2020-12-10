import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListComponent } from './product-list.component';
import {Page} from '../../page';
import {Product} from '../../product';
import BigNumber from 'bignumber.js';
import {Router} from '@angular/router';
import {MockStore, provideMockStore} from '@ngrx/store/testing';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let mockStore: MockStore;
  let routerSpy = jasmine.createSpyObj(
    'Router',
    ['navigate']
  );
  const initialState: Page<Product[]> = {
    currentPage: 0,
    totalPage: 0,
    data: [
      {
        id: 1,
        name: '雪碧',
        description: '大声你的逼逼',
        imageUrl: 'http://####',
        price: new BigNumber(2.5),
      }
    ],
  };
  const mockProducts: Page<Product[]> = {
    currentPage: 1,
    totalPage: 10,
    data: [
      {
        id: 1,
        name: '雪碧',
        description: '大声你的逼逼',
        imageUrl: 'http://####',
        price: new BigNumber(2.5),
      },
      {
        id: 2,
        name: '可乐',
        description: '快乐水',
        imageUrl: 'http://####',
        price: new BigNumber(2.5),
      },
    ]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductListComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        provideMockStore({initialState})
      ]
    });
    routerSpy = TestBed.inject(Router);
    mockStore = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should return init products and page number', () => {
    expect(component.currentPage).toEqual(1);
  });

  it('should navigate url', () => {
    component.onCreateProduct();
    const spy = routerSpy.navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toEqual(['/product/create']);
  });
});

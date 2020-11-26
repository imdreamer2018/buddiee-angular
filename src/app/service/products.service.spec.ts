import { ProductsService } from './products.service';
import {Product} from '../product';
import {ProductsApi} from '../api/products';
import {Page} from '../page';
import {of} from 'rxjs';

describe('ProductsService', () => {
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
  const product: Product = {
    id: 1,
    name: '雪碧',
    description: '大声你的逼逼',
    imageUrl: 'http://####',
    price: 2.5,
  };
  const productRequest: Product = {
    name: '雪碧',
    description: '大声你的逼逼',
    imageUrl: 'http://####',
    price: 2.5,
  };
  const setUp = () => {
    const productsApiSpy = jasmine.createSpyObj(
      'ProductsApi',
      ['getProducts', 'getProduct',
        'createProduct', 'deleteProduct']);
    const service: ProductsService = new ProductsService(productsApiSpy);
    return { service, productsApiSpy};
  };

  it('should be created', () => {
    const { service } = setUp();
    expect(service).toBeTruthy();
  });

  it('should return products page when get products by pageNumber and pageSize', () => {
    const { service, productsApiSpy } = setUp();
    productsApiSpy.getProducts.and.returnValue(of(products));
    service.getProducts(1).subscribe(productsResponse => {
      expect(productsResponse).toEqual(products);
    });
    expect(productsApiSpy.getProducts).toHaveBeenCalledTimes(1);
  });

  it('should return product detail when get product by id', () => {
    const { service, productsApiSpy } = setUp();
    productsApiSpy.getProduct.and.returnValue(of(product));
    service.getProduct(1).subscribe(productResponse => {
      expect(productResponse).toEqual(product);
    });
    expect(productsApiSpy.getProduct).toHaveBeenCalledWith(1);
    expect(productsApiSpy.getProduct).toHaveBeenCalledTimes(1);
  });

  it('should return product info when create product', () => {
    const { service, productsApiSpy } = setUp();
    productsApiSpy.createProduct.withArgs(productRequest).and.returnValue(of(product));
    service.createProduct(productRequest).subscribe(productResponse => {
      expect(productResponse).toEqual(product);
    });
    expect(productsApiSpy.createProduct).toHaveBeenCalledWith(productRequest);
    expect(productsApiSpy.createProduct).toHaveBeenCalledTimes(1);
  });

  it('delete product by id', () => {
    const { service, productsApiSpy } = setUp();
    service.deleteProduct(1);
    expect(productsApiSpy.deleteProduct).toHaveBeenCalledWith(1);
    expect(productsApiSpy.deleteProduct).toHaveBeenCalledTimes(1);
  });
});

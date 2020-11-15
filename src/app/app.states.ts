import {Product} from './product';
import {Page} from './page';

export interface AppState {
  products: Page<Product[]>;
  product: Product;
}

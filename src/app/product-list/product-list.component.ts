import { Component, OnInit } from '@angular/core';
import {Page} from '../page';
import {Product} from '../product';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectorProducts} from '../store/selectors/products.selector';
import {loadProducts} from '../store/actions/products.action';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products?: Page<Product[]>;
  currentPage: number;

  constructor(private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.currentPage = 1;
    this.store.select(selectorProducts).subscribe(products => this.products = products);
    this.store.dispatch(loadProducts({pageNumber: this.currentPage}));
  }

}

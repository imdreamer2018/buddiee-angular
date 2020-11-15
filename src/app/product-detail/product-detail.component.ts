import { Component, OnInit } from '@angular/core';
import {Product} from '../product';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {selectorProduct} from '../store/selectors/products.selector';
import {map, mergeMap} from 'rxjs/operators';
import {loadProduct} from '../store/actions/products.action';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product?: Product;
  constructor(private route: ActivatedRoute,
              private store: Store) { }

  ngOnInit(): void {
    this.store.select(selectorProduct).subscribe(product => this.product = product);
    this.route.paramMap.pipe(
      map(paramMap => Number(paramMap.get('id'))),
      map(id => id)
    ).subscribe(id => {
      this.store.dispatch(loadProduct({id}));
    });
  }

}

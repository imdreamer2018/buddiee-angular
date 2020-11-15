import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  constructor(private message: NzMessageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  productDetail(): void {
    this.router.navigate([`products/${this.product.id}`]);
  }
}

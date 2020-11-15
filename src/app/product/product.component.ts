import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../product';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Router} from '@angular/router';
import {ProductsService} from '../service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product;
  constructor(private message: NzMessageService,
              private router: Router,
              private productsService: ProductsService) { }

  ngOnInit(): void {
  }

  productDetail(): void {
    this.router.navigate([`/products/${this.product.id}`]);
  }
  deleteProduct(): void {
    this.productsService.deleteProduct(this.product.id).subscribe(
      () => {
        this.message.success('删除商品成功！');
        window.location.reload();
      },
      error => {
        this.message.error(error);
      }
    );
  }
  cancelDelete(): void {
    this.message.info('取消删除商品');
  }

  confirmDelete(): void {
    this.deleteProduct();
  }
}

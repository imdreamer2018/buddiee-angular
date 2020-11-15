import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NzUploadChangeParam, NzUploadFile} from 'ng-zorro-antd/upload';
import {getFileBase64} from '../util/geFileBase64';
import {ProductsService} from '../service/products.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  validateForm!: FormGroup;
  previewImage: string | undefined = '';
  uploadImage: string | undefined = '';
  acceptFileType: string;
  previewVisible = false;
  fileList: NzUploadFile[] = [];
  constructor(private fb: FormBuilder,
              private message: NzMessageService,
              private productsService: ProductsService,
              private router: Router) {
    this.acceptFileType = 'image/jpeg,image/png,image/jpg';
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      name: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });
  }

  submitForm(value: { name: string; description: string; price: number }): void {
    if (this.previewImage === '') {
      this.message.error('请上传商品图片！');
    }
    this.productsService.createProduct(
      {
        name: value.name,
        description: value.description,
        imageUrl: this.uploadImage,
        price: value.price}).subscribe(
      () => {
            this.message.success('创建成功');
            this.router.navigate(['/products']);
          },
      error => {
        this.message.error(error);
      }
    );
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
  }

  handlePreview = async (file: NzUploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getFileBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  }
  handleChange = async (file: NzUploadChangeParam) => {
    if (file.file.status === 'done') {
      if (!file.file.thumbUrl) {
        file.file.upload = await getFileBase64(file.file.originFileObj);
      }
    }
    this.uploadImage = file.file.thumbUrl || file.file.upload;
  }

}

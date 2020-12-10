import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import { ProductListComponent } from './components/products/product-list/product-list.component';
import { ProductDetailComponent } from './components/products/product-detail/product-detail.component';
import {AppRoutingModule} from './module/app-routing/app-routing.module';
import {AppStoreModule} from './module/app-store/app-store.module';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductComponent } from './components/products/product/product.component';
import {NzPaginationModule} from 'ng-zorro-antd/pagination';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzModalModule} from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ProductCreateComponent } from './components/products/product-create/product-create.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzInputNumberModule} from 'ng-zorro-antd/input-number';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzTypographyModule} from 'ng-zorro-antd/typography';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import { LoginComponent } from './components/login/login.component';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {JwtInterceptor} from './helpers/JwtInterceptor';
import {ErrorInterceptor} from './helpers/ErrorInterceptor';

registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductDetailComponent,
    ProductComponent,
    ProductCreateComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AppStoreModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzPaginationModule,
    NzIconModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    NzInputModule,
    NzInputNumberModule,
    NzUploadModule,
    NzMessageModule,
    NzTypographyModule,
    NzPopconfirmModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: zh_CN },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

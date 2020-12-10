import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from '../../components/products/product-detail/product-detail.component';
import {ProductListComponent} from '../../components/products/product-list/product-list.component';
import {ProductCreateComponent} from '../../components/products/product-create/product-create.component';
import {LoginComponent} from '../../components/login/login.component';
import {AuthGuard} from '../../helpers/AuthGuard';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailComponent, canActivate: [AuthGuard]},
  {path: 'products', component: ProductListComponent, canActivate: [AuthGuard]},
  {path: 'product/create', component: ProductCreateComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: '**', redirectTo: 'products'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

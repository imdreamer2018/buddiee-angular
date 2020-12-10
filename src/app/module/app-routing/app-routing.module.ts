import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductDetailComponent} from '../../products/product-detail/product-detail.component';
import {ProductListComponent} from '../../products/product-list/product-list.component';
import {ProductCreateComponent} from '../../products/product-create/product-create.component';

const routes: Routes = [
  {path: 'products/:id', component: ProductDetailComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'product/create', component: ProductCreateComponent},
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

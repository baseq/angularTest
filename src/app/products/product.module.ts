import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailGuard } from './product-detail.guard';

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ConvertToSpacesPipe
  ],
  imports: [
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: ProductListComponent },
      {
        path: ':id',
        component: ProductDetailComponent,
        canActivate: [ProductDetailGuard]
      }
    ]),
    SharedModule
  ]
})
export class ProductModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BannerComponent } from './banner/banner.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './login/auth.guard'

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      {
        path: 'products',
        loadChildren: () => import('./products/product.module').then(m => m.ProductModule),
        canActivate: [AuthGuard],
      },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ], {
      onSameUrlNavigation: 'reload'
    }),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

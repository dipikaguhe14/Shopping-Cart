import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms'
import {HttpClientModule} from '@angular/common/http';
import { IndexComponent } from './index/index.component';
import { SharedComponent } from './shared/shared.component';
import { LayoutsComponent } from './layouts/layouts.component';
import { LoginComponent } from './index/login/login.component';
import { FooterComponent } from './index/footer/footer.component';
import { NavbarComponent } from './index/navbar/navbar.component';
import { ProductComponent } from './layouts/product/product.component';
import { TaskBoardComponent } from './layouts/task-board/task-board.component';
import { UserComponent } from './layouts/user/user.component';
import { AddProductComponent } from './layouts/product/add-product/add-product.component';
import { BestProductComponent } from './layouts/product/best-product/best-product.component';
import { CartCalculatorComponent } from './layouts/product/cart-calculator/cart-calculator.component';
import { CartProductsComponent } from './layouts/product/cart-products/cart-products.component';
import { CheckoutComponent } from './layouts/product/checkouts/checkouts.component';
import { FavouriteProductComponent } from './layouts/product/favourite-product/favourite-product.component';
import { ProductDetailsComponent } from './layouts/product/product-details/product-details.component';
import { ProductListComponent } from './layouts/product/product-list/product-list.component';
import { UserAccountComponent } from './layouts/user/user-account/user-account.component';
import {TranslateService} from './shared/services/translate.service';
export function setupTranslateFactory(service: TranslateService): Function {
	return () => service.use('en');
}



@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    SharedComponent,
    LayoutsComponent,
    LoginComponent,
    FooterComponent,
    NavbarComponent,
    ProductComponent,
    TaskBoardComponent,
    UserComponent,
    AddProductComponent,
    BestProductComponent,
    CartCalculatorComponent,
    CartProductsComponent,
    CheckoutComponent,
    FavouriteProductComponent,
    ProductDetailsComponent,
    ProductListComponent,
    UserAccountComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

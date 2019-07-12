import {NgModule}from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router'
import {ProductRoutes} from './product.routing';
import { AddProductComponent } from './add-product/add-product.component';
import { BestProductComponent } from './best-product/best-product.component';
import { CartCalculatorComponent } from './cart-calculator/cart-calculator.component';
import { CartProductsComponent } from './cart-products/cart-products.component';
import { CheckoutComponent } from './checkouts/checkouts.component';
import { FavouriteProductComponent } from './favourite-product/favourite-product.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BillingDetailsComponent } from './checkouts/billing-details/billing-details.component';
import { CheckoutNavbarComponent } from './checkouts/checkout-navbar/checkout-navbar.component';
import { ProductsComponent } from './checkouts/products/products.component';
import { ResultComponent } from './checkouts/result/result.component';
import { ShippingDetailsComponent } from './checkouts/shipping-details/shipping-details.component';
@NgModule({
    imports:[CommonModule,RouterModule.forChild(ProductRoutes)],
    declarations:[

    AddProductComponent,

    BestProductComponent,

    CartCalculatorComponent,

    CartProductsComponent,

    CheckoutComponent,

    FavouriteProductComponent,

    ProductDetailsComponent,

    BillingDetailsComponent,

    CheckoutNavbarComponent,

    ProductsComponent,

    ResultComponent,

    ShippingDetailsComponent],
    exports:[]
})
export class ProductModule{

}
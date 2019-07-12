import { Component, OnInit,ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Product} from '../../../../shared/model/product';
import {User,UserDetails} from '../../../../shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { BillingService } from 'src/app/shared/services/billing.service';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-billing-details',
  templateUrl: './billing-details.component.html',
  styleUrls: ['./billing-details.component.css']
})
export class BillingDetailsComponent implements OnInit {
  UserDetails:User;
  product:Product[];
  userDetail:UserDetails;
  constructor(authService:AuthService,
              private billingService:BillingService,
              productService:ProductService,
              private router:Router) { 
                document.getElementById('productsTab').style.display='none';
                document.getElementById('shippingTab').style.display='none';
                document.getElementById('billingTab').style.display='block';
                document.getElementById('resultTab').style.display='none';

                this.userDetail=new UserDetails();
                this.product=productService.getLocalCartProducts();
                this.UserDetails=authService.getLoggedInUser();
              }

  ngOnInit() {
  }
UpdateUserDetails(form:NgForm){
  const data=form.value;
  data['emailId']=this.UserDetails.emailId;
  data['userId']=this.userDetail.$key;
  let totalPrice=0;
  const products=[];
  this.product.forEach((product)=>{
    delete product['$key'];
    totalPrice+=product.productPrice;
    products.push(product);
  });
  data['products']=products;
  data['totalrice']=totalPrice;
  data['billingDetail']=Date.now();
  this.billingService.createBillings(data);
  this.router.navigate(['checkouts',{outlets:{checkOutlet:['result']}}]);
}
}

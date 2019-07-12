import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {Product} from '../../../../shared/model/product';
import {UserDetails,User} from '../../../../shared/model/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ShippingService } from 'src/app/shared/services/shipping.service';
import { ProductService } from 'src/app/shared/services/product.service';
@Component({
  selector: 'app-shipping-details',
  templateUrl: './shipping-details.component.html',
  styleUrls: ['./shipping-details.component.css']
})
export class ShippingDetailsComponent implements OnInit {
userDetails:UserDetails;
user:User;
product:Product[];
  constructor(authservice:AuthService,
    private shippingservice:ShippingService,
    productservice:ProductService,
    private router:Router) {
      document.getElementById('productsTab').style.display='none';
      document.getElementById('shippingTab').style.display='block';
      document.getElementById('resultTab').style.display='none';
      this.user=authservice.getLoggedInUser();
      this.userDetails=new UserDetails();
      this.product=productservice.getLocalCartProducts();
     }

  ngOnInit() {}

  updateuserdetails(form:NgForm){
    const data=form.value;
    data['emailId']=this.userDetails.emailId;
    data['userId']=this.userDetails.$key;
    const products=[];
    let totalPrice=0;
    this.product.forEach(product => {
      delete product['$key'];
      totalPrice+=product.productPrice;
      products.push(product);
    });
    data['products'] = products;

		data['totalPrice'] = totalPrice;

    data['shippingDate'] = Date.now();
    this.shippingservice.createshippings(data);
    this.router.navigate(['checkouts',{outlets:{checkOutlet:['billing-details']}}]);
  }

}

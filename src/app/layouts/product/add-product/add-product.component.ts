import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {ProductService}from '../../../shared/services/product.service';
import {Product} from '../../../shared/model/product';
declare var $:any;
declare var require:any;
declare var toastr:any;
const shortid=require('shortid');
const moment =require('moment');

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  product:Product=new Product();

  constructor(private productService:ProductService) { }

  ngOnInit() {
  }
  createProduct(productForm:NgForm){
    productForm.value['productId']='PROD_'+shortid.generate();
    productForm.value['productAdded']=moment.unix();
    productForm.value['ratings']=Math.floor(Math.random()*5+1);
    if (productForm.value['productImageUrl'] === undefined) {
			productForm.value['productImageUrl'] = 'http://via.placeholder.com/640x360/007bff/ffffff';
    }
    productForm.value['favourite']=false;
    const date=productForm.value['productAdded'];
    this.productService.createProduct(productForm.value);
    this.product=new Product();
    $('#exampleModalLong').modal('hide');
    toastr.success('product',productForm.value['productName'],'is added successfully','product creation');
  }

}

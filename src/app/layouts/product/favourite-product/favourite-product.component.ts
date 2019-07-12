import { Component, OnInit } from '@angular/core';
import {Product} from '../../../shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
@Component({
  selector: 'app-favourite-product',
  templateUrl: './favourite-product.component.html',
  styleUrls: ['./favourite-product.component.css']
})
export class FavouriteProductComponent implements OnInit {
  favouriteProducts:Product[];
  datanotfound=true;
  //message not foud
  messageTitle='No favourite products found';
  messageDescription='plz, choose your favourite product';

  constructor(private productservice:ProductService) { }

  ngOnInit() {
    this.getFavouriteProducts();
  }
  removefavouriteProducts(product:Product){
    this.productservice.removeLocalCartProduct(product);
    this.getFavouriteProducts();
  }
  getFavouriteProducts(){
    this.favouriteProducts=this.productservice.getLocalFavouriteProducts();
  }

}

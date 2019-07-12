import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList,AngularFireObject} from 'angularfire2/database';
import {Product} from '../../shared/model/product';
import { AuthService } from './auth.service';
import { ToastrService } from './toastr.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
products:AngularFireList<Product>;
product:AngularFireObject<Product>;

favouriteProducts:AngularFireList<FavouriteProduct>
FavouriteProduct:AngularFireObject<FavouriteProduct>

NavBarCartCount=0;
NavBarFavProdCount=0;
  constructor(
    private db:AngularFireDatabase,
    private authservice:AuthService,
    private toastrservice:ToastrService
  ) {
    this.calculateLocalFavProdCounts();
		this.calculateLocalCartProdCounts();
    }
  createProduct(data:Product){
    this.products.push(data);
  }
  getProduct(){
    this.products=this.db.list('products');
    return this.products;
  }
  updateProduct(data:Product){
    this.products.update(data.$key,data);
  }
  deleteProduct(key:string){
    this.products.remove(key);
  }
  getProductById(key: string) {
		this.product = this.db.object('products/' + key);
		return this.product;
	}
 /// Favourite products////

  getUsersFavouriteProduct(){
    const user=this.authservice.getLoggedInUser();
    this.favouriteProducts=this.db.list('favouriteProducts',(ref)=>
    ref.orderByChild('userId').equalTo(user.$key));
    return this.favouriteProducts;
  }
  addFavouriteProduct(data:Product):void{
let a:Product[];
a=JSON.parse(localStorage.getItem('avf_item'))||[];
a.push(data);
this.toastrservice.wait('Adding product','Adding product as favourite');
setTimeout(()=>{
  localStorage.setItem('avf_item',JSON.stringify(a));
  this.calculateLocalFavProdCounts();},1500);

  }
  getLocalFavouriteProducts():Product[]{
const products:Product[]=JSON.parse(localStorage.getItem('avf_item'))||[];
return products;
  }
  removeFavouriteProducts(key:string){
    this.favouriteProducts.remove(key);
  }

  //removing favourite from local storage
  removeLocalFavourite(product:Product){
    const products:Product[]=JSON.parse(localStorage.getItem('avf_item'));
    for(let i=0;i<products.length;i++){
      if(products[i].productId==product.productId){
        products.slice(i,1);
        break;
      }
    }
    localStorage.setItem('avf_item',JSON.stringify(products));
    this.calculateLocalFavProdCounts();
  }
  calculateLocalFavProdCounts(){
    this.NavBarFavProdCount = this.getLocalFavouriteProducts().length;;
  }

  //// cart products  ////
  addToCart(data:Product):void{
    let a:Product[];
    a=JSON.parse(localStorage.getItem('avct_item'))||[];
    a.push(data);
    this.toastrservice.wait('Adding product','Adding product to cart');
    setTimeout(()=>{
      localStorage.setItem('avct_item',JSON.stringify(a));
      this.calculateLocalFavProdCounts();},1500);
        
  }
  removeLocalCartProduct(product:Product){
    const products:Product[]=JSON.parse(localStorage.getItem('avct_item'));
    for(let i=0;i<products.length;i++){
      if(products[i].productId==product.productId){
        products.slice(i,1);
        break;
      }
    }
    localStorage.setItem('avct_item',JSON.stringify(products));
    this.calculateLocalFavProdCounts();
  }
  getLocalCartProducts():Product[]{
    const products:Product[]=JSON.parse(localStorage.getItem('avct_item'))||[];
    return products;
    
}
  calculateLocalCartProdCounts(){
this.NavBarCartCount=this.getLocalCartProducts().length;
  }
  
  
  
}
export class FavouriteProduct{
  product: Product;
	productId: string;
	userId: string;
}
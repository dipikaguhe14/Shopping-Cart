import { Component, OnInit,OnDestroy } from '@angular/core';
import {Product} from '../../../shared/model/product';
import {ActivatedRoute, Route} from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  private sub:any;
  product:Product;
  constructor(private route:ActivatedRoute,
          private productservice:ProductService,
          private toastrservice:ToastrService
  ) {
    this.product=new Product();
   }

  ngOnInit() {
    this.sub=this.route.params.subscribe((params)=>{
      const id=params['id'];
      this.getProductDetails(id);
    });
  }
  getProductDetails(id:string){
    const x=this.productservice.getProductById(id);
    x.snapshotChanges().subscribe(
      (product)=>{
        const y=product.payload.toJSON() as Product;
        y['$key']=id;
        this.product=y;
      },
      (error)=>{
        this.toastrservice.error('error while fetching details ',error);
      }
    );
  }
  addToCart(product: Product) {
		this.productservice.addToCart(product);
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
}

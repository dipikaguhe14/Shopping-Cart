import { Component, OnInit } from '@angular/core';
import {Product} from '../../../shared/model/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ToastrService } from 'src/app/shared/services/toastr.service';
import { TranslateService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'app-best-product',
  templateUrl: './best-product.component.html',
  styleUrls: ['./best-product.component.css']
})
export class BestProductComponent implements OnInit {
  bestProduct:Product[]=[];
  options:any;
  loading=false;

  constructor(
    private productService:ProductService,
    private toastrService:ToastrService,
    public translate:TranslateService
) { }

  ngOnInit() {
    this.options={
      dots:false,
      responsive:{
        '0': { items: 1, margin: 5 },
				'430': { items: 2, margin: 5 },
				'550': { items: 3, margin: 5 },
				'670': { items: 4, margin: 5 }
      },
      autoplay:true,
      loop:true,
      autoplayTimeout:3000,
      lazyLoad:true
    }
    this.getAllproducts();
  }
  getAllproducts(){
    this.loading=true;
    const x=this.productService.getProduct();
    x.snapshotChanges().subscribe(
      (product)=>{
        this.loading=false;

        this.bestProduct=[];
        for(let i=0;i<5;i++){
const y=product[i].payload.toJSON();
y['$key']=product[i].key;
this.bestProduct.push(y as Product);
        }
      },
      (error=>{
        this.toastrService.error("error while fetching product details",error);
      })
    );
  }

}

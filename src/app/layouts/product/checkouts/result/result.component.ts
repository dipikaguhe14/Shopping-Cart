
import { Component, OnInit } from '@angular/core';
import {Product} from '../../../../shared/model/product';
import {ProductService} from  'src/app/shared/services/product.service';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
declare var $:any; 
@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  products:Product[];
  date:number;
  totalPrice=0;
  tax=6.4;
  constructor(private productService:ProductService) {
    document.getElementById('productsTab').style.display='none';
    document.getElementById('shippingTab').style.display='none';
    document.getElementById('billingTab').style.display='none';
    document.getElementById('resultTab').style.display='block';
  this.products=productService.getLocalCartProducts();
  this.products.forEach((product)=> {
    this.totalPrice+=product.productPrice;
  });
  this.date=Date.now();
  }

  ngOnInit() {
  }
downloadReceipt(){
  const data=document.getElementById('receipt');
  html2canvas(data).then((canvas)=>{
    const imgwidth=208;
    const imgHeight=295;
    const pageHeight=canvas.height*imgwidth/canvas.width;
    const heightLeft=imgHeight;
    const contentDataUrl=canvas.toDataURL('image/png');
    const pdf=new jspdf('p','mm','a4');
    const position=0;
    pdf.addImage(contentDataUrl,'PNG',0,position,imgwidth,imgHeight);
    pdf.save('ikismail.pdf');
  });
}
}

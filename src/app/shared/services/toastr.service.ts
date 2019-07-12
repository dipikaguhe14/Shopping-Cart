import { Injectable } from '@angular/core';

declare var toastr:any;
@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor() { }
  success(title, msg) {
		toastr.success(msg, title);
  }
  error(title, msg){
    toastr.error(msg, title);
  }
wait(title,msg){
toastr.wait(msg,title);
}
}

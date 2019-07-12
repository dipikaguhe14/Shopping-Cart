import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Title} from '@angular/platform-browser';
import { resolve } from 'url';
import { reject } from 'q';
@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  data:any={};
  constructor(private httpClient :HttpClient,
              private title:Title) { }
  use(lang:string):Promise<{}>{
    return new Promise<{}>((resolve,reject)=>{
      const langpath=`assets/i18n/${lang || "en"}.json`;
      this.httpClient.get<{}>(langpath).subscribe(
        translation=>{
          this.data=Object.assign({},translation||{});
          this.title.setTitle(this.data['TITLE']);
          resolve(this.data);
        },
        error=>{
          this.data = {};
          console.log("Error");
          resolve(this.data);
        }
      );
    });
  }
}

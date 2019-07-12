import { Injectable } from '@angular/core';
import {AngularFireDatabase,AngularFireList} from 'angularfire2/database';
import { User } from '../model/user';
import * as moment from 'moment';
import { AngularFireAuth } from 'angularfire2/auth';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser:User=new User();
users:AngularFireList<User>;
loacation:{
  lon:null;
  lat:null;
};
  constructor(private db:AngularFireDatabase) {
    this.getUser();
   }
   getUser(){
     this.users=this.db.list("clients");
     return this.users;
   }
  createUser(data:any){
    data.location=this.loacation;
    data.createdOn=moment(new Date()).format('X');
    data.isAdmin=false;
    this.users.push(data);
  }
  isAdmin(emailId:string){
    return this.db.list("clients",ref=>
      ref.orderByChild('email').equalTo(emailId)
    );
  }
  updateUser(user:User){
    this.users.update(user.$key,user);
  }
  setLocation(lat,lon){
    this.loacation.lat=lat;
    this.loacation.lon=lon;
  }
}

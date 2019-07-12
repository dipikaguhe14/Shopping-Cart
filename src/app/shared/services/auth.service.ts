import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import{Observable} from 'rxjs';
import {User} from '../model/user';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:Observable<firebase.User>;
  userDetails:firebase.User=null;
  loggedUser;
  dbUser;
  constructor(private firebaseAuth:AngularFireAuth,private router:Router,private userService:UserService) {
    this.user=firebaseAuth.authState;
    this.dbUser=new User();
    this.user.subscribe(user=>{
      if(user){
        this.userDetails=user;
        userService.isAdmin(this.userDetails.email)
                  .snapshotChanges()
                  .subscribe(data=>{
                    data.forEach(e1 => {
                      const y=e1.payload.toJSON();
                      this.dbUser=y;
                    });
                  })
      }
      else {
        this.userDetails=null;
      }

    })
   }
   isLoggedIn():boolean{
    if(this.userDetails!=null)
    return true;
    else return false;
   }
   logout(){
     this.loggedUser=null;
     this.firebaseAuth.auth.signOut().then(res=>this.router.navigate(['/']));
   }
  createUserwithEmailandPassword(emailId,password){
    return this.firebaseAuth.auth.createUserWithEmailAndPassword(
      emailId,
      password
    );
  }
  getLoggedInUser():User{
    const loggedUser: User=new User();
    const user:firebase.User=this.firebaseAuth.auth.currentUser;
    if(user){
      this.userDetails=user;
      if(user!=null){
        loggedUser.$key=user.uid;
        loggedUser.userName=user.displayName;
        loggedUser.emailId=user.email;
        loggedUser.phoneNumber=user.phoneNumber;
        loggedUser.photo =user.photoURL;
        loggedUser.isAdmin=this.dbUser['isAdmin'];
      }
      
    }
    else{
      this.userDetails=null;
    }
return loggedUser;
  }
  isAdmin():boolean{
    const user:User=this.getLoggedInUser()
    if(user!=null){
      if(user.isAdmin===true)return true;
    }
    else return false;
  }
  signInRegular(email,password){
    const credentials=firebase.auth.EmailAuthProvider.credential(email,password);
    return this.firebaseAuth.auth.signInWithEmailAndPassword(email,password);
    
  }
  signInWithGoogle(){
    return this.firebaseAuth.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    );
  }
}

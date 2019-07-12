import { Component, OnInit } from '@angular/core';
import {ToastrService} from './../../shared/services/toastr.service';
import {NgForm,EmailValidator} from '@angular/forms';
import {Router,ActivatedRoute} from '@angular/router';
import {UserService} from './../../shared/services/user.service';
import {AuthService} from './../../shared/services/auth.service';
import {User} from './../../shared/model/user';
import { setTimeout } from 'timers';
import { $ } from 'protractor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user={
    emailId:"",
    password:""
  };
  errorInUserCreate=false;
  errorMessage:any;
  createUser;
  constructor( private authService:AuthService, 
              private userService:UserService,
              private toastrService:ToastrService,
              private router: Router,
              private route: ActivatedRoute) {
                this.createUser=new User();
               }


  ngOnInit() {
  }
  addUser(userForm:NgForm){
    userForm.value['isAdmin']=false;
    this.authService.createUserwithEmailandPassword(userForm.value['emailId'],userForm.value['password'])
    .then(res=>{
      const user={
        email:res.user.email,
        famil_name:res.user.displayName,
        uid:res.user.uid,
        verified_email:res.user.emailVerified,
        phoneNumber:res.user.phoneNumber,
        picture:res.user.photoURL
      };
      this.userService.createUser(user);
      this.toastrService.success("registering","userregistraion");
      setTimeout((router:Router)=>{
        $('#createUserForm').modal('hide');
        this.router.navigate(['/']);
      },1500);
    })
    .catch((err)=>{
      this.errorInUserCreate=true;
      this.errorMessage=err;
      this.toastrService.error("Error while creating User",err);
    });

  }
signInWithEmail(userForm:NgForm){
  this.authService.signInRegular(userForm.value['emailID'],userForm.value['loginPassword'])
  .then((res)=>{
    this.toastrService.success("Authentication Success","Logging in plz wait");
    const returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
    setTimeout((router:Router)=>{
      this.router.navigate([returnUrl||'/']);
    },1500);
    this.router.navigate(['/']);
  }).catch((err)=>{
    this.toastrService.error("Authentication Failed","invalid credentials,plz check email and password")
  });
}
signInWithGoogle(){
  this.authService.signInWithGoogle()
  .then((res)=>{
    if(res.additionalUserInfo.isNewUser){
      this.userService.createUser(res.additionalUserInfo);
    }
    const returnUrl=this.route.snapshot.queryParamMap.get('returnUrl');
    location.reload();
    this.router.navigate(['/']);
  })
  .catch((err)=>{
this.toastrService.error('ErrorOccured','plz try again');
  });
}
}

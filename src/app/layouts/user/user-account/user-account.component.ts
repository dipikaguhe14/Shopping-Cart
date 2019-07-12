import { Component, OnInit } from '@angular/core';
import {User} from '../../../shared/model/user';
import{AuthService}from '../../../shared/services/auth.service';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
loggedUser:User;

  constructor(private authservice:AuthService) { }

  ngOnInit() {
    this.loggedUser=this.authservice.getLoggedInUser();
  }

}

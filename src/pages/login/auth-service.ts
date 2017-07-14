import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
/*
export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}
*/
export class AuthService {
//  currentUser: User;
 
  public login(credentials) {
    if (credentials.user == "" || credentials.password == "") {
     return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
      //  let access = (credentials.password === "pass" && credentials.user === "user");
      //  this.currentUser = new User('Simon', 'saimon@devdactic.com');
        observer.next(false);
        observer.complete();
        
      });
     
    }

  }


}
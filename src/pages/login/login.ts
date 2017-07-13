import { Component } from '@angular/core';
import { NavController} from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

   logEvent(event) {
    console.log(event);
  }

}
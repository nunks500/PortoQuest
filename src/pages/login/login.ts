import { Component } from '@angular/core';
import { NavController, LoadingController, Loading} from 'ionic-angular';

@Component({
  templateUrl: 'login.html'
})
export class LoginPage {

	loading: Loading;
	
  constructor(public navCtrl: NavController, private loadingCtrl: LoadingController) {

  }

   public login() {
    this.showLoading();
   /* this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.nav.setRoot('HomePage');
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
        this.showError(error);
      });
      */
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
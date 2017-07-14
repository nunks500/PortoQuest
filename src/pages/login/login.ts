import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../login/auth-service';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	loading: Loading;
  registerCredentials = { user: '', password: '' };

  constructor(public navCtrl: NavController, private auth: AuthService, private loadingCtrl: LoadingController,  private alertCtrl: AlertController) {

  }

   public login() {
    this.showLoading();
      this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {        
        this.navCtrl.setRoot(TabsPage);
      } else {
        this.showError("Access Denied");
      }
    },
      error => {
       this.showError(error);
      });
  }


  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
    showError(text) {
   this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);

  }

}
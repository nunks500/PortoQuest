import { Component } from '@angular/core';
import { Platform, NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Http } from '@angular/http';

@Component({
	selector: 'register',
  templateUrl: 'register.html'
})
export class RegisterPage {
	loading: Loading;
	registerCredentials = { user: '', password: '' , name: '', email: ''};

  constructor( public platform: Platform, public navCtrl: NavController,private alertCtrl: AlertController,private loadingCtrl: LoadingController, public http: Http) {
  	 platform.ready().then(() => {
  	 	platform.registerBackButtonAction(() => {
  	 		this.navCtrl.setRoot(LoginPage);

  	 	});
  	 });


  }

  public register(){
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
if(!re.test(this.registerCredentials.email)) {
  this.showError('Invalid Email');
}
else{
  this.showLoading();
  	const body = {username: this.registerCredentials.user, password: this.registerCredentials.password, email: this.registerCredentials.email, name: this.registerCredentials.name}
  	this.http.post('https://porto-quest.herokuapp.com/api/createuser',body).map(res => res.json()).subscribe(data => {
      this.showError2('Your account has been created','Success');
  		this.navCtrl.setRoot(LoginPage);
  	},
      error => {
       this.showError(error);
      });

  }
}

    showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

   showError2(text,text2) {
     this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: text2,
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);

  }


      showError(text) {
    let alert = this.alertCtrl.create({
      
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);

  }

}
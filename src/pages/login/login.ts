import { Component } from '@angular/core';
import { NavController, LoadingController, Loading, AlertController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../login/auth-service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'login',
  templateUrl: 'login.html'
})
export class LoginPage {

	loading: Loading;
  registerCredentials = { user: '', password: '' };
 

  constructor(public navCtrl: NavController, private auth: AuthService, private loadingCtrl: LoadingController,  private alertCtrl: AlertController,private facebook: Facebook, public http: Http) {

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

  public loginfacebook() {
     this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse)=>{

        this.facebook.api('me?fields=id,name,email,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile =>{

            
            const body = {username: profile['id'],name: profile['name'],password: profile['id'],email: profile['email'], fb: '1', image: profile.picture_large.data['url']};
            const body2 = {username: profile['id']};
            
              
             this.http.post('https://porto-quest.herokuapp.com/api/getuser',body2).map(res3 => res3.json()).subscribe(data3 => {
                this.auth.setuserid(data3[0].id);
            this.navCtrl.setRoot(TabsPage);

             },
             error =>{
                this.http.post('https://porto-quest.herokuapp.com/api/createuser',body).map(res => res.json()).subscribe(data => {
                  this.http.post('https://porto-quest.herokuapp.com/api/getuser',body2).map(res2 => res2.json()).subscribe(data2 => {
              
              this.auth.setuserid(data2[0].id);
            this.navCtrl.setRoot(TabsPage);


});
              });
             });



      }
          )

      }
        )
        
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
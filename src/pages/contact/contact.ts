import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthService } from '../login/auth-service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  	profilePicture: any;

  constructor(public navCtrl: NavController, public http: Http, private auth: AuthService) {

  				var temp = this.auth.getuserid();
  				console.log(temp);
  	            const body = {id: temp};
       		this.http.post('https://porto-quest.herokuapp.com/api/getuserbyid',body).map(res => res.json()).subscribe(data => {
       			console.log(data[0]);
        		this.profilePicture = data[0].image;

});


  }

}

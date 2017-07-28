import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	  posts: any;
	  html;

  constructor(public navCtrl: NavController, public http: Http) {
  	   this.http.get('https://porto-quest.herokuapp.com/api/getlatobj').map(res => res.json()).subscribe(data => {
        this.posts = data;
        console.log(this.posts);
        console.log(data);
        this.posts.nome = data[0].nome;
        this.html = data[0].nome;

  });

}
}

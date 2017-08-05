import {Observable} from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import 'rxjs/add/observable/throw';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'

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
@Injectable()
export class AuthService {
      userid: number;  
//  currentUser: User;
constructor(public http: Http, private facebook: Facebook) { }
  

  public login(credentials) {
    if (credentials.user == "" || credentials.password == "") {
     return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
        // At this point make a request to your backend to make a real check!
      //  let access = (credentials.password === "pass" && credentials.user === "user");
      //  this.currentUser = new User('Simon', 'saimon@devdactic.com');
      //  this.logincall(credentials.user, credentials.password);
   /*   var headers = new Headers();
    headers.append('Content-Type', 'application/json');

let data = JSON.stringify({
  username: credentials.user,
  password: credentials.password
});
let hello = new RequestOptions({ headers: headers });
*/
//let body = this.jsonToURLEncoded({ username: credentials.username, password: credentials.password});
let data = JSON.stringify({
  username: credentials.user,
  password: credentials.password
});
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      /*headers.append('Access-Control-Allow-Origin: *');
    headers.append("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
    headers.append("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
*/
    this.http.post('https://porto-quest.herokuapp.com/api/login', data, {
        headers: headers
      })
      .map(res => res.json()).subscribe(
        data => {this.userid = data; 
       observer.next(true);
      observer.complete();},
        err => { observer.next(false);
        observer.complete();}
    );
     
    });

  }
}
/*
  public logincall(user,pass){
      let headers = new Headers(
{
  'Content-Type' : 'application/json'
});
let options = new RequestOptions({ headers: headers });

let data = JSON.stringify({
  username: user,
  password: pass
});

return new Promise((resolve, reject) => {
  this.http.post('https://porto-quest.herokuapp.com/api/login', data, options)
  .toPromise()
  .then((response) =>
  {
    console.log('API Response : ', response.json());
    resolve(response.json());
  })
  .catch((error) =>
  {
    console.error('API Error : ', error.status);
    console.error('API Error : ', JSON.stringify(error));
    reject(error.json());
  });
});
*/
public getuserid() {
    return this.userid;
  }

  public setuserid(id) {
    this.userid = id;
  }
 

  /*public log():void {
 console.log('Your message here');
      console.log("entrei merda");
      /*
      this.facebook.login(['email','public_profile']).then((response: FacebookLoginResponse)=>{

        this.facebook.api('me?fields=id,name,first_name,picture.width(720).height(720).as(picture_large)',[]).then(profile =>{

          console.log(profile);
        }



          )

      }
        )
        
      }

    */

  }

import { Component, ViewChild } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AuthService } from '../login/auth-service';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

   @ViewChild('map') mapElement;
 //  posts: any;
   map: any;
   items: any;
  constructor(public navCtrl: NavController, public geolocation: Geolocation, private auth: AuthService, public http: Http, private alertCtrl: AlertController) {
    this.geolocation.getCurrentPosition().then((position) => {
    console.log(position.coords.latitude + " " + position.coords.longitude);
    });
    
  }

  ionViewDidLoad(){
  		this.initMap();

  }

  deg2rad(deg) {
  return deg * (Math.PI/180)
}

 getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}


  initMap(){
         this.geolocation.getCurrentPosition().then((position) => {
         
let lin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

let lang = new google.maps.LatLng(41.1624937,-8.6304765);
  		let mapOptions = {
  				center: lang,
  				zoom: 13,
  				mapTypeId: google.maps.MapTypeId.ROADMAP

  		};

  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: lin,
      radius: 100
    });
    var temp = this.auth.getuserid();
    const body = {id: temp};


    this.http.post('https://porto-quest.herokuapp.com/api/getnotobjbyids',body).map(res => res.json()).subscribe(data => {

  var counter = 0; 
  var done = data;
        for(counter = 0;counter < data.length; counter++){
            var distance = this.getDistanceFromLatLonInKm(data[counter].lat,data[counter].lng,position.coords.latitude,position.coords.longitude);
            console.log("km: " + distance);
            var strings = 'You just visited ' + done[counter].nome + ' and won ' + done[counter].coins + ' coins';
       //     distance = 0.05;
             if(distance <= 0.1)
            {
                const body2 = {userid: temp,objid: data[counter].id};
                 this.http.post('https://porto-quest.herokuapp.com/api/insertobjcom',body2).map(res2 => res2.json()).subscribe(data2 => {
                       let alert = this.alertCtrl.create({
                      title: 'Congratulations',
                      subTitle: strings,
                       buttons: ['OK']
                      });
                      alert.present(prompt);
                      this.navCtrl.setRoot(this.navCtrl.getActive().component);

                    });
              
            }


        }


      
   });




        });
/*      let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

      directionsDisplay.setMap(this.map);*/
    //  var items = [{lat: 41.1456715, lng: -8.616795}, {lat: 41.152277, lng: -8.6114877}, {lat: 41.174247, lng: -8.6057957}];

     var ty = this.auth.getuserid();
    const body = {id: ty};

    this.http.post('https://porto-quest.herokuapp.com/api/getobjbyid',body).map(res => res.json()).subscribe(data => {
       this.http.post('https://porto-quest.herokuapp.com/api/getimgbyid',body).map(res2 => res2.json()).subscribe(data2 => {
       var items = data;
     //   this.createMarker(iten);
       // console.log("LOL");
       // this.posts.nome = data.nome;
       // this.html = data.nome;

       var temp = 0;
var img = 'http://i.stack.imgur.com/g672i.png';
var infowindow = new google.maps.InfoWindow( );
for(temp = 0;temp < items.length;temp++){
    console.log(data2[temp]);
    
    var marker = new google.maps.Marker({
        icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
        position: items[temp],
        map: this.map,
        title: 'Porras'
        });

       var counter2 = 0;

    for(counter2 = 0;counter2 < items.length; counter2++){

      if(items[temp].lat == data2[counter2].lat && items[temp].lng == data2[counter2].lng){
     google.maps.event.addListener(marker, 'click', (function (marker, temp) {
       var image = data2[counter2].image;
      var description = data2[counter2].description;
      var obj = data2[counter2].obj;
                return function () {
                    infowindow.setContent('<div style="float:left;padding: 10px;"><img src='+ image + '>' + '</div>'+ '<strong>' + description+ '</strong><div style="weight: bold; float:left;"></div>'+ '<p></p><div>'+obj+'</div>');
                    infowindow.open(this.map, marker);
                }
            })(marker, temp));   

}
             }

  }

  this.http.post('https://porto-quest.herokuapp.com/api/getnotobjbyid',body).map(res3 => res3.json()).subscribe(data3 => {
    this.http.post('https://porto-quest.herokuapp.com/api/getnotimgbyid',body).map(res4 => res4.json()).subscribe(data4 => {

    var temp3 = 0;
    var ar = data3;


    for(temp3 = 0;temp3 < ar.length;temp3++){
    
    var marker = new google.maps.Marker({
        position: ar[temp3],
        map: this.map,
        title: 'Porras'
        });

    var counter2 = 0;

    for(counter2 = 0;counter2 < ar.length; counter2++){
      if(data3[temp3].lat == data4[counter2].lat && data3[temp3].lng == data4[counter2].lng){
     google.maps.event.addListener(marker, 'click', (function (marker, temp3) {
      var image = data4[counter2].image;
      var description = data4[counter2].description;
      var obj = data4[counter2].obj;
                return function () {
                    infowindow.setContent('<div style="float:left;padding: 10px;"><img src='+ image + '>' + '</div>'+ '<strong>' + description+ '</strong><div style="weight: bold; float:left;"></div>'+ '<p></p><div>'+obj+'</div>');
                    infowindow.open(this.map, marker);
                }
            })(marker, temp3)); 
            }   

   }

  }




 });

 });

  });
    
       });
/*
    var temp2;
    temp2 = this.getitems();
    console.log(temp2);

var waypoints = [];
for (var i = 0; i < temp2.length; i++) {
    var address = temp2[i];
        waypoints.push({
            location: address,
            stopover: true
        });
}
*/
//var originAddress = {lat: 41.1456715, lng: -8.616795};
//var destinationAddress = {lat: 41.174247, lng: -8.6057957};

//this.createMarker(temp2);
/*
      directionsService.route({
            origin: originAddress,
            destination: destinationAddress,
            waypoints: waypoints,
            travelMode: google.maps.TravelMode['WALKING'],

        },(res, status) => {
            if(status == google.maps.DirectionsStatus.OK){
                directionsDisplay.setDirections(res);
                
            } else {
                console.warn(status);
            }
 
        });

  }, (err) => {
      console.log(err);
    });*/
  }
  


}

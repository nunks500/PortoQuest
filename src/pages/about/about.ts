import { Component, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';


declare var google;

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

   @ViewChild('map') mapElement;
   map: any;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
 
  }

  ionViewDidLoad(){
  		this.initMap();

  }

  initMap(){
         this.geolocation.getCurrentPosition().then((position) => {
         
let lin = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
});
let lang = new google.maps.LatLng(41.1624937,-8.6304765);
  		let mapOptions = {
  				center: lang,
  				zoom: 13,
  				mapTypeId: google.maps.MapTypeId.ROADMAP

  		};

  		this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
/*      let directionsService = new google.maps.DirectionsService;
        let directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
    });

      directionsDisplay.setMap(this.map);*/
      var items = [{lat: 41.1456715, lng: -8.616795}, {lat: 41.152277, lng: -8.6114877}, {lat: 41.174247, lng: -8.6057957}];
var waypoints = [];
for (var i = 0; i < items.length; i++) {
    var address = items[i];
        waypoints.push({
            location: address,
            stopover: true
        });
}

//var originAddress = {lat: 41.1456715, lng: -8.616795};
//var destinationAddress = {lat: 41.174247, lng: -8.6057957};

this.createMarker(items);
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
  

  createMarker(items){

var temp = 0;
    
var infowindow = new google.maps.InfoWindow({
              //when I add <IMG BORDER="0" ALIGN="Left" SRC="stagleton.jpg"> the maps will not load
       content: "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'>Hello i like to fuk</div><div style='float:right; padding: 10px;'></div>"
    });

for(temp = 0;temp < items.length;temp++){
    
    var marker = new google.maps.Marker({
        position: items[temp],
        map: this.map,
        title: 'Porras'
        });

     google.maps.event.addListener(marker, 'click', (function (marker, temp) {
                return function () {
                   // infowindow.setContent(items[temp]);
                    infowindow.open(this.map, marker);
                }
            })(marker, temp));    

  }
}

}

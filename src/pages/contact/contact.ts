import { Component,ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AuthService } from '../login/auth-service';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  	profilePicture: any;
    fp:any;
    html;
    @ViewChild('doughnutCanvas') doughnutCanvas;
     doughnutChart: any;

  constructor(public navCtrl: NavController, public http: Http, private auth: AuthService,private socialSharing: SocialSharing) {

  				var temp = this.auth.getuserid();
  				console.log(temp);
  	            const body = {id: temp};
       		this.http.post('https://porto-quest.herokuapp.com/api/getuserbyid',body).map(res => res.json()).subscribe(data => {
              this.http.post('https://porto-quest.herokuapp.com/api/getcoinsbyid',body).map(res2 => res2.json()).subscribe(data2 => {
       			console.log(data[0]);
        		this.profilePicture = data[0].image;
            this.html = data[0].nome.bold() + ' - Part of Porto explored' + '<br>' + 'Coins gathered: '.bold() + data2[0].sum;
            if( data[0].image.indexOf('.xx.fbcdn.') >= 0){
              this.fp = 1;
}

});
});

  }

  ionViewDidLoad() {
      var temp = this.auth.getuserid();
          console.log(temp);
           const body = {id: temp};

         this.http.post('https://porto-quest.herokuapp.com/api/getper',body).map(res => res.json()).subscribe(data => {


       this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Not Explored", "Explored"],
                datasets: [{
                    label: '# of Votes',
                    data: [data[0].count1 - data[0].count2, data[0].count2],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(0, 255, 0, 0.4)'
                    ],
                    hoverBackgroundColor: [
                        "#fb0200",
                        "#00f600"
                    ]
                }]
            }
 
        });
     });

  }

  public refresca(refresher){
         var temp = this.auth.getuserid();
          console.log(temp);
           const body = {id: temp};
           this.http.post('https://porto-quest.herokuapp.com/api/getuserbyid',body).map(res2 => res2.json()).subscribe(data2 => {
            this.http.post('https://porto-quest.herokuapp.com/api/getcoinsbyid',body).map(res3 => res3.json()).subscribe(data3 => {
         this.http.post('https://porto-quest.herokuapp.com/api/getper',body).map(res => res.json()).subscribe(data => {

           this.html = data2[0].nome.bold() + ' - Part of Porto explored' + '<br>' + 'Coins gathered: '.bold() + data3[0].sum;
       this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
 
            type: 'doughnut',
            data: {
                labels: ["Not Explored", "Explored"],
                datasets: [{
                    label: '# of Votes',
                    data: [data[0].count1 - data[0].count2, data[0].count2],
                    backgroundColor: [
                        'rgba(255, 0, 0, 0.4)',
                        'rgba(0, 255, 0, 0.4)'
                    ],
                    hoverBackgroundColor: [
                        "#fb0200",
                        "#00f600"
                    ]
                }]
            }
 
        });
        });
     });
         });
         refresher.complete();

  }

  sharefacebook(){
  	var temp = this.auth.getuserid();
  				console.log(temp);
  	            const body = {id: temp};

  	       		this.http.post('https://porto-quest.herokuapp.com/api/getper',body).map(res => res.json()).subscribe(data => {
  	       			var percent;
  	       			if (!(data[0].count1 == 0))
  	       			percent = ((data[0].count2 / data[0].count1) * 100).toFixed(2);
  	       		else
  	       			percent = 0;

// Check if sharing via facebook is supported
this.socialSharing.shareViaFacebookWithPasteMessageHint('I am discovering the city of Porto with the Porto Quest application. Right now i know ' + percent + '% of the city','http://porto-quest.herokuapp.com/images/clerigos.jpg','http://www.google.pt','Let your friends know about your progress in the app. Just paste the pre defined message we put on the clipboard').then(() => {
  // Sharing via email is possible
}).catch(() => {
  // Sharing via email is not possible
});
  });
}

}

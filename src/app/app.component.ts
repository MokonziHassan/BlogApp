import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'BlogApp';
 constructor(){
   const config= {
    apiKey: "AIzaSyDKE5VDPNja_lvlxVSzwyuiT_83NQqVuYo",
    authDomain: "opcbookapp.firebaseapp.com",
    databaseURL: "https://opcbookapp.firebaseio.com",
    projectId: "opcbookapp",
    storageBucket: "opcbookapp.appspot.com",
    messagingSenderId: "25342021613",
    appId: "1:25342021613:web:f4c89f4301c52858c221e4",
    measurementId: "G-YWJRNS2DWD"
   }
   firebase.initializeApp(config);
 }
}


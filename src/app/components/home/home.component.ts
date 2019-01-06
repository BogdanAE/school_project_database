import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pictures = ['../../../assets/biblia.jpg',
   '../../../assets/gentleman.jpg',
    '../../../assets/hippe.jpg', 
    '../../../assets/imparatul.jpeg', 
    '../../../assets/india.jpg', 
    '../../../assets/jurnalul.jpg', 
    '../../../assets/pana.jpg', 
    '../../../assets/strainul.jpg', 
    '../../../assets/transparenta.jpg', 
    '../../../assets/tropicul.jpg'];

  constructor() { }

  ngOnInit() {
  }

}

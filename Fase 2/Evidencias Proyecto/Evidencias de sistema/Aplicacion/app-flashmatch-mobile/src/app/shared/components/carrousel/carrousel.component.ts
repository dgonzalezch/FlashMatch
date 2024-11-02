import { Component, OnInit } from '@angular/core';
import { IonicSlides } from '@ionic/angular/standalone';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss'],
  standalone: true,
  imports: []
})
export class CarrouselComponent  implements OnInit {

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: true,
    autoplay: {
      delay: 3000,
    },
  };

  constructor() { }

  ngOnInit() {}

}

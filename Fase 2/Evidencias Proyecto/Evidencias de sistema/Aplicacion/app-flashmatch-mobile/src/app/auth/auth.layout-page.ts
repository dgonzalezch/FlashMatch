import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRouterOutlet, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from '../shared/components/header/header.component';
import { MenuComponent } from '../shared/components/menu/menu.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.layout-page.html',
  styleUrls: ['./auth.layout-page.scss'],
  standalone: true,
  imports: [IonImg, IonRouterOutlet, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, MenuComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AuthPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

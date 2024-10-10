import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabButton, IonIcon, IonLabel, IonTabBar, IonTabs, IonSegment, IonSegmentButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-search',
  templateUrl: './search.layout-page.html',
  styleUrls: ['./search.layout-page.scss'],
  standalone: true,
  imports: [IonSegmentButton, IonSegment, IonTabs, IonTabBar, IonLabel, IonIcon, IonTabButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class SearchPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

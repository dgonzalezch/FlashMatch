import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step2Page implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

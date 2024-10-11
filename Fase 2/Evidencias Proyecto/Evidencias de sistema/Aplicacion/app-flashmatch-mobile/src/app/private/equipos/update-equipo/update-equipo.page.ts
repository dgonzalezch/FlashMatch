import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-update-equipo',
  templateUrl: './update-equipo.page.html',
  styleUrls: ['./update-equipo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class UpdateEquipoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

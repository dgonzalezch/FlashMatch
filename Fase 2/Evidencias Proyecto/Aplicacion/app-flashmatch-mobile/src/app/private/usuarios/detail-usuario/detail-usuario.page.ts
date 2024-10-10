import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { BaseChartDirective  } from 'ng2-charts';

@Component({
  selector: 'app-detail-usuario',
  templateUrl: './detail-usuario.page.html',
  styleUrls: ['./detail-usuario.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class DetailUsuarioPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

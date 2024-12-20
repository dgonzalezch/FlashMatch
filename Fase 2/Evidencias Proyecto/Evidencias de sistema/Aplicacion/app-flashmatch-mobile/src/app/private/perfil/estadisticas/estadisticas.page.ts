import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonRange, IonItem, IonLabel, IonCol, IonRow, IonGrid, IonAccordion, IonAccordionGroup, IonIcon, IonList, IonButton, IonText, IonCardContent, IonCard, IonCardHeader, IonCardTitle, IonTabs, IonTabBar, IonTabButton, IonSelect, IonSelectOption, IonNote, IonButtons } from '@ionic/angular/standalone';
import { BaseChartDirective } from 'ng2-charts';
import { AlertService } from 'src/app/shared/common/alert.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
  standalone: true,
  imports: [IonButtons, IonNote, IonTabButton, IonTabBar, IonTabs, IonCardTitle, IonCardHeader, IonCard, IonCardContent, IonText, IonButton, IonList, IonIcon, IonAccordionGroup, IonAccordion, IonGrid, IonRow, IonCol, IonLabel, IonItem, IonRange, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, CommonModule, FormsModule, BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class EstadisticasPage {
  private fb = inject(FormBuilder);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);

  infoUsuario = signal<any>(null);
  idUsuario = signal<string>('');
  selectedDeporte = signal<any>('')

  velocidadValue = signal<any>(0);
  resistenciaValue = signal<any>(0);
  tecnicaValue = signal<any>(0);
  tacticaValue = signal<any>(0);

  estadisticasDetalladasUsuariosForm = this.fb.group({
    deporte_id: ['', [Validators.required]],
  });

  radarChartLabels = signal<any>(['Velocidad', 'Resistencia', 'Técnica', 'Táctica']);

  radarChartData = signal<any>([
    { data: [0, 0, 0, 0] }
  ]);

  radarChartOptions = signal<any>({
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: false
      }
    },
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          display: false
        },
      }
    }
  });

  async ionViewWillEnter() {
    this.idUsuario.set(await this.storageService.get('user'));
    this.getInfoUsuario();
  }

  getInfoUsuario() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  updateChartData() {
    if (this.selectedDeporte() && this.infoUsuario()) {
      const selectedPosition = this.infoUsuario().deportesPosicionesUsuarios.find((dp: any) => dp.deportePosicion.deporte.id_deporte === this.selectedDeporte().deporte.id_deporte);
      if (selectedPosition) {
        const estadisticas = this.infoUsuario().estadisticasDetalladasUsuarios;

        this.radarChartData()[0].data = this.radarChartLabels().map((label: any) => {
          const est = estadisticas.find((est: any) => est.parametroRendimiento.nombre_parametro_rendimiento === label);
          return est ? parseFloat(est.parametro_valor) : 0;
        });

        // Asignar los valores a los rangos
        this.velocidadValue.set(parseFloat(estadisticas.find((est:any) => est.parametroRendimiento.nombre_parametro_rendimiento === 'Velocidad')?.parametro_valor) || 0);
        this.resistenciaValue.set(parseFloat(estadisticas.find((est:any) => est.parametroRendimiento.nombre_parametro_rendimiento === 'Resistencia')?.parametro_valor) || 0);
        this.tacticaValue.set(parseFloat(estadisticas.find((est:any) => est.parametroRendimiento.nombre_parametro_rendimiento === 'Táctica')?.parametro_valor) || 0);
        this.tecnicaValue.set(parseFloat(estadisticas.find((est:any) => est.parametroRendimiento.nombre_parametro_rendimiento === 'Técnica')?.parametro_valor) || 0);
      }
    }
  }
}

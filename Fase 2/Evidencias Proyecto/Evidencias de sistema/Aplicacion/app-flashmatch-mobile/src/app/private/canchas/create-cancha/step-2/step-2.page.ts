import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonGrid, IonCol, IonCard, IonCardContent, IonIcon, IonText, IonItem, IonLabel, IonButton, IonFooter, IonCheckbox, IonDatetime, IonChip, IonCardTitle, IonCardHeader, IonBadge, IonSearchbar, LoadingController, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from 'src/app/shared/common/alert.service';
import { CanchaService } from 'src/app/services/cancha.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.page.html',
  styleUrls: ['./step-2.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonBadge, IonCardHeader, IonCardTitle, IonChip, IonDatetime, IonCheckbox, IonFooter, IonButton, IonLabel, IonItem, IonIcon, IonText, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step2Page implements OnInit {

  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private alertService = inject(AlertService);
  private router = inject(Router);
  private canchaService = inject(CanchaService);
  private storageService = inject(StorageService);

  step1FormCreateCanchaData: any;

  diasSemana = signal<any[]>([
    {
      dia: 1, prefijo: 'LU', nombre: 'Lunes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 2, prefijo: 'MA', nombre: 'Martes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 3, prefijo: 'MI', nombre: 'Miércoles',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 4, prefijo: 'JU', nombre: 'Jueves',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 5, prefijo: 'VI', nombre: 'Viernes',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 6, prefijo: 'SÁ', nombre: 'Sábado',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    },
    {
      dia: 7, prefijo: 'DO', nombre: 'Domingo',
      seleccionado: false,
      horarios: [
        { hora: '08:00', seleccionada: false },
        { hora: '09:00', seleccionada: false },
        { hora: '10:00', seleccionada: false },
        { hora: '11:00', seleccionada: false },
        { hora: '12:00', seleccionada: false },
        { hora: '13:00', seleccionada: false },
        { hora: '14:00', seleccionada: false },
        { hora: '15:00', seleccionada: false },
        { hora: '16:00', seleccionada: false },
        { hora: '17:00', seleccionada: false },
        { hora: '18:00', seleccionada: false },
        { hora: '19:00', seleccionada: false },
        { hora: '20:00', seleccionada: false },
        { hora: '21:00', seleccionada: false },
        { hora: '22:00', seleccionada: false },
        { hora: '23:00', seleccionada: false }
      ]
    }
  ]);

  onToggleDia(index: number) {
    this.diasSemana()[index].seleccionado = !this.diasSemana()[index].seleccionado;
  }

  onToggleHora(diaIndex: number, horaIndex: number) {
    // Accede al día específico por el índice
    const dia = this.diasSemana()[diaIndex];

    // Accede a la hora específica dentro del horario de ese día
    const hora = dia.horarios[horaIndex];

    // Cambia el estado de seleccionado de esa hora
    hora.seleccionada = !hora.seleccionada;
  }

  toggleSelectAllHoras(diaIndex: number) {
    // Accede al día específico por el índice
    const dia = this.diasSemana()[diaIndex];

    // Verifica si todas las horas ya están seleccionadas
    const allSelected = dia.horarios.every((hora: any) => hora.seleccionada);

    // Alterna entre seleccionar todas o des-seleccionar todas
    dia.horarios.forEach((hora: any) => {
      hora.seleccionada = !allSelected;
    });

    // Actualiza la señal para que Angular detecte los cambios
    this.diasSemana.update((dias) => dias);
  }


  // Función para verificar si al menos un horario está seleccionado
  hasSelectedHorario(): boolean {
    return this.diasSemana().some(dia =>
      dia.horarios.some((horario: any) => horario.seleccionada)
    );
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirmar creación',
      message: `¿Estás seguro de crear la cancha?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.crearCancha();
          }
        }
      ]
    });

    await alert.present();
  }


  async crearCancha() {
    // Validar si hay al menos un horario seleccionado
    if (!this.hasSelectedHorario()) {
      this.alertService.error('Debes seleccionar al menos un horario para crear la cancha.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Creando cancha...',
      duration: 3000
    });

    const fullFormDataCreateCancha = {
      ...this.step1FormCreateCanchaData,
      disponibilidadCancha: this.diasSemana(),
      administrador_cancha_id: await this.storageService.get('user')
    };

    try {
      await loading.present();

      this.canchaService.createCancha(fullFormDataCreateCancha).subscribe({
        next: async (resp) => {
          await loading.dismiss();
          this.alertService.info('¡Cancha creada!', 'La nueva cancha ya está disponible. Puedes verla en tu lista de canchas.');
          this.router.navigate(['/private/courts']);
        },
        error: async (err: responseError) => {
          await loading.dismiss();
          this.alertService.error(err.message);
        }
      });
    } catch (error) {
      await loading.dismiss();
      this.alertService.error('Error inesperado al crear la cancha.');
    }
  }

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.step1FormCreateCanchaData = navigation.extras.state['step1FormCreateCancha'];
    }
  }
}

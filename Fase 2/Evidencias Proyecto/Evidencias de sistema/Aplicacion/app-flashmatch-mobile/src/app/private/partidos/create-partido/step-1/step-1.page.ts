import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonRow, IonGrid, IonText, IonCol, IonIcon, IonCardContent, IonCard, IonModal, IonDatetimeButton, IonDatetime, IonLabel, IonInput, IonFooter, IonButton, IonCardSubtitle, IonCardTitle, IonCardHeader, IonAccordionGroup, IonAccordion, IonItem, IonBadge, IonBreadcrumb, IonBreadcrumbs, IonTextarea, IonSelect, IonSelectOption, IonSegment, IonSegmentButton, IonToggle, IonList, LoadingController, AlertController } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { DeporteService } from 'src/app/services/deporte.service';
import { RangoEdadService } from 'src/app/services/rango-edad.service';
import { NivelHabilidadService } from 'src/app/services/nivel-habilidad.service';
import { TipoPartidoService } from 'src/app/services/tipo-partido.service';
import { TipoEmparejamientoService } from 'src/app/services/tipo-emparejamiento.service';
import { Deporte } from 'src/app/interfaces/deporte.interface';
import { RangoEdad } from 'src/app/interfaces/rango-edad.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { TipoPartido } from 'src/app/interfaces/tipo-partido.interface';
import { NivelHabilidad } from 'src/app/interfaces/nivel-habilidad.interface';
import { TipoEmparejamiento } from 'src/app/interfaces/tipo-emparejamiento.interface';
import { DatePipe } from '@angular/common';
import { StorageService } from 'src/app/services/storage.service';
import { PartidoService } from 'src/app/services/partido.service';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.page.html',
  styleUrls: ['./step-1.page.scss'],
  standalone: true,
  imports: [IonList, IonToggle, IonSegmentButton, IonSegment, IonTextarea, IonBreadcrumb, IonBadge, IonItem, IonAccordion, IonAccordionGroup, IonCardHeader, IonCardTitle, IonCardSubtitle, IonButton, IonFooter, IonInput, IonLabel, IonDatetime, IonDatetimeButton, IonModal, IonCard, IonCardContent, IonIcon, IonCol, IonText, IonGrid, IonRow, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink, IonBreadcrumbs, IonSelect, IonSelectOption, CommonModule, FormsModule, ReactiveFormsModule, DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step1Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private deporteService = inject(DeporteService);
  private tipoPartidoService = inject(TipoPartidoService);
  private nivelHabilidadService = inject(NivelHabilidadService);
  private rangoEdadService = inject(RangoEdadService);
  private tipoEmparejamientoService = inject(TipoEmparejamientoService);
  private datePipe = inject(DatePipe);
  private loadingController = inject(LoadingController);
  private alertController = inject(AlertController);
  private storageService = inject(StorageService);
  private partidoService = inject(PartidoService);


  listDeportes = signal<Deporte[]>([]);
  listTiposPartidos = signal<TipoPartido[]>([]);
  listNivelesHabilidad = signal<NivelHabilidad[]>([]);
  listRangosEdad = signal<RangoEdad[]>([]);
  listTiposEmparejamientos = signal<TipoEmparejamiento[]>([]);

  step1FormCreatePartido = this.fb.group({
    fecha_partido: ['', [Validators.required]],
    deporte_id: ['', [Validators.required]],
    tipo_partido_id: ['', [Validators.required]],
    nivel_habilidad_id: ['', [Validators.required]],
    rango_edad_id: ['', [Validators.required]],
    // tipo_emparejamiento_id: ['', [Validators.required]],
    partido_privado: [false, [Validators.required]],
    descripcion: ['']
  });

  minDate = signal<string>('');

  ionViewWillEnter() {
    this.getListDeportes();
    this.getListTiposPartidos();
    this.getListNivelesHabilidad();
    this.getListRangosEdad();
    this.getListTiposEmparejamientos();
  }

  constructor() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1); // Añadir 1 día a la fecha actual
    this.minDate.set(tomorrow.toISOString().split('T')[0]); // Formato ISO solo con la fecha
  }

  onDateChange(event: any) {
    const dateWithTime = new Date(event.detail.value);
    const formattedDate = this.datePipe.transform(dateWithTime, 'yyyy-MM-ddTHH:mm:ss');
    this.step1FormCreatePartido.get('fecha_partido')?.setValue(formattedDate);
  }

  async onSubmit() {
    const alert = await this.alertController.create({
      header: 'Confirmar creación',
      message: `¿Estás seguro de que deseas crear el partido con los datos ingresados?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: () => {
            this.crearPartido();
          }
        }
      ]
    });

    await alert.present();
  }


  async crearPartido() {
    const loading = await this.loadingController.create({
      message: 'Creando partido...',
      duration: 3000
    });

    const fullFormCreatePartido = {
      ...this.step1FormCreatePartido.value,
      creador_id: await this.storageService.get('user')
    };

    try {
      await loading.present();

      this.partidoService.createPartido(fullFormCreatePartido).subscribe({
        next: async (resp) => {
          await loading.dismiss();
          this.alertService.info('¡Partido creado!', 'El partido ha sido creado con éxito, ahora elige una cancha para tu partido.');
          this.router.navigate([`/private/matches/create-match/${resp.data.id_partido}/step-2`]);
        },
        error: async (err: responseError) => {
          await loading.dismiss();
          this.alertService.error(err.message);
        }
      });
    } catch (error) {
      await loading.dismiss();
      this.alertService.error('Ocurrió un error inesperado al enviar la solicitud.');
    }
  }

  getListDeportes(): void {
    this.deporteService.getAllDeportes().subscribe({
      next: (resp: responseSuccess) => {
        this.listDeportes.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListTiposPartidos(): void {
    this.tipoPartidoService.getAllTiposPartidos().subscribe({
      next: (resp: responseSuccess) => {
        this.listTiposPartidos.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListNivelesHabilidad(): void {
    this.nivelHabilidadService.getAllNivelesHabilidad().subscribe({
      next: (resp: responseSuccess) => {
        this.listNivelesHabilidad.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListRangosEdad(): void {
    this.rangoEdadService.getAllRangosEdad().subscribe({
      next: (resp: responseSuccess) => {
        this.listRangosEdad.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListTiposEmparejamientos(): void {
    this.tipoEmparejamientoService.getAllTiposEmparejamientos().subscribe({
      next: (resp: responseSuccess) => {
        this.listTiposEmparejamientos.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }
}

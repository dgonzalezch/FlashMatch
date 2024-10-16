import { AfterViewInit, ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonText, IonFooter, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { EquiposService } from '../../../services/equipos.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { Deporte } from '../../../interfaces/deporte.interface';
import { RangoEdad } from 'src/app/interfaces/rango-edad.interface';
import { StorageService } from 'src/app/services/storage.service';
import { DeportesService } from 'src/app/services/deportes.service';
import { RangosEdadService } from 'src/app/services/rangos-edad.service';

@Component({
  selector: 'app-create-equipo',
  templateUrl: './create-equipo.page.html',
  styleUrls: ['./create-equipo.page.scss'],
  standalone: true,
  imports: [IonButtons, IonBackButton, IonButton, IonFooter, IonSelect, IonSelectOption, IonText, IonIcon, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonTextarea, CommonModule, FormsModule, ReactiveFormsModule, PreventSpacesDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class CreateEquipoPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private equiposService = inject(EquiposService);
  private deportesService = inject(DeportesService);
  private rangosEdadService = inject(RangosEdadService);

  listDeportes = signal<Deporte[]>([]);
  listRangosEdad = signal<RangoEdad[]>([]);

  ionViewWillEnter() {
    this.getListDeportes();
    this.getListRangosEdad();
  }

  equipoForm = this.fb.group({
    nombre_equipo: ['', [Validators.required]],
    logo_equipo: [''],
    id_deporte: ['', [Validators.required]],
    id_rango: ['', [Validators.required]],
    descripcion: ['', [Validators.required]]
  });

  getListDeportes(): void {
    this.deportesService.getAllDeportes().subscribe({
      next: (resp: responseSuccess) => {
        this.listDeportes.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListRangosEdad(): void {
    this.rangosEdadService.getAllRangosEdad().subscribe({
      next: (resp: responseSuccess) => {
        this.listRangosEdad.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  async onSubmit() {
    const fullFormTeam = {
      ...this.equipoForm.value,
      id_creador: await this.storageService.get('user')
    };

    this.equiposService.createEquipo(fullFormTeam).subscribe({
      next: (resp: responseSuccess) => {
        this.alertService.message(resp.message);
        this.router.navigate(['/private/teams']);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }
}

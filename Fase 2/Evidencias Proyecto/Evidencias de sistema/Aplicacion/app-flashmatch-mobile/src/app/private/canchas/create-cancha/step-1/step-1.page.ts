import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonText, IonIcon, IonAccordion, IonAccordionGroup, IonItem, IonLabel, IonButton, IonSelect, IonSelectOption, IonInput, IonFooter, IonTextarea, IonChip } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { DeporteService } from 'src/app/services/deporte.service';
import { AlertService } from 'src/app/shared/common/alert.service';
import { Deporte } from 'src/app/interfaces/deporte.interface';
import { LocationService } from 'src/app/shared/common/location.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { CurrencyFormatDirective } from 'src/app/shared/common/currency-format.directive';
import { OnlyNumbersDirective } from 'src/app/shared/common/only-numbers.directive';
import { MaterialCanchaService } from 'src/app/services/material-cancha.service';
import { MaterialCancha } from 'src/app/interfaces/material-cancha.interface';

@Component({
  selector: 'app-step-1',
  templateUrl: './step-1.page.html',
  styleUrls: ['./step-1.page.scss'],
  standalone: true,
  imports: [IonChip, IonFooter, IonButton, IonLabel, IonItem, IonAccordionGroup, IonAccordion, IonIcon, IonText, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonInput, IonTextarea, PreventSpacesDirective, CommonModule, FormsModule, ReactiveFormsModule, RouterLink, CurrencyFormatDirective, OnlyNumbersDirective],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class Step1Page {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private deporteService = inject(DeporteService);
  private materialCanchaService = inject(MaterialCanchaService);
  private alertService = inject(AlertService);
  private locationService = inject(LocationService);

  listDeportes = signal<Deporte[]>([]);
  listMaterialesCancha = signal<MaterialCancha[]>([]);
  selectedLocation = signal<string>('');

  ionViewWillEnter() {
    this.selectedLocation.set(this.locationService.getLocation().ubicacion);
    this.getListDeportes();
    this.getListMaterialCancha();
  }

  step1FormCreateCancha = this.fb.group({
    nombre_cancha: [ '', [ Validators.required, Validators.maxLength(100)]],
    precio_por_hora: ['', [Validators.required]],
    deporte_id: ['', [Validators.required]],
    material_cancha_id: ['', [Validators.required]],
    descripcion: [''],
  });

  onSubmit() {
    const precioPorHora = this.step1FormCreateCancha.get('precio_por_hora')?.value;
    const precioPorHoraParsed = parseInt(precioPorHora!.replace(/[^\d]/g, ''), 10);

    const step1FormCreateCanchaValues = {
      ...this.step1FormCreateCancha.value,
      precio_por_hora: precioPorHoraParsed,
      ubicacion: this.locationService.getLocation().ubicacion,
      latitud: this.locationService.getLocation().latitud,
      longitud: this.locationService.getLocation().longitud
    }

    debugger
    this.router.navigate(['/private/courts/create-court/step-2'], {
      state: { step1FormCreateCancha: step1FormCreateCanchaValues }
    });
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

  getListMaterialCancha(): void {
    this.materialCanchaService.getAllMaterialesCancha().subscribe({
      next: (resp: responseSuccess) => {
        this.listMaterialesCancha.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }
}

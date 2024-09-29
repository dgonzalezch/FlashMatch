import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonIcon, IonText, IonFooter, IonButton, IonInput, IonTextarea, IonSelect, IonSelectOption } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { TeamsService } from '../../../services/teams.service';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';
import { PreventSpacesDirective } from 'src/app/shared/common/prevent-spaces.directive';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { Deporte } from '../../../interfaces/deporte.interface';
import { RangoEdad } from 'src/app/interfaces/rango-edad.interface';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.page.html',
  styleUrls: ['./create-team.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonSelect, IonSelectOption, IonText, IonIcon, IonCardContent, IonCard, IonCol, IonRow, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonTextarea, CommonModule, FormsModule, ReactiveFormsModule, PreventSpacesDirective]
})
export default class CreateTeamPage implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private teamsService = inject(TeamsService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);

  listDeportes = signal<Deporte[]>([]);
  listRangosEdad = signal<RangoEdad[]>([]);

  ngOnInit() {
    this.getListDeportes();
    this.getListRangosEdad();
  }

  teamForm = this.fb.group({
    nombre_equipo: ['', [Validators.required]],
    logo_equipo: [''],
    id_deporte: ['', [Validators.required]],
    id_rango: ['', [Validators.required]],
    descripcion_equipo: ['', [Validators.required]]
  });

  getListDeportes(): void {
    this.teamsService.getDeportes().subscribe({
      next: (resp: responseSuccess) => {
        this.listDeportes.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  getListRangosEdad(): void {
    this.teamsService.getRangosEdad().subscribe({
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
      ...this.teamForm.value,
      id_creador: await this.storageService.get('user')
    };

    this.teamsService.createTeam(fullFormTeam).subscribe({
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

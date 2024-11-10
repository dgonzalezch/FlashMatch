import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, input, OnInit, Output, signal } from '@angular/core';
import { IonRow, IonCol, IonAvatar, IonButton, IonIcon, IonGrid, IonTextarea, IonList, IonItem, ModalController } from "@ionic/angular/standalone";
import { responseError } from 'src/app/interfaces/response-error.interface';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertService } from '../../common/alert.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-evaluation',
  templateUrl: './user-evaluation.component.html',
  styleUrls: ['./user-evaluation.component.scss'],
  standalone: true,
  imports: [IonItem, IonList, CommonModule, IonTextarea, IonGrid, IonIcon, IonButton, IonAvatar, IonCol, IonRow],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserEvaluationComponent implements OnInit {
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);
  private storageService = inject(StorageService);
  private modalController = inject(ModalController); // Inyecta ModalController
  @Output() evaluacionEnviada = new EventEmitter<void>(); // Define el evento a emitir

  idUsuario = input.required<any>();
  idPartido = input.required<any>();
  usuarioData = signal<any>({});
  puntuacion = signal<number>(0);
  comentario = signal<string>('');
  usuarioActualId = signal<string>('');
  stars = [1, 2, 3, 4, 5]; // Array para iterar en la plantilla

  ngOnInit() {
    this.usuarioService.getUsuario(this.idUsuario()).subscribe({
      next: (resp: responseSuccess) => {
        this.usuarioData.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    });
  }

  getStarIcon(starNumber: number): string {
    const rating = this.puntuacion();
    return rating >= starNumber ? 'star' : rating >= starNumber - 0.5 ? 'star-half' : 'star-outline';
  }

  setRating(starNumber: number) {
    this.puntuacion.set(starNumber);
  }

  async enviarEvaluacion() {
    try {
      this.usuarioService.enviarEvaluacion({
        partidoId: this.idPartido(),
        evaluadorId: await this.storageService.get('user'),
        evaluadoId: this.idUsuario(),
        puntuacion: this.puntuacion() + 1,
        comentario: this.comentario(),
      }).subscribe({
        next: () => {
          this.alertService.message("Evaluación enviada con éxito.");
        },
        error: () => {
          this.alertService.error("Error al enviar la evaluación.");
        },
        complete: async () => {
          this.evaluacionEnviada.emit();
          await this.modalController.dismiss(); // Cierra el modal
        }
      });

    } catch (error) {
      this.alertService.error("Error al enviar la evaluación.");
    }
  }


}

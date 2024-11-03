import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { MatchmakingService } from 'src/app/services/matchmaking.service';
import { StorageService } from 'src/app/services/storage.service';
import { UsuarioService } from '../../services/usuario.service';
import { responseSuccess } from 'src/app/interfaces/response-success.interface';
import { responseError } from 'src/app/interfaces/response-error.interface';
import { AlertService } from 'src/app/shared/common/alert.service';

@Component({
  selector: 'app-matchmaking',
  templateUrl: './matchmaking.page.html',
  styleUrls: ['./matchmaking.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonList, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class MatchmakingPage implements OnInit {
  private matchmakingService = inject(MatchmakingService);
  private storageService = inject(StorageService);
  private usuarioService = inject(UsuarioService);
  private alertService = inject(AlertService);

  partidosEncontrados = signal<any>(null);
  buscandoPartido = signal<boolean>(false);
  infoUsuario = signal<any>({});

  async getInfoUsuario() {
    this.usuarioService.getUsuario(await this.storageService.get('user')).subscribe({
      next: (resp: responseSuccess) => {
        this.infoUsuario.set(resp.data);
      },
      error: (err: responseError) => {
        this.alertService.error(err.message);
      }
    })
  }

  ngOnInit() {
    this.getInfoUsuario();
    this.matchmakingService.onMatchFound((partido) => {
      this.partidosEncontrados.set(partido);
      debugger
      this.buscandoPartido.set(false);
    });

    this.matchmakingService.onNoMatchFound((message) => {
      console.log(message);
      this.buscandoPartido.set(true);
    });
  }

  // buscarPartido(deporteId: string, nivelHabilidadId: string, rangoEdadId: string) {
  buscarPartido() {
    this.buscandoPartido.set(true);
    this.matchmakingService.requestMatchmaking(this.infoUsuario().tipoPartido.id_tipo_partido, this.infoUsuario().nivelHabilidad.id_nivel_habilidad,  this.infoUsuario().rangoEdad.id_rango_edad);
  }

}

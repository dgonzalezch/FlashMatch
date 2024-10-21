import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { DeportePosicion } from 'src/deporte-posicion/entities/deporte-posicion.entity';

@Entity('deporte_posicion_usuario')
@Unique(['usuario', 'deporte', 'deportePosicion'])
export class DeportePosicionUsuario {
  @PrimaryGeneratedColumn('uuid')
  id_deporte_posicion_usuario: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deporte_id' })
  deporte: Deporte;

  @ManyToOne(() => DeportePosicion, (deportePosicion) => deportePosicion.id_deporte_posicion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deporte_posicion_id' })
  deportePosicion: DeportePosicion;
}

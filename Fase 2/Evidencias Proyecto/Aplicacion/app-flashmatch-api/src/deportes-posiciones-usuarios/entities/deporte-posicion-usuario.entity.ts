import { Entity, PrimaryGeneratedColumn, ManyToOne, Unique, JoinColumn } from 'typeorm';
import { Usuario } from 'src/auth/entities/usuario.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { DeportePosicion } from 'src/deportes-posiciones/entities/deporte-posicion.entity';

@Entity('deportes_posiciones_usuarios')
export class DeportePosicionUsuario {
  @PrimaryGeneratedColumn('uuid')
  id_deporte_posicion: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_deporte' })
  deporte: Deporte;

  @ManyToOne(() => DeportePosicion, (posicion) => posicion.id_posicion, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_posicion' })
  posicion: DeportePosicion;
}
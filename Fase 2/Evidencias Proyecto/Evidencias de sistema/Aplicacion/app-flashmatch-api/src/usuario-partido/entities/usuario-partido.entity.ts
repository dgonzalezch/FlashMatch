import { Partido } from 'src/partido/entities/partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('usuario_partido')
export class UsuarioPartido {
  @PrimaryGeneratedColumn('uuid')
  id_usuario_partido: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.partidos)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Partido, (partido) => partido.jugadores)
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column({ type: 'varchar', length: 1, nullable: true })
  equipo?: 'A' | 'B';

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;
}
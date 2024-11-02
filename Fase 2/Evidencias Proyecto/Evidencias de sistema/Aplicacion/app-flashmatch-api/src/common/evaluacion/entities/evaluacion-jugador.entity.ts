import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Partido } from 'src/partido/entities/partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('evaluacion_jugador')
export class EvaluacionJugador {
  @PrimaryGeneratedColumn('uuid')
  id_evaluacion_jugador: string;

  @ManyToOne(() => Partido, { nullable: false })
  partido: Partido;

  @ManyToOne(() => Usuario, { nullable: false })
  evaluador: Usuario;

  @ManyToOne(() => Usuario, { nullable: false })
  evaluado: Usuario;

  @Column({ type: 'int' })
  puntuacion: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn()
  fecha_evaluacion: Date;
}

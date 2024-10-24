import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cancha } from './cancha.entity';

@Entity('disponibilidad_cancha')
export class DisponibilidadCancha {
  @PrimaryGeneratedColumn('uuid')
  id_disponibilidad: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.disponibilidad, { onDelete: 'CASCADE' })
  cancha: Cancha;

  @Column({ type: 'int', nullable: false })
  dia_semana: number;

  @Column({ type: 'time', nullable: false })
  hora: string;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;
}

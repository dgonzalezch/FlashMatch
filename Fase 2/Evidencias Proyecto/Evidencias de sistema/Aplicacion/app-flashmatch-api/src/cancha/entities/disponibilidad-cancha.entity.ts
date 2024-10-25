import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Cancha } from './cancha.entity';

@Entity('disponibilidad_cancha')
export class DisponibilidadCancha {
  @PrimaryGeneratedColumn('uuid')
  id_disponibilidad: string;

  @Column({ type: 'int' })
  dia_semana: number;

  @Column({ type: 'varchar', length: 20 })
  prefijo: string;

  @Column({ type: 'varchar', length: 50 })
  nombre: string;

  @Column({ type: 'time' })
  hora: string;

  @Column({ type: 'boolean' })
  disponible: boolean;

  // Relación con la entidad Cancha, utilizando la clave foránea cancha_id
  @ManyToOne(() => Cancha, (cancha) => cancha.disponibilidad, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cancha_id' })
  cancha: Cancha;
}

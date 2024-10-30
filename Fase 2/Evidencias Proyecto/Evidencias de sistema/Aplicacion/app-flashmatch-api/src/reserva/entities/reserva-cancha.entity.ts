import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Partido } from 'src/partido/entities/partido.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, OneToOne } from 'typeorm';

@Entity('reserva_cancha')
export class ReservaCancha {
  @PrimaryGeneratedColumn('uuid')
  id_reserva_cancha: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.reservas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cancha_id' })
  cancha: Cancha;

  @OneToOne(() => Partido, (partido) => partido.reserva, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'partido_id' })
  partido: Partido;

  @Column({ type: 'timestamp' })
  fecha_hora_reserva: Date;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn({ name: 'fecha_solicitud' })
  fecha_solicitud: Date;
}

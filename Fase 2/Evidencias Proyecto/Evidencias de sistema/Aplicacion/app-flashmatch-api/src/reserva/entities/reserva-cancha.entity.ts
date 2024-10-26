import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('reserva_cancha')
export class ReservaCancha {
  @PrimaryGeneratedColumn('uuid')
  id_reserva_cancha: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.reservas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cancha_id' })
  cancha: Cancha;

  @ManyToOne(() => Usuario, (usuario) => usuario.reservas, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'date' })
  fecha_reserva: string;

  @Column({ type: 'time' })
  hora_reserva: string;

  @Column({ type: 'varchar', length: 20, default: 'pendiente' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  mensaje: string;

  @CreateDateColumn({ name: 'fecha_solicitud' })
  fecha_solicitud: Date;
}

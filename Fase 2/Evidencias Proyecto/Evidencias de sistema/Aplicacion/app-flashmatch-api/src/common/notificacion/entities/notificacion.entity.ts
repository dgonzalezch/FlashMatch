import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn('uuid')
  id_notificacion: string;

  @ManyToOne(() => Usuario, usuario => usuario.notificaciones, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @Column({ type: 'text' })
  mensaje: string;

  @Column({ type: 'boolean', default: false })
  leido: boolean;

  @CreateDateColumn({ name: 'fecha_creacion' })
  fecha_creacion: Date;
}

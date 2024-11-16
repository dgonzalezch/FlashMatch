import { Deporte } from 'src/deporte/entities/deporte.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';

@Entity('parametro_rendimiento')
@Unique(['nombre_parametro_rendimiento', 'deporte'])
export class ParametroRendimiento {
  @PrimaryGeneratedColumn('uuid')
  id_parametro_rendimiento: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_parametro_rendimiento: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deporte_id' })
  deporte: Deporte;
}

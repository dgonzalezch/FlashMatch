import { Deporte } from 'src/deportes/entities/deporte.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, JoinColumn } from 'typeorm';

@Entity('parametros_rendimiento')
@Unique(['nombre_parametro', 'deporte']) // Evitar duplicados en el mismo deporte
export class ParametroRendimiento {
  @PrimaryGeneratedColumn('uuid')
  id_parametro_rendimiento: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_parametro: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_deporte' })
  deporte: Deporte;
}

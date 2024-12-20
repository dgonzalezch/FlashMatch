import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tipo_partido')
export class TipoPartido {
  @PrimaryGeneratedColumn('uuid')
  id_tipo_partido: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_tipo_partido: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}

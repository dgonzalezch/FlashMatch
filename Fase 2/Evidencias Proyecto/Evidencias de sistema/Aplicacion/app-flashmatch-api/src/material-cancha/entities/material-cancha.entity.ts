import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('material_cancha')
export class MaterialCancha {
  @PrimaryGeneratedColumn('uuid')
  id_material_cancha: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre_material_cancha: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}

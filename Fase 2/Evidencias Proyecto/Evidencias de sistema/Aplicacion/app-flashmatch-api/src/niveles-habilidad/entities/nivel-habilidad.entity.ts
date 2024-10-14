import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('niveles_habilidad')
export class NivelHabilidad {
  @PrimaryGeneratedColumn('uuid')
  id_nivel_habilidad: string;

  @Column({ type: 'varchar', length: 100 })
  nombre_nivel_habilidad: string;

  @Column({ type: 'text', nullable: true })
  descripcion: string;
}
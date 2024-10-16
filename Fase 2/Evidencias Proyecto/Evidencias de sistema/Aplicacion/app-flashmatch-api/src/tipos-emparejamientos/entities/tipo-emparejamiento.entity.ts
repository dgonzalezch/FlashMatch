import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tipos_emparejamientos')
export class TipoEmparejamiento {
    @PrimaryGeneratedColumn('uuid')
    id_tipo_emparejamiento: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre_tipo_emparejamiento: string;

    @Column({ type: 'text', nullable: true })
    descripcion: string;
}
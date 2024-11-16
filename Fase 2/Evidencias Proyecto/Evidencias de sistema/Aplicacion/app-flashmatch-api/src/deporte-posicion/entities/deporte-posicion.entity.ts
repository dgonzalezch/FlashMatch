import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from "typeorm";
import { Deporte } from "src/deporte/entities/deporte.entity";

@Entity('deporte_posicion')
@Unique(['nombre_deporte_posicion', 'deporte'])
export class DeportePosicion {
    @PrimaryGeneratedColumn('uuid')
    id_deporte_posicion: string;

    @Column({ type: 'varchar', length: 50 })
    nombre_deporte_posicion: string;

    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'deporte_id' })
    deporte: Deporte;
}
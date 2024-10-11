import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Deporte } from "src/deportes/entities/deporte.entity"; // Asegúrate de ajustar la ruta según tu estructura de carpetas

@Entity('deportes_posiciones')
export class DeportePosicion {
    @PrimaryGeneratedColumn('uuid')
    id_posicion: string;

    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { eager: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_deporte' })
    deporte: Deporte;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;
}
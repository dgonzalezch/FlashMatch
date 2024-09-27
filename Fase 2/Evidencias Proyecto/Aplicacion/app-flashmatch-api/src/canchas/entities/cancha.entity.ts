import { Usuario } from "src/auth/entities/usuario.entity";
import { Deporte } from "src/deportes/entities/deporte.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('canchas')
export class Cancha {
    @PrimaryGeneratedColumn('uuid')
    id_cancha: string;

    @Column({ type: 'varchar', length: 100 })
    nombre_cancha: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ubicacion: string;

    @ManyToOne(() => Deporte)
    id_deporte: Deporte;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio_por_hora: number;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitud: number;

    @ManyToOne(() => Usuario)
    id_admin_cancha: Usuario;
}


import { Usuario } from "src/auth/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deporte } from "src/deportes/entities/deporte.entity";
import { RangoEdad } from "src/rangos-edad/entities/rango-edad.entity";

@Entity('equipos')
export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id_equipo: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre_equipo: string;

    @Column({ type: 'text', nullable: true })
    logo_equipo: string;

    @Column({ type: 'text', nullable: true })
    descripcion_equipo: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitud: number;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creado_en: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_creador' })
    creador: Usuario;

    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_deporte' })
    deporte: Deporte;

    @ManyToOne(() => RangoEdad, (rangosEdad) => rangosEdad.id_rango, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_rango' })
    rangoEdad: RangoEdad;
}

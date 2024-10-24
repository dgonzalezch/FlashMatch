import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Deporte } from "src/deporte/entities/deporte.entity";
import { RangoEdad } from "src/rango-edad/entities/rango-edad.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";

@Entity('equipo')
export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id_equipo: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre_equipo: string;

    @Column({ type: 'text', nullable: true })
    logo_equipo: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ubicacion: string;
    
    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    longitud: number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'deporte_id' })
    deporte: Deporte;

    @ManyToOne(() => RangoEdad, (rangosEdad) => rangosEdad.id_rango_edad, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'rango_edad_id' })
    rangoEdad: RangoEdad;

    @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'creador_id' })
    creador: Usuario;

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;
}

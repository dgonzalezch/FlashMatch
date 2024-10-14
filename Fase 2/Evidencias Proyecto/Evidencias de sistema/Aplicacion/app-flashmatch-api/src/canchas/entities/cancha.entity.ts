import { Usuario } from "src/auth/entities/usuario.entity";
import { Deporte } from "src/deportes/entities/deporte.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('canchas')
export class Cancha {
    @PrimaryGeneratedColumn('uuid')
    id_cancha: string;

    @Column({ type: 'varchar', length: 100 })
    nombre_cancha: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio_por_hora: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitud: number;
    
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_deporte' })
    deporte: Deporte;
    
    @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_administrador_cancha' })
    administrador_cancha: Usuario;
}

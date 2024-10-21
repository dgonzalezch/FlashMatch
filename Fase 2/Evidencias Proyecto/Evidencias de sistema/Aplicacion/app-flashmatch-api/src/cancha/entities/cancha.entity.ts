import { Usuario } from "src/auth/entities/usuario.entity";
import { Deporte } from "src/deporte/entities/deporte.entity";
import { MaterialCancha } from "src/material-cancha/entities/material-cancha.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cancha') // Singular
export class Cancha {
    @PrimaryGeneratedColumn('uuid')
    id_cancha: string;

    @Column({ type: 'varchar', length: 100 })
    nombre_cancha: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio_por_hora: number;

    @Column({ type: 'varchar', length: 255, nullable: true })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    latitud: number;
    
    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    longitud: number;
    
    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    // Relación con Deporte
    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'deporte_id' }) // Nombre alineado con la columna en la DB
    deporte: Deporte;

    // Relación con TiposMaterial
    @ManyToOne(() => MaterialCancha, (material) => material.id_material_cancha, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'material_cancha_id' }) // Nombre alineado con la columna en la DB
    material: MaterialCancha;
    
    // Relación con Usuario (Administrador de la cancha)
    @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'administrador_cancha_id' })
    administrador_cancha: Usuario;

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;
}

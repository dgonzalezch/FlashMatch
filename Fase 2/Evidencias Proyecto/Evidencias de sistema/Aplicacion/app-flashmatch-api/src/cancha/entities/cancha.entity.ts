import { Deporte } from "src/deporte/entities/deporte.entity";
import { MaterialCancha } from "src/material-cancha/entities/material-cancha.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DisponibilidadCancha } from "./disponibilidad-cancha.entity";
import { ImagenCancha } from "./imagen-cancha.entity";

@Entity('cancha') // Singular
export class Cancha {
    @PrimaryGeneratedColumn('uuid')
    id_cancha: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre_cancha: string;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    precio_por_hora: number;

    @Column({ type: 'varchar', length: 255 })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 20, scale: 16 })
    latitud: number;

    @Column({ type: 'decimal', precision: 20, scale: 16 })
    longitud: number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'boolean', default: true })
    disponible: boolean;

    // Relación con Deporte
    @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'deporte_id' })
    deporte: Deporte;

    // Relación con TiposMaterial
    @ManyToOne(() => MaterialCancha, (material) => material.id_material_cancha, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'material_cancha_id' })
    material: MaterialCancha;

    // Relación con Usuario (Administrador de la cancha)
    @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'administrador_cancha_id' })
    administrador_cancha: Usuario;

    // Relación con Disponibilidad de Cancha
    @OneToMany(() => DisponibilidadCancha, (disponibilidad) => disponibilidad.cancha, { cascade: true })
    disponibilidad: DisponibilidadCancha[];

    // Relación con ImagenCancha (Una cancha puede tener muchas imágenes)
    @OneToMany(() => ImagenCancha, (imagenCancha) => imagenCancha.cancha, { cascade: true })
    imagenes: ImagenCancha[];

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;
}

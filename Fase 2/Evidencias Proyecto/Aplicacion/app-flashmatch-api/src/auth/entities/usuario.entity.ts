import { Equipo } from "src/equipos/entities/equipo.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('usuarios')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id_usuario: string;

    @Column({ type: 'varchar', length: 50 })
    nombre: string;

    @Column({ type: 'varchar', length: 50 })
    apellido: string;

    @Column({ type: 'varchar', unique: true, length: 9 })
    rut: string;

    @Column({ type: 'date' })
    fecha_nacimiento: Date;

    @Column({ type: 'varchar', unique: true, length: 100 })
    correo: string;

    @Column({ type: 'varchar', unique: true, length: 15 })
    telefono: string;

    @Column({ type: 'text', select: false })
    clave: string;

    @Column({ type: 'varchar', length: 50, nullable: true })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 10, scale: 8, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 11, scale: 8, nullable: true })
    longitud: number;
    
    @Column({ type: 'text', nullable: true })
    imagen_perfil: string;

    @Column({ type: 'text', array: true, default: ['usuario'] })
    roles: string[];

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creado_en: Date;

    @OneToMany(() => Equipo, (equipo) => equipo.creador, { cascade: true })
    equipos: Equipo[];

    // @OneToMany(() => VerificacionIdentidad, verificacion => verificacion.usuario)
    // verificaciones: VerificacionIdentidad[];

    // @OneToMany(() => Reserva, reserva => reserva.usuario)
    // reservas: Reserva[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.correo.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}

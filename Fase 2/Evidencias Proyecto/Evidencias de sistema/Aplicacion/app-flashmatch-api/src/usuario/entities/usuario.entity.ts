import { Equipo } from "src/equipo/entities/equipo.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeportePosicionUsuario } from "./deporte-posicion-usuario.entity";
import { EstadisticaDetalladaUsuario } from "./estadistica-detallada-usuario.entity";
import { ReservaCancha } from "src/reserva/entities/reserva-cancha.entity";

@Entity('usuario')
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

    @Column({ type: 'varchar', length: 200, nullable: true })
    ubicacion: string;

    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    latitud: number;

    @Column({ type: 'decimal', precision: 20, scale: 16, nullable: true })
    longitud: number;

    @Column({ type: 'text', nullable: true })
    imagen_perfil: string;

    @Column({ type: 'text', array: true, default: ['usuario'] })
    roles: string[];

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @OneToMany(() => Equipo, (equipo) => equipo.creador, { cascade: true })
    equipos: Equipo[];

    @OneToMany(() => DeportePosicionUsuario, (deportePosicionUsuario) => deportePosicionUsuario.usuario, { cascade: true })
    deportesPosicionesUsuarios: DeportePosicionUsuario[];

    @OneToMany(() => EstadisticaDetalladaUsuario, (estadisticaDetalladaUsuario) => estadisticaDetalladaUsuario.usuario, { cascade: true })
    estadisticasDetalladasUsuarios: EstadisticaDetalladaUsuario[];

    @OneToMany(() => ReservaCancha, (reserva) => reserva.usuario, { cascade: true })
    reservas: ReservaCancha[];

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.correo = this.correo.toLowerCase().trim();
        this.nombre = this.nombre.trim();
        this.apellido = this.apellido.trim();
        this.rut = this.rut.trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}


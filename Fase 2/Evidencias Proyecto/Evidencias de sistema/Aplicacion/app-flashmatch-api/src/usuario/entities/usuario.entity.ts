import { Equipo } from "src/equipo/entities/equipo.entity";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeportePosicionUsuario } from "./deporte-posicion-usuario.entity";
import { EstadisticaDetalladaUsuario } from "./estadistica-detallada-usuario.entity";
import { UsuarioPartido } from "src/usuario-partido/entities/usuario-partido.entity";
import { TipoPartido } from "src/tipo-partido/entities/tipo-partido.entity";
import { NivelHabilidad } from "src/nivel-habilidad/entities/nivel-habilidad.entity";
import { RangoEdad } from "src/rango-edad/entities/rango-edad.entity";
import { Notificacion } from "src/common/notificacion/entities/notificacion.entity";
import { EvaluacionJugador } from "src/common/evaluacion/entities/evaluacion-jugador.entity";

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

    @Column({ type: 'text', array: true, default: ['jugador'] })
    roles: string[];

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    // Preferencias usuario
    @ManyToOne(() => RangoEdad, { nullable: true })
    @JoinColumn({ name: 'rango_edad_id' })
    rangoEdad: RangoEdad;
  
    @ManyToOne(() => NivelHabilidad, { nullable: true })
    @JoinColumn({ name: 'nivel_habilidad_id' })
    nivelHabilidad: NivelHabilidad;
  
    @ManyToOne(() => TipoPartido, { nullable: true })
    @JoinColumn({ name: 'tipo_partido_id' })
    tipoPartido: TipoPartido;
    
    @Column({ type: 'int', nullable: true })
    distancia_cancha_max: number;

    @OneToMany(() => Equipo, (equipo) => equipo.creador, { cascade: true })
    equipos: Equipo[];

    @OneToMany(() => DeportePosicionUsuario, (deportePosicionUsuario) => deportePosicionUsuario.usuario, { cascade: true })
    deportesPosicionesUsuarios: DeportePosicionUsuario[];

    @OneToMany(() => EstadisticaDetalladaUsuario, (estadisticaDetalladaUsuario) => estadisticaDetalladaUsuario.usuario, { cascade: true })
    estadisticasDetalladasUsuarios: EstadisticaDetalladaUsuario[];

    @OneToMany(() => UsuarioPartido, (usuarioPartido) => usuarioPartido.usuario, { cascade: true })
    partidos: UsuarioPartido[];

    @OneToMany(() => Notificacion, notificacion => notificacion.usuario)
    notificaciones: Notificacion[];

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;

    @OneToMany(() => EvaluacionJugador, (evaluacion) => evaluacion.evaluado, { cascade: true })
    evaluaciones: EvaluacionJugador[];

    @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true, default: 0 })
    promedio_evaluacion: number;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        if (this.correo) this.correo = this.correo.toLowerCase().trim();
        if (this.nombre) this.nombre = this.nombre.trim();
        if (this.apellido) this.apellido = this.apellido.trim();
        if (this.rut) this.rut = this.rut.trim();
    }
    
    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();
    }
}


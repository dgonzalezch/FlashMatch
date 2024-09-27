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

    @Column({ type: 'varchar', unique: true, length: 15 })
    telefono: string;

    @Column({ type: 'varchar', unique: true, length: 100 })
    correo: string;

    @Column({ type: 'varchar', length: 255, select: false })
    clave: string;

    @Column({ type: 'text', array: true,  default: ['usuario'] })
    roles: string[];

    @Column({ type: 'text', nullable: true })
    imagen_perfil: string;

    @Column({ type: 'boolean', default: true })
    activo: boolean;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    creado_en: Date;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
    actualizado_en: Date;
    
    @OneToMany(() => Equipo, (equipo) => equipo.creador, { cascade: true })
    equipos: Equipo[];

    // @OneToMany(() => VerificacionIdentidad, verificacion => verificacion.usuario)
    // verificaciones: VerificacionIdentidad[];

    // @OneToMany(() => Reserva, reserva => reserva.usuario)
    // reservas: Reserva[];

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.correo.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert()
    }
}


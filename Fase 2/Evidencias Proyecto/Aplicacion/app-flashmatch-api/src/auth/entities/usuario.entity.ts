import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('usuario')
export class Usuario {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre: string;

    @Column('text')
    apellido: string

    @Column('text', {
        unique: true
    })
    rut: string

    @Column('text', {
        unique: true
    })
    telefono: string

    @Column('text', {
        unique: true
    })
    correo: string;

    @Column('text', {
        select: false
    })
    clave: string;

    @Column('text', {
        array: true,
        default: ['usuario']
    })
    roles: string[];

    @Column('bool', {
        default: true
    })
    activo: boolean;

    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.correo.toLocaleLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert()
    }
}


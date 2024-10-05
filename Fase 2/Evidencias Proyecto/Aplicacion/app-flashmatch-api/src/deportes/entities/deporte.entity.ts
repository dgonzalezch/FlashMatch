import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeportePosicion } from "../../deportes-posiciones/entities/deporte-posicion.entity";

@Entity('deportes')
export class Deporte {
    @PrimaryGeneratedColumn('uuid')
    id_deporte: string;

    @Column({ type: 'varchar', unique: true, length: 100 })
    nombre_deporte: string;

    @Column({ type: 'text', nullable: true })
    icono: string;

    @OneToMany(() => DeportePosicion, (deportePosicion) => deportePosicion.deporte, { cascade: true })
    deportesPosiciones: DeportePosicion[];

    @OneToMany(() => Equipo, (equipo) => equipo.deporte, { cascade: true })
    equipos: Equipo[];
}
import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rangos_edad')
export class RangoEdad {
    @PrimaryGeneratedColumn('uuid')
    id_rango: string;

    @Column({ type: 'int', nullable: false })
    edad_minima: string;

    @Column({ type: 'int', nullable: false })
    edad_maxima: string;

    @Column({ type: 'text', nullable: false })
    descripcion: string;

    @OneToMany(() => Equipo, (equipo) => equipo.rangoEdad, { cascade: true })
    equipos: Equipo[];
}

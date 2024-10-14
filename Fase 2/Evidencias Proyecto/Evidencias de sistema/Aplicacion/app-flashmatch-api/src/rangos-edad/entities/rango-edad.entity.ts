import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rangos_edad')
export class RangoEdad {
    @PrimaryGeneratedColumn('uuid')
    id_rango_edad: string;

    @Column({ type: 'int', nullable: false })
    edad_minima: number;

    @Column({ type: 'int', nullable: false })
    edad_maxima: number;

    @Column({ type: 'text', nullable: false })
    descripcion: string;

    @OneToMany(() => Equipo, (equipo) => equipo.rangoEdad, { cascade: true })
    equipos: Equipo[];
}

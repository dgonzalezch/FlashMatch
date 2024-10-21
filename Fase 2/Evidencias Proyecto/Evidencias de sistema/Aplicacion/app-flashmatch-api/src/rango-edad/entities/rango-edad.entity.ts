import { Equipo } from "src/equipo/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('rango_edad')
export class RangoEdad {
    @PrimaryGeneratedColumn('uuid')
    id_rango_edad: string;

    @Column({ type: 'int', nullable: false })
    edad_minima: number;

    @Column({ type: 'int', nullable: false })
    edad_maxima: number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    // Relación con Equipo
    @OneToMany(() => Equipo, (equipo) => equipo.rangoEdad, { cascade: true })
    equipos: Equipo[];
}

import { Cancha } from "src/canchas/entities/cancha.entity";
import { Equipo } from "src/equipos/entities/equipo.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('partidos')
export class Partido {
    @PrimaryGeneratedColumn('uuid')
    id_partido: string;

    @Column({ type: 'timestamp' })
    fecha_partido: Date;

    @ManyToOne(() => Cancha)
    id_cancha: Cancha;

    @ManyToOne(() => Equipo)
    equipo_1_id: Equipo;

    @ManyToOne(() => Equipo)
    equipo_2_id: Equipo;
}
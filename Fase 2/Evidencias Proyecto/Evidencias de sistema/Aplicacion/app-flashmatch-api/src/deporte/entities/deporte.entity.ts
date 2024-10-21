import { Equipo } from "src/equipo/entities/equipo.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { DeportePosicion } from "../../deporte-posicion/entities/deporte-posicion.entity";
import { ParametroRendimiento } from "src/parametro-rendimiento/entities/parametro-rendimiento.entity";
import { EstadisticaDetalladaUsuario } from "src/estadistica-detallada-usuario/entities/estadistica-detallada-usuario.entity";

@Entity('deporte')
export class Deporte {
    @PrimaryGeneratedColumn('uuid')
    id_deporte: string;

    @Column({ type: 'varchar', unique: true, length: 100 })
    nombre_deporte: string;

    @Column({ type: 'int', nullable: false })
    cantidad_min_jugadores : number;

    @Column({ type: 'int', nullable: false })
    cantidad_max_jugadores : number;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @Column({ type: 'text', nullable: true })
    icono: string;

    @OneToMany(() => DeportePosicion, (deportePosicion) => deportePosicion.deporte, { cascade: true })
    deportesPosiciones: DeportePosicion[];

    @OneToMany(() => ParametroRendimiento, (parametroRendimiento) => parametroRendimiento.deporte, { cascade: true })
    parametrosRendimiento: ParametroRendimiento[];

    @OneToMany(() => EstadisticaDetalladaUsuario, (estadisticaDetalladaUsuario) => estadisticaDetalladaUsuario.deporte, { cascade: true })
    estadisticaDetalladaUsuario: EstadisticaDetalladaUsuario[];

    @OneToMany(() => Equipo, (equipo) => equipo.deporte, { cascade: true })
    equipos: Equipo[];
}
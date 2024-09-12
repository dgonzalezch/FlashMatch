import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn()
    id_equipo: number;

    @Column('varchar', { length: 100, unique: true, nullable: false })
    nombre_equipo: string;

    @Column('text')
    logo_equipo: string;

    @Column('timestamp')
    creado_en: Date;
}

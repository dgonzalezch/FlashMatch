import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    nombre_equipo: string;
}

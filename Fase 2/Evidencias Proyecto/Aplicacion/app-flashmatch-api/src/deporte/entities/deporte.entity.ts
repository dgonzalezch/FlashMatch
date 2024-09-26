import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deporte {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true, nullable: false })
    nombre_deporte: string;

    @Column('text', { unique: true, nullable: false })
    icono: string;
}

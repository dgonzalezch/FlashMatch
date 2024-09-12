import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Deporte {
    @PrimaryGeneratedColumn()
    id_deporte: number;

    @Column('varchar', { length: 50, unique: true, nullable: false })
    nombre_deporte: string;

    @Column('varchar', { length: 25, unique: true, nullable: false })
    icono: string;
}

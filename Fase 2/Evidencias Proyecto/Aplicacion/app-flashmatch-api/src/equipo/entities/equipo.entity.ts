import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text', { unique: true, nullable: false })
    nombre: string;

    @Column('timestamp', { default: () => 'CURRENT_TIMESTAMP' })
    creado_en: Date;

    @Column('text', { nullable: false })
    logo: string;
}

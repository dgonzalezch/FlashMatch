import { Usuario } from "src/auth/entities/usuario.entity";
import { Deporte } from "src/deportes/entities/deporte.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('equipos')
export class Equipo {
    @PrimaryGeneratedColumn('uuid')
    id_equipo: string;

    @Column({ type: 'varchar', length: 100, unique: true })
    nombre_equipo: string;

    @Column({ type: 'text', nullable: true })
    logo_equipo: string;

    @Column({ type: 'text', nullable: true })
    descripcion_equipo: string;

    @CreateDateColumn({ type: 'timestamp' })
    creado_en: Date;

    @ManyToOne(() => Usuario, (usuario) => usuario.equipos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_creador' })
    creador: Usuario;

    @ManyToOne(() => Deporte, (deporte) => deporte.equipos, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_deporte' })
    deporte: Deporte;
}

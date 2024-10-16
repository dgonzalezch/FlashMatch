import { Usuario } from 'src/auth/entities/usuario.entity';
import { Cancha } from 'src/canchas/entities/cancha.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { NivelHabilidad } from 'src/niveles-habilidad/entities/nivel-habilidad.entity';
import { RangoEdad } from 'src/rangos-edad/entities/rango-edad.entity';
import { TipoEmparejamiento } from 'src/tipos-emparejamientos/entities/tipo-emparejamiento.entity';
import { TipoPartido } from 'src/tipos-partidos/entities/tipo-partido.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('partidos')
export class Partido {
    @PrimaryGeneratedColumn('uuid')
    id_partido: string;

    @Column()
    fecha_partido: Date;

    @ManyToOne(() => Deporte, { nullable: false })
    @JoinColumn({ name: 'id_deporte' })
    id_deporte: Deporte;

    @ManyToOne(() => TipoPartido, { nullable: false })
    @JoinColumn({ name: 'id_tipo_partido' })
    id_tipo_partido: TipoPartido;

    @ManyToOne(() => NivelHabilidad, { nullable: true })
    @JoinColumn({ name: 'id_nivel_habilidad' })
    id_nivel_habilidad: NivelHabilidad;

    @ManyToOne(() => RangoEdad, { nullable: false })
    @JoinColumn({ name: 'id_rango_edad' })
    id_rango_edad: RangoEdad;

    @ManyToOne(() => TipoEmparejamiento, { nullable: false })
    @JoinColumn({ name: 'id_tipo_emparejamiento' })
    id_tipo_emparejamiento: TipoEmparejamiento;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @ManyToOne(() => Cancha, { nullable: true })
    @JoinColumn({ name: 'id_cancha' })
    id_cancha: Cancha;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'id_usuario_creador' })
    id_usuario_creador: Usuario;

    @Column({ type: 'varchar', length: 50 })
    estado: string;

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;
}
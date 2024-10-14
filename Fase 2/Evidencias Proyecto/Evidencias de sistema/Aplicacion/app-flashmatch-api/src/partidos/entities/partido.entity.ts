import { Usuario } from 'src/auth/entities/usuario.entity';
import { Cancha } from 'src/canchas/entities/cancha.entity';
import { Deporte } from 'src/deportes/entities/deporte.entity';
import { NivelHabilidad } from 'src/niveles-habilidad/entities/nivel-habilidad.entity';
import { RangoEdad } from 'src/rangos-edad/entities/rango-edad.entity';
import { TipoPartido } from 'src/tipos-partidos/entities/tipo-partido.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
// import { TipoPartido } from './tipo-partido.entity'; // Asegúrate de tener la entidad TipoPartido
// import { NivelHabilidad } from './nivel-habilidad.entity'; // Asegúrate de tener la entidad NivelHabilidad
// import { RangoEdad } from './rango-edad.entity'; // Asegúrate de tener la entidad RangoEdad
// import { TipoEmparejamiento } from './tipo-emparejamiento.entity'; // Asegúrate de tener la entidad TipoEmparejamiento
// import { Cancha } from './cancha.entity'; // Asegúrate de tener la entidad Cancha
// import { Usuario } from './usuario.entity'; // Asegúrate de tener la entidad Usuario

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

    // @ManyToOne(() => TipoEmparejamiento, { nullable: false })
    // @JoinColumn({ name: 'id_tipo_emparejamiento' })
    // id_tipo_emparejamiento: TipoEmparejamiento;

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
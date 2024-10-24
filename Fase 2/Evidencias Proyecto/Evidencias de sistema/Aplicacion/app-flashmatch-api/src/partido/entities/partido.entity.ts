import { Cancha } from 'src/cancha/entities/cancha.entity';
import { Deporte } from 'src/deporte/entities/deporte.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { TipoEmparejamiento } from 'src/tipo-emparejamiento/entities/tipo-emparejamiento.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('partido')
export class Partido {
    @PrimaryGeneratedColumn('uuid')
    id_partido: string;

    @Column()
    fecha_partido: Date;

    @ManyToOne(() => Deporte, { nullable: false })
    @JoinColumn({ name: 'deporte_id' })
    deporte: Deporte;

    @ManyToOne(() => TipoPartido, { nullable: false })
    @JoinColumn({ name: 'tipo_partido_id' })
    tipoPartido: TipoPartido;

    @ManyToOne(() => NivelHabilidad, { nullable: true })
    @JoinColumn({ name: 'nivel_habilidad_id' })
    nivelHabilidad: NivelHabilidad;

    @ManyToOne(() => RangoEdad, { nullable: false })
    @JoinColumn({ name: 'rango_edad_id' })
    rangoEdad: RangoEdad;

    @ManyToOne(() => TipoEmparejamiento, { nullable: false })
    @JoinColumn({ name: 'tipo_emparejamiento_id' })
    tipoEmparejamiento: TipoEmparejamiento;

    @Column({ type: 'text', nullable: true })
    descripcion: string;

    @ManyToOne(() => Cancha, { nullable: true })
    @JoinColumn({ name: 'cancha_id' })
    cancha: Cancha;

    @ManyToOne(() => Usuario, { nullable: false })
    @JoinColumn({ name: 'usuario_creador_id' }) 
    usuarioCreador: Usuario;

    @Column({ type: 'varchar', length: 50 })
    estado: string;

    @CreateDateColumn({ name: 'creado_en' })
    creado_en: Date;
}

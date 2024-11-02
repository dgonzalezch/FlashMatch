import { Deporte } from 'src/deporte/entities/deporte.entity';
import { NivelHabilidad } from 'src/nivel-habilidad/entities/nivel-habilidad.entity';
import { RangoEdad } from 'src/rango-edad/entities/rango-edad.entity';
import { ReservaCancha } from 'src/reserva/entities/reserva-cancha.entity';
import { TipoEmparejamiento } from 'src/tipo-emparejamiento/entities/tipo-emparejamiento.entity';
import { TipoPartido } from 'src/tipo-partido/entities/tipo-partido.entity';
import { UsuarioPartido } from 'src/usuario-partido/entities/usuario-partido.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, OneToMany, OneToOne } from 'typeorm';

@Entity('partido')
export class Partido {
  @PrimaryGeneratedColumn('uuid')
  id_partido: string;

  @Column({ type: 'timestamp' })
  fecha_partido: Date;

  @ManyToOne(() => Deporte, { nullable: false })
  @JoinColumn({ name: 'deporte_id' })
  deporte: Deporte;

  @ManyToOne(() => TipoPartido, { nullable: false })
  @JoinColumn({ name: 'tipo_partido_id' })
  tipoPartido: TipoPartido;

  @ManyToOne(() => NivelHabilidad, { nullable: false })
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

  @ManyToOne(() => Usuario, { nullable: false })
  @JoinColumn({ name: 'creador_id' }) 
  creador: Usuario;

  @OneToOne(() => ReservaCancha, (reserva) => reserva.partido, { cascade: true })
  reserva: ReservaCancha;

  @OneToMany(() => UsuarioPartido, (usuarioPartido) => usuarioPartido.partido, { cascade: true })
  jugadores: UsuarioPartido[];

  @Column({ type: 'varchar', length: 50, default: 'pendiente_reserva' })
  estado: string;

  @Column({ type: 'text', nullable: true })
  mensaje_estado: string;

  @Column({ type: 'boolean', default: false })
  partido_privado: boolean;

  @Column({ type: 'timestamp', nullable: true })
  fecha_expiracion_reserva: Date;

  @Column({ type: 'int', default: 0 })
  jugadores_actuales: number;

  @Column({ type: 'int' })
  jugadores_requeridos: number;

  @Column({ type: 'int', nullable: true })
  jugadores_maximos: number;  // Límite máximo de jugadores (opcional)

  @Column({ type: 'boolean', default: false })
  permitir_reemplazos_automaticos: boolean;  // Permitir reemplazos automáticos

  @Column({ type: 'boolean', default: false })
  evaluacionNotificada: boolean;  // Control de notificación de evaluación

  @CreateDateColumn({ name: 'creado_en' })
  creado_en: Date;
}

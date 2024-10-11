import { Usuario } from "src/auth/entities/usuario.entity";
import { Deporte } from "src/deportes/entities/deporte.entity";
import { ParametroRendimiento } from "src/parametros-rendimiento/entities/parametro-rendimiento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity('estadisticas_detalladas_usuarios')
@Unique(['usuario', 'deporte', 'parametroRendimiento'])
export class EstadisticaDetalladaUsuario {
  @PrimaryGeneratedColumn('uuid')
  id_estadistica_detallada: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_deporte' })
  deporte: Deporte;

  @ManyToOne(() => ParametroRendimiento, (parametroRendimiento) => parametroRendimiento.id_parametro_rendimiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id_parametro_rendimiento' })
  parametroRendimiento: ParametroRendimiento;

  @Column('numeric', { precision: 5, scale: 2, nullable: false })
  parametro_valor: number;
}
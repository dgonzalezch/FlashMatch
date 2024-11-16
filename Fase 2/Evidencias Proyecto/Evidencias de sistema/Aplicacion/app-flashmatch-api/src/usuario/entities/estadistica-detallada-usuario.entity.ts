import { Deporte } from "src/deporte/entities/deporte.entity";
import { ParametroRendimiento } from "src/parametro-rendimiento/entities/parametro-rendimiento.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Usuario } from "./usuario.entity";

@Entity('estadistica_detallada_usuario')
@Unique(['usuario', 'deporte', 'parametroRendimiento'])
export class EstadisticaDetalladaUsuario {
  @PrimaryGeneratedColumn('uuid')
  id_estadistica_detallada: string;

  @ManyToOne(() => Usuario, (usuario) => usuario.id_usuario, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => Deporte, (deporte) => deporte.id_deporte, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'deporte_id' })
  deporte: Deporte;

  @ManyToOne(() => ParametroRendimiento, (parametroRendimiento) => parametroRendimiento.id_parametro_rendimiento, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'parametro_rendimiento_id' })
  parametroRendimiento: ParametroRendimiento;

  @Column('numeric', { precision: 5, scale: 2, nullable: false })
  parametro_valor: number;
}

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('pregunta_frecuente')
export class PreguntaFrecuente {
    @PrimaryGeneratedColumn('uuid')
    id_pregunta_frecuente: string;
  
    @Column({ type: 'text', nullable: false })
    pregunta: string;
  
    @Column({ type: 'text', nullable: false })
    respuesta: string;
  
    @Column({ type: 'boolean', default: true })
    activa: boolean;
}

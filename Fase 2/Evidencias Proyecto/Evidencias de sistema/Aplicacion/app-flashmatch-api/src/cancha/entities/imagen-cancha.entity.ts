import { Cancha } from './cancha.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('imagen_cancha')
export class ImagenCancha {
  @PrimaryGeneratedColumn('uuid')
  id_imagen_cancha: string;

  @ManyToOne(() => Cancha, (cancha) => cancha.imagenes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cancha_id' })
  cancha: Cancha;

  @Column({ type: 'text' })
  url_imagen: string;

  @CreateDateColumn({ name: 'subida_en' })
  subida_en: Date;
}

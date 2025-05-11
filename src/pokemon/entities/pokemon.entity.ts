import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Tipo } from './tipo.entity';

@Entity({ name: 'pokemon' })
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  nombre: string;

  @Column()
  imagen_url: string;

  @Column({ nullable: true })
  cloudinary_public_id: string;

@ManyToMany(() => Tipo, tipo => tipo.pokemones, { eager: true }) 
@JoinTable({
  name: 'pokemon_tipo',
  joinColumn: { name: 'pokemon_id', referencedColumnName: 'id' }, 
  inverseJoinColumn: { name: 'tipo_id', referencedColumnName: 'id' } 
})
tipos: Tipo[];
}

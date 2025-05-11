import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Pokemon } from './pokemon.entity';

@Entity({ name: 'tipo' })
export class Tipo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  nombre: string;

 @ManyToMany(() => Pokemon, pokemon => pokemon.tipos)
pokemones: Pokemon[];
}

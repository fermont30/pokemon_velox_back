import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tipo } from './entities/tipo.entity';


@Injectable()
export class TipoSeedService implements OnModuleInit {
  constructor(
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
  ) {}

  async onModuleInit() {
    await this.seedTipos();
  }

  private async seedTipos() {
    const tiposExistentes = await this.tipoRepository.count();
    if (tiposExistentes === 0) {
      const tipos = [
        { nombre: 'Agua' },
        { nombre: 'Bicho' },
        { nombre: 'Dragón' },
        { nombre: 'Eléctrico' },
        { nombre: 'Fantasma' },
        { nombre: 'Fuego' },
        { nombre: 'Hielo' },
        { nombre: 'Lucha' },
        { nombre: 'Normal' },
        { nombre: 'Planta' },
        { nombre: 'Psíquico' },
        { nombre: 'Roca' },
        { nombre: 'Tierra' },
        { nombre: 'Veneno' },
        { nombre: 'Volador' },
      ];

      await this.tipoRepository.save(tipos);
      console.log('Seed de tipos Pokémon completado!');
    }
  }
}
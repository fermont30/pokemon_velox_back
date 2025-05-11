import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Tipo } from './entities/tipo.entity';
import { Pokemon } from './entities/pokemon.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TipoSeedService } from './tipo.seed.service';

@Module({
  imports: [
  TypeOrmModule.forFeature([Pokemon, Tipo]),
  CloudinaryModule],
  controllers: [PokemonController],
  providers: [PokemonService, TipoSeedService],
})
export class PokemonModule {}

import { IsArray, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { IsPokemonName } from '../decorador_pokemon/is-pokemon-name.decorator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  @IsPokemonName({ message: 'El nombre proporcionado no es un Pokémon válido' })
  nombre: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tipos?: number[];
}

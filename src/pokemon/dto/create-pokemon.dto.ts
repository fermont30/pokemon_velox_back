import { IsArray, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePokemonDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsArray()
  @IsNumber({}, { each: true })
  @IsOptional()
  tipos?: number[];
}

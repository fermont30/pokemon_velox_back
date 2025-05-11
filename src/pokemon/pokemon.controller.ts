import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  ParseIntPipe,
  BadRequestException,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';

@Controller('pokemon')
@UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  //get tipos
  @Get('/tipos')
  findAllTipos() {
    return this.pokemonService.findAllTipos();
  }

  @Post()
  @UseInterceptors(FileInterceptor('imagen'))
  async create(
    @Body() createPokemonDto: CreatePokemonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    if (typeof createPokemonDto.tipos === 'string') {
      try {
        createPokemonDto.tipos = JSON.parse(createPokemonDto.tipos);
      } catch (e) {
        throw new BadRequestException('Formato de tipos inválido');
      }
    }

    return this.pokemonService.create(createPokemonDto, file);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen'))
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.pokemonService.update(id, updatePokemonDto, file);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.pokemonService.remove(id);
  }
}

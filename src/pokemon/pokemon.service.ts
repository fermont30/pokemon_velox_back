import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Repository } from 'typeorm';
import { Pokemon } from './entities/pokemon.entity';
import { Tipo } from './entities/tipo.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Tipo)
    private tipoRepository: Repository<Tipo>,
    private cloudinaryService: CloudinaryService,
  ) {}

  //get de tipos
  async findAllTipos(): Promise<Tipo[]> {
    return this.tipoRepository.find();
  }

async create(
  createPokemonDto: CreatePokemonDto,
  file?: Express.Multer.File,
): Promise<Pokemon> {
  // Verificar si el Pokémon ya existe
  const existingPokemon = await this.pokemonRepository.findOne({
    where: { nombre: createPokemonDto.nombre },
  });

  if (existingPokemon) {
    throw new ConflictException('El Pokémon ya está registrado intente con otro');
  }

  let tipos: Tipo[] = [];

  if (createPokemonDto.tipos && createPokemonDto.tipos.length > 0) {
    const tipoIds = createPokemonDto.tipos;
    tipos = await this.tipoRepository
      .createQueryBuilder('tipo')
      .where('tipo.id IN (:...ids)', { ids: tipoIds })
      .getMany();

    if (tipos.length !== tipoIds.length) {
      const missingIds = tipoIds.filter(
        (id) => !tipos.some((t) => t.id === id),
      );
      throw new NotFoundException(
        `Tipos no encontrados: ${missingIds.join(', ')}`,
      );
    }
  }

  let imagenUrl = '';
  let publicId = '';

  if (file) {
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validImageTypes.includes(file.mimetype)) {
      throw new BadRequestException('Solo se permiten archivos de imagen (jpeg, png, gif, webp)');
    }
    console.log('Uploading image to Cloudinary...');
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    imagenUrl = uploadResult.secure_url;
    publicId = uploadResult.public_id;
    console.log('Image uploaded successfully:', uploadResult);
  }

  const pokemon = this.pokemonRepository.create({
    nombre: createPokemonDto.nombre,
    tipos,
    imagen_url: imagenUrl,
    cloudinary_public_id: publicId,
  });

  return this.pokemonRepository.save(pokemon);
}



  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({ relations: ['tipos'] });
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id },
      relations: ['tipos'],
    });
    if (!pokemon)
      throw new NotFoundException(`Pokémon con ID ${id} no encontrado`);
    return pokemon;
  }

 async update(
  id: number,
  updatePokemonDto: UpdatePokemonDto,
  file?: Express.Multer.File,
): Promise<Pokemon> {
  const pokemon = await this.findOne(id);
  let imagenUrl = pokemon.imagen_url;
  let publicId = pokemon.cloudinary_public_id;

  if (updatePokemonDto.nombre && updatePokemonDto.nombre !== pokemon.nombre) {
    const existingPokemon = await this.pokemonRepository.findOne({
      where: { nombre: updatePokemonDto.nombre },
    });

    if (existingPokemon) {
      throw new ConflictException('El Pokémon ya está registrado. Intente con otro nombre.');
    }
  }

  if (file) {
    if (publicId) {
      await this.cloudinaryService.deleteImage(publicId);
    }
    const uploadResult = await this.cloudinaryService.uploadImage(file);
    imagenUrl = uploadResult.secure_url;
    publicId = uploadResult.public_id;
  }

  let tipos = pokemon.tipos;
  if (updatePokemonDto.tipos) {
    tipos = await this.tipoRepository.findByIds(updatePokemonDto.tipos);
  }

  const updatedPokemon = {
    ...pokemon,
    ...updatePokemonDto,
    tipos,
    imagen_url: imagenUrl,
    cloudinary_public_id: publicId,
  };

  return this.pokemonRepository.save(updatedPokemon);
}


  async remove(id: number): Promise<void> {
    const pokemon = await this.findOne(id);
    if (pokemon.cloudinary_public_id) {
      await this.cloudinaryService.deleteImage(pokemon.cloudinary_public_id);
    }
    await this.pokemonRepository.remove(pokemon);
  }
}

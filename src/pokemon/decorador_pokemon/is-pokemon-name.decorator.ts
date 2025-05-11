import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { POKEMON_NAMES } from './pokemon-names';

export function IsPokemonName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPokemonName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {          
          return POKEMON_NAMES.includes(value.toLowerCase());
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser un nombre de Pokémon válido`;
        }
      },
    });
  };
}

import axios, { AxiosResponse } from 'axios';

interface PokemonDetails {
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  moves: string[];
  types: string[];
}

const getPokemonDetails = async (pokemonName: string): Promise<PokemonDetails | undefined> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

    const { name, height, weight, abilities, moves, types } = response.data;

    const pokemonDetails: PokemonDetails = {
      name,
      height,
      weight,
      abilities: abilities.map((ability: any) => ability.ability.name),
      moves: moves.map((move: any) => move.move.name),
      types: types.map((type: any) => type.type.name),
    };

    return pokemonDetails;
  } catch (error) {
    console.log('Error fetching Pokemon details:', error);
    return undefined;
  }
};

// Usage example:
getPokemonDetails('pikachu')
  .then((pokemon: PokemonDetails | undefined) => {
    if (pokemon) {
      console.log('Pokemon Details:', pokemon);
    } else {
      console.log('Pokemon not found.');
    }
  })
  .catch((error) => {
    console.log('Error:', error);
  });

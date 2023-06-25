import axios, { AxiosResponse } from 'axios';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonAbility {
  ability: {
    name: string;
  };
}

interface PokemonSprites {
  front_default: string;
}

interface PokemonResponse {
  name: string;
  sprites: PokemonSprites;
  weight: number;
  abilities: PokemonAbility[];
}

export interface PokemonDetails {
  name: string;
  image: string;
  weight: number;
  skills: string[];
}

export interface PokemonApiResponse {
  results: PokemonDetails[];
  totalPages: number;
}

export const getPokemons = async (currentPage: number): Promise<PokemonApiResponse | undefined> => {
  try {
    const response: AxiosResponse<{ results: PokemonResult[] }> = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 10,
        offset: (currentPage - 1) * 10,
      },
    });

    const { results } = response.data;

    const pokemonDetailsPromises = results.map(async (pokemon: PokemonResult) => {
      const pokemonResponse: AxiosResponse<PokemonResponse> = await axios.get(pokemon.url);

      const { name, sprites, weight, abilities } = pokemonResponse.data;
      const skills = abilities.map((ability) => ability.ability.name);
      const image = sprites.front_default;
      return {
        name,
        image,
        weight,
        skills,
      };
    });

    const pokemonDetails: PokemonDetails[] = await Promise.all(pokemonDetailsPromises);

    return {
      results: pokemonDetails,
      totalPages: 129
    };
  } catch (error) {
    console.log('Error fetching Pokemon:', error);
    return undefined;
  }
};

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

interface PokemonDetails {
  name: string;
  image: string;
  height: number;
  skills: string[];
}

export const getPokemons = async (currentPage: number): Promise<PokemonDetails[] | undefined> => {
  try {
    const response: AxiosResponse<{ results: PokemonResult[] }> = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 10,
        offset: (currentPage - 1) * 10,
      },
    });

    const { results } = response.data;

    const pokemonDetailsPromises = results.map(async (pokemon: PokemonResult) => {
      const pokemonResponse: AxiosResponse<{
        name: string;
        sprites: PokemonSprites;
        height: number;
        abilities: PokemonAbility[];
      }> = await axios.get(pokemon.url);

      const { name, sprites, height, abilities } = pokemonResponse.data;
      const skills = abilities.map((ability) => ability.ability.name);
      const image = sprites.front_default;

      return {
        name,
        image,
        height,
        skills,
      };
    });

    const pokemonDetails: PokemonDetails[] = await Promise.all(pokemonDetailsPromises);

    return pokemonDetails;
  } catch (error) {
    console.log('Error fetching Pokemon:', error);
  }
};

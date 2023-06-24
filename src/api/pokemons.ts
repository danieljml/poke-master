import axios, { AxiosResponse } from 'axios';

interface PokemonResult {
  name: string;
  url: string;
}

interface PokemonResponse {
  results: PokemonResult[];
}

export const getPokemons = async (currentPage: number): Promise<PokemonResponse | undefined> => {
  try {
    const response: AxiosResponse<PokemonResponse> = await axios.get('https://pokeapi.co/api/v2/pokemon', {
      params: {
        limit: 10,
        offset: (currentPage - 1) * 10,
      },
    });
    return response.data;
  } catch (error) {
    console.log('Error fetching Pokemon:', error);
  }
};

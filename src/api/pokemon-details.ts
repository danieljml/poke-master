import axios, { AxiosResponse } from 'axios';

export const getPokemonDetails = async (name: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const speciesUrl = response?.data?.species?.url;
    const species = await axios.get(speciesUrl)
    const abilityPromises = response?.data?.abilities?.map(async (item: any) => {
      const abilityResponse = await axios.get(item?.ability?.url);
      return abilityResponse?.data;
    });
    const abilities = abilityPromises ? await Promise.all(abilityPromises) : [];
    const evolutionChain = await axios.get(species?.data?.evolution_chain?.url);
    return {
      general: response?.data,
      species: species?.data,
      abilities: abilities,
      evolutionChain: evolutionChain?.data,
    };
  } catch (error) {
    console.log('Error fetching Pokemon details:', error);
    throw error;
  }
};

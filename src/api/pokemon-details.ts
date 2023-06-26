import axios, { AxiosResponse } from 'axios';

export const getPokemonDetails = async (name: string): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
    const speciesUrl = response?.data?.species?.url;
    const species = await axios.get(speciesUrl);
    const abilityPromises = response?.data?.abilities?.map(async (item: any) => {
      const abilityResponse = await axios.get(item?.ability?.url);
      return abilityResponse?.data;
    });
    const abilities = abilityPromises ? await Promise.all(abilityPromises) : [];
    const evolutionChain = await axios.get(species?.data?.evolution_chain?.url);
    const weaknessesPromises = response?.data?.types?.map(async (type: any) => {
      const typeResponse = await axios.get(`https://pokeapi.co/api/v2/type/${type?.type?.name}`);
      return typeResponse?.data?.damage_relations?.double_damage_from;
    });
    const weaknessesResponse = weaknessesPromises ? await Promise.all(weaknessesPromises) : [];
    const weaknesses = weaknessesResponse.reduce((accumulator: string[], current: any) => {
      if (current) {
        const names = current.map((item: any) => item?.name);
        return [...accumulator, ...names];
      }
      return accumulator;
    }, []);

    return {
      general: response?.data,
      species: species?.data,
      abilities: abilities,
      evolutionChain: evolutionChain?.data,
      weaknesses: weaknesses,
    };
  } catch (error) {
    console.log('Error fetching Pokemon details:', error);
    throw error;
  }
};

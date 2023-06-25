import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import { getPokemonDetails } from '../../api/pokemon-details';
import styled from 'styled-components';

interface EvolutionChainProps {
  evolutionChain: any;
}

interface Ability {
  name: string;
  summary: string;
  description: string;
}

interface PokedexNumber {
  entryNumber: number;
  name: string;
}

interface ParsedPokemon {
  name: string;
  evolvesTo: ParsedPokemon[];
  condition: string | null;
}

const EvolutionChainCard = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
`;

const EvolutionChainTitle = styled.h3`
  font-size: 1.2em;
  font-weight: bold;
  color: #205d3e;
`;

const EvolutionChainText = styled.p`
  margin-top: 10px;
`;

const EvolutionChain: React.FC<EvolutionChainProps> = ({ evolutionChain }) => {
  const parseEvolutionChain = (chain: any): ParsedPokemon => {
    const parseChain = (pokemon: any): ParsedPokemon => {
      const parsedPokemon: ParsedPokemon = {
        name: pokemon.species.name,
        evolvesTo: [],
        condition: null
      };

      if (pokemon.evolution_details.length > 0) {
        parsedPokemon.condition = pokemon.evolution_details[0].trigger.name;
      }

      if (pokemon.evolves_to.length > 0) {
        pokemon.evolves_to.forEach((evolution: any) => {
          parsedPokemon.evolvesTo.push(parseChain(evolution));
        });
      }

      return parsedPokemon;
    };

    return parseChain(chain);
  };

  const renderEvolution = (pokemon: ParsedPokemon): JSX.Element => {
    return (
      <EvolutionChainCard key={pokemon.name}>
        <EvolutionChainTitle>{pokemon.name}</EvolutionChainTitle>
        {pokemon.condition && <EvolutionChainText>Condition: {pokemon.condition}</EvolutionChainText>}
        {pokemon.evolvesTo.length > 0 && (
          <ul>
            {pokemon.evolvesTo.map((evolution: ParsedPokemon) => (
              <li key={evolution.name}>{renderEvolution(evolution)}</li>
            ))}
          </ul>
        )}
      </EvolutionChainCard>
    );
  };

  return (
    <div>
      <h2>Evolution Chain:</h2>
      {renderEvolution(parseEvolutionChain(evolutionChain?.chain))}
    </div>
  );
};

const Details: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [details, setDetails] = useState<any | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = name ? await getPokemonDetails(name): null;

        if (response) {
          setDetails(response);
        }
      } catch (error) {
        console.log('Error fetching Pokemons: ', error);
      }
    };

    fetchDetails();
  }, [name]);

  const description = details?.species?.flavor_text_entries?.find(
    (item: any) => item?.language?.name === 'en'
  )?.flavor_text;
  const pokedexNumbers = details?.species?.pokedex_numbers?.map((item: any) => ({
    entryNumber: item?.entry_number,
    name: item?.pokedex?.name?.split('-')?.join(' ')
  }));
  const eggGroups = details?.species?.egg_groups?.map((item: any) => item?.name);
  const color = details?.species?.color?.name;
  const captureRate = details?.species?.capture_rate;
  const baseHappiness = details?.species?.base_happiness;
  const abilities = details?.abilities?.map((item: any) => ({
    name: item?.name?.split('-')?.join(' '),
    summary: item?.flavor_text_entries?.find((entry: any) => entry?.language?.name === 'en')
      ?.flavor_text,
    description: item?.effect_entries?.find((entry: any) => entry?.language?.name === 'en')
      ?.effect
  }));
  const evolutionChain = details?.evolutionChain;
  const formDescription = details?.species?.form_descriptions?.find(
    (item: any) => item?.language?.name === 'en'
  )?.description;
  const genus = details?.species?.genera?.find((item: any) => item?.language?.name === 'en')?.genus;
  const generation = details?.species?.generation?.name?.split('-')?.filter(
    (item: string) => item !== 'generation'
  )?.join(' ')?.toUpperCase();

  return (
    <>
      <Header />
      {details ? (
        <Container>
          <Title>{name}</Title>
          <PokemonImage src={details?.general?.sprites?.front_default} alt={name} />
          <Section>
            <SectionTitle>Description</SectionTitle>
            <SectionContent>{description}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Pokedex Numbers</SectionTitle>
            <SectionContent>
              <ul>
                {pokedexNumbers?.map((item: PokedexNumber) => (
                  <li key={item.name}>
                    <span>{item.entryNumber}</span>
                    <span>{item.name}</span>
                  </li>
                ))}
              </ul>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Egg Groups</SectionTitle>
            <SectionContent>
              <ul>
                {eggGroups?.map((item: string) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Color</SectionTitle>
            <SectionContent>{color}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Abilities</SectionTitle>
            <SectionContent>
              <ul>
                {abilities?.map((item: Ability) => (
                  <li key={item.name}>
                    <ul>
                      <li>Name: {item?.name}</li>
                      <li>Summary: {item?.summary}</li>
                      <li>Description: {item?.description}</li>
                    </ul>
                  </li>
                ))}
              </ul>
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Form Description</SectionTitle>
            <SectionContent>{formDescription}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Evolution Chain</SectionTitle>
            <SectionContent>
              <EvolutionChain evolutionChain={evolutionChain} />
            </SectionContent>
          </Section>
          <Section>
            <SectionTitle>Genus</SectionTitle>
            <SectionContent>{genus}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Generation</SectionTitle>
            <SectionContent>{generation}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Capture Rate</SectionTitle>
            <SectionContent>{captureRate}</SectionContent>
          </Section>
          <Section>
            <SectionTitle>Base Happiness</SectionTitle>
            <SectionContent>{baseHappiness}</SectionContent>
          </Section>
        </Container>
      ) : (
        <LoadingMsj>Loading...</LoadingMsj>
      )}
    </>
  );
};

const Section = styled.section`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SectionContent = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  text-transform: capitalize;
  color: #205d3e;
  font-size: 2em;
  font-weight: bold;
  margin-bottom: 20px;
`;

const Container = styled.div`
  padding: 20px 40px;
`;

const LoadingMsj = styled.h1`
  text-transform: capitalize;
  text-align: center;
  font-size: 2em;
  font-weight: bold;
`;

const PokemonImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 300px;
  max-height: 300px;
`;

export default Details;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';
import { getPokemonDetails } from '../../api/pokemon-details';
import styled from 'styled-components';

const EvolutionChain = ({ evolutionChain }) => {
	const parseEvolutionChain = (chain) => {
		const parseChain = (pokemon) => {
			const parsedPokemon = {
				name: pokemon.species.name,
				evolvesTo: [],
				condition: null
			};

			if (pokemon.evolution_details.length > 0) {
				parsedPokemon.condition = pokemon.evolution_details[0].trigger.name;
			}

			if (pokemon.evolves_to.length > 0) {
				pokemon.evolves_to.forEach((evolution) => {
					parsedPokemon.evolvesTo.push(parseChain(evolution));
				});
			}

			return parsedPokemon;
		};

		return parseChain(chain);
	};

  const renderEvolution = (pokemon) => {
    return (
      <div key={pokemon.name}>
        <h3>{pokemon.name}</h3>
        {pokemon.condition && <p>Condition: {pokemon.condition}</p>}
        {pokemon.evolvesTo?.length > 0 && (
          <ul>
            {pokemon.evolvesTo.map((evolution) => (
              <li key={evolution.name}>{renderEvolution(evolution)}</li>
            ))}
          </ul>
        )}
      </div>
    );
  };

  return (
    <div>
      <h2>Evolution Chain:</h2>
      {renderEvolution(parseEvolutionChain(evolutionChain?.chain))}
    </div>
  );
};

const Details = () => {
	let { name } = useParams();
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await getPokemonDetails(name);

        if (response) {
					setDetails(response);
        }
      } catch (error) {
        console.log('Error fetching Pokemons: ', error);
      }
    };

    fetchDetails();
  }, []);

	const description = details?.species?.flavor_text_entries?.filter(item => item?.language?.name === 'en')?.[0]?.flavor_text;
	const pokedexNumbers = details?.species?.pokedex_numbers?.map(item => ({ entryNumber: item?.entry_number, name: item?.pokedex?.name?.split('-')?.join(' ') }))
	const eggGroups = details?.species?.egg_groups?.map(item => item?.name);
	const color = details?.species?.color?.name
	const captureRate = details?.species?.capture_rate;
	const baseHappiness = details?.species?.base_happiness;
	const abilities = details?.abilities?.map(item => ({
			name: item?.name?.split('-')?.join(' '),
			summary: item?.flavor_text_entries?.filter(item => item?.language?.name === 'en')?.[0]?.flavor_text,
			description: item?.effect_entries?.filter(item => item?.language?.name === 'en')?.[0]?.effect,
	}));
	const evolutionChain = details?.evolutionChain;
	const formDescription = details?.species?.form_descriptions?.filter(item => item?.language?.name === 'en')?.[0]?.description
	const genus = details?.species?.genera?.filter(item => item?.language?.name === 'en')?.[0]?.genus;
	const generation = details?.species?.generation?.name?.split('-')?.filter(item => item !== 'generation')?.join(' ')?.toUpperCase();

  return (
    <>
      <Header />
			{details ? (
				<Container>
					<Title>{name}</Title>
					<Section>
						<SectionTitle>Description</SectionTitle>
						<SectionContent>{description}</SectionContent>
					</Section>
					<Section>
						<SectionTitle>Pokedex Numbers</SectionTitle>
						<SectionContent>
							<ul>
								{pokedexNumbers?.map(item => (
									<li>
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
								{eggGroups?.map(item => (
									<li>{item}</li>
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
								{abilities?.map(item => (
									<ul>
										<li>Name: {item?.name}</li>
										<li>Summary: {item?.summary}</li>
										<li>Description: {item?.description}</li>
									</ul>
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
						<SectionTitle></SectionTitle>
						<SectionContent></SectionContent>
					</Section>
				</Container>
			): (
				<p>Loading...</p>
			)}
		</>
  );
};

const Section = styled.section`
	margin: 20px 0;
`

const SectionTitle = styled.h2`
	font-size: 1.5em;
  font-weight: bold;
`

const SectionContent = styled.div`
`

const Title = styled.h1`
  color: #205D3E;
  font-size: 2em;
  font-weight: bold;
`

const Container = styled.div`
	padding: 20px 40px;
`

export default Details;

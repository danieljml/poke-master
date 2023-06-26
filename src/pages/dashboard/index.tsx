import { useState, useEffect } from 'react';
import Cards from '../../components/card';
import { getPokemons, PokemonApiResponse } from '../../api/pokemons';
import Pagination from '../../components/pagination';
import Loading from '../../components/loading';

interface PokemonDetails {
  name: string;
  image: string;
  weight: number;
  skills: string[];
}

const Dashboard = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const response: PokemonApiResponse | undefined = await getPokemons(currentPage);

        if (response) {
          const { results, totalPages } = response;
          setPokemons(results);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.log('Error fetching Pokemons: ', error);
      }
    };

    fetchPokemons();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <>
      {pokemons.length ? <Cards records={pokemons} /> : <Loading /> }
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Dashboard;

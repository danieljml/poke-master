import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cards from '../../components/card';
import Header from '../../components/header';
import { getPokemons, PokemonApiResponse } from '../../api/pokemons';
import Pagination from '../../components/pagination';

interface DashboardProps {
  user: boolean | null;
}

interface PokemonDetails {
  name: string;
  image: string;
  height: number;
  skills: string[];
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
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

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Cards records={pokemons} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Dashboard;

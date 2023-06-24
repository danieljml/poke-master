import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cards from '../../components/card';
import Header from '../../components/header';
import { getPokemons } from '../../api/pokemons';

interface DashboardProps {
  user: boolean | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
	const [pokemons, setPokemons] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const fetchPokemons = async () => {
			try {
				const currentPage = 1;
				const data = await getPokemons(currentPage);
				console.log(data);
				setPokemons(data);
			} catch (error) {
				console.log("Error fetching Pokemons: ", error);
			}
		}
		
		fetchPokemons();
	}, []);

  if (!user) {
    return <Navigate to="/login" />;
  }
	
  return (
    <>
      <Header />
      <Cards records={pokemons} />
    </>
  );
};

export default Dashboard;

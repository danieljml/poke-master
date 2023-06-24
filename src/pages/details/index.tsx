import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header';

const Details = () => {
	let { name } = useParams();
	console.log(name);
  return (
    <>
      <Header />
    </>
  );
};

export default Details;

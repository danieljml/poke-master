import React from 'react';
import { Navigate } from 'react-router-dom';
import Cards from '../../components/card';
import Header from '../../components/header';

interface DashboardProps {
  user: boolean | null;
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  console.log("user", user);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Header />
      <Cards />
    </>
  );
};

export default Dashboard;

import React from 'react';
import { Navigate } from 'react-router-dom';
import Cards from '../../components/card';

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
      <div>Dashboard page</div>
      <Cards />
    </>
  );
};

export default Dashboard;

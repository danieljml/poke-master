import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Details from './pages/details';
import Header from './components/header';

interface User {
  id: number;
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem('user') || 'null'));

  return (
    <Router>
      {user && <Header setUser={setUser} />}
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} />
        <Route
          path="/details/:name"
          element={user ? <Details /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App
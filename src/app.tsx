import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './index.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Details from './pages/details';
import Header from './components/header';
import Profile from './pages/user';
import jwt_decode from 'jwt-decode';

interface User {
  id: number;
  email: string;
  password: string;
}

const PrivateRoute: React.FC<{ user: User | null; path: string; component: React.ComponentType }> = ({
  user,
  path,
  component: Component,
}) => {
  if (path === '/login' && user) {
    return <Navigate to="/" replace />;
  }

  if (!user && path !== '/login') {
    return <Navigate to="/login" replace />;
  }

  return <Component />;
};

const getAndValidateUser = () => {
	const user = JSON.parse(localStorage.getItem('user') || 'null');
	if (!user || !user['token']) {
		return;
	}
	const decodedToken = jwt_decode(user['token']);
	if (!decodedToken) {
		return;
	}
	return user;
}

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(getAndValidateUser());
  
  const renderProfile = (): JSX.Element => {
    return user ? <Profile user={user}/> : <Navigate to="/profile" />;
  };
  
  const renderDashboard = (): JSX.Element => {
    return user ? <Dashboard /> : <Navigate to="/login" />;
  };

  const renderLogin = (): JSX.Element => {
    return user ? <Navigate to="/" /> : <Login setUser={setUser} />;
  };

  const renderDetails = (): JSX.Element => {
    return user ? <Details /> : <Navigate to="/login" />;
  };

  return (
    <Router>
      {user && <Header setUser={setUser} />}
      <Routes>
        <Route path="/" element={<PrivateRoute user={user} path="/" component={renderDashboard} />} />
        <Route path="/profile" element={<PrivateRoute user={user} path="/profile" component={renderProfile} />} />
        <Route path="/login" element={<PrivateRoute user={user} path="/login" component={renderLogin} />} />
        <Route path="/details/:name" element={<PrivateRoute user={user} path="/details/:name" component={renderDetails} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;

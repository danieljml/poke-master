import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Details from './pages/details';


interface User {
  id: number,
  email:string,
  password: string
}

const App = () => {
  const [user, setUser] = useState<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard user={Boolean(user)} />,
    },
    {
      path: '/login',
      element: <Login setUser ={setUser}/>,
    },
		{
			path: '/details/:name',
			element: <Details />
		}
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

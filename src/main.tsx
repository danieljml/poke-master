import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import Dashboard from './pages/dashboard';
import Login from './pages/login';


const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/login',
      element: <Login/>,
    },
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

import React from 'react';
import { createRoot } from "react-dom/client";
import './index.css';
import App from './app';


const rootElement = document.getElementById('root') as Element;
createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
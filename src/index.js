import React from 'react';
import { createRoot } from 'react-dom/client';
import Routes from './Routes/Routes'; // Assuming Routes.js is in the same directory

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Routes />
  </React.StrictMode>
);

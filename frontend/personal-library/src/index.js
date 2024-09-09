import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root
const root = createRoot(rootElement);

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

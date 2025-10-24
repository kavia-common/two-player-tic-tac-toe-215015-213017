import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * Entry point mounting the React app to #root.
 */
const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}

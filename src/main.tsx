import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/archivo';
import '@fontsource/newsreader';
import '@fontsource/ibm-plex-mono';

import './styles/tokens.css';
import './styles/reset.css';
import './styles/typography.css';
import './styles/layout.css';
import './styles/components.css';

import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


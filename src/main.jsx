import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bear-react-carousel/dist/index.css';
import App from './components/App.jsx';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import ToggleColorMode from './context/ToggleColorMode.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <ToggleColorMode>
      <CssBaseline />
      <App />
    </ToggleColorMode>
  </Provider>,
);

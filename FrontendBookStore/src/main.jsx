import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from './store';
import axios from 'axios';
import { CookiesProvider } from 'react-cookie';

axios.defaults.baseURL = 'http://localhost:5000/api/';

ReactDOM.createRoot(document.getElementById('root')).render(
  <CookiesProvider>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>,
  </CookiesProvider>
)

import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './Pages/Home';
import './globalstyles.css';

import { ApolloProvider } from '@apollo/client';
import { client } from './config/client.grapgql';



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
    <Home />
  </ApolloProvider>
);



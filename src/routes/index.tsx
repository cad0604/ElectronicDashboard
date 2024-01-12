import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import App from './app.routes';

const Route: React.FC = () => {

  return <BrowserRouter><App /></BrowserRouter>
};

export default Route;

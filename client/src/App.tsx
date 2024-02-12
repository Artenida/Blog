import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/Routes';

const App = () => {
  return (
    <div className="App">
        <AppRoutes />
    </div>
  );
}

export default App;

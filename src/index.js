import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home';
import Show from './pages/Show';
import { CoinsProvider } from './context/coinsContext';
import './style.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <CoinsProvider>
      <Routes>
        <Route index element={<Home />} />
        <Route path='/:id' element={<Show />} />
      </Routes>
    </CoinsProvider>
  </BrowserRouter>
);



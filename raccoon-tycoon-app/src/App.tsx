import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Home } from './Home';
import { Setup } from './Setup';
import { Finish } from './Finish';

import { HashRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App m-3">
      <h1>
        TCA Raccoon Tycoon
      </h1>
      <h2>
        Companion App
      </h2>
      <hr />
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/finish" element={<Finish />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import TurDetaljer from './TurDetaljer';
import PlanleggTur from './PlanleggTur';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/tur/:id" element={<TurDetaljer />} />
        <Route path="/planlegg/:id" element={<PlanleggTur />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetails from './pages/RecipeDetails';
import './App.css'; // Importante ito para sa layout

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Static Page: Listahan ng Recipes (API 1) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Dynamic Page: Detalye ng Recipe (API 2) */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
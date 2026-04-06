import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetails from './pages/RecipeDetails';

// ETO ANG PINAKA-IMPORTANTE PARA GUMANA ANG DESIGN:
import './App.css'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Static Page: Recipe List (API 1) */}
          <Route path="/" element={<HomePage />} />
          
          {/* Dynamic Page: Recipe Detail (API 2 gamit ang ID) */}
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import RecipeDetails from './pages/RecipeDetails';

function App() {
  return (
    <Router>
      <Routes>
        {/* Static Page: Recipe List */}
        <Route path="/" element={<HomePage />} />
        
        {/* Dynamic Page: Recipe Detail gamit ang ID parameter */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSeafoodRecipesQuery } from '../features/api/apiSlice';

const HomePage = () => {
  // 1. Fetch data gamit ang RTK Query (API 1: Seafood List)
  const { data, isLoading, error } = useGetSeafoodRecipesQuery();
  
  // 2. States para sa Search at Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; // Requirement: Hatiin ang listahan para sa pagination

  if (isLoading) return <div className="status-message">Loading fresh seafood...</div>;
  if (error) return <div className="status-message">Something went wrong. Please refresh the page.</div>;

  // 3. Search Engine Logic (Real-time filtering)
  const filteredRecipes = data?.meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // 4. Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="container">
      <header className="home-header">
        <h1>Seafood Recipe Explorer</h1>
        <p>Discover the best seafood dishes from around the world.</p>
        
        {/* Search Input Section */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a recipe (e.g. Fish, Prawn)..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset sa page 1 para hindi mag-error ang pagination
            }}
          />
        </div>
      </header>

      {/* Recipe Grid: Dito aayusin ng CSS ang "panget" na layout */}
      <div className="recipe-container">
        {currentRecipes.length > 0 ? (
          currentRecipes.map((meal) => (
            <div key={meal.idMeal} className="recipe-card">
              <div className="card-image-wrapper">
                <img src={meal.strMealThumb} alt={meal.strMeal} />
              </div>
              <div className="card-content">
                <h3>{meal.strMeal}</h3>
                <Link to={`/recipe/${meal.idMeal}`} className="view-btn">
                  View Full Recipe
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="status-message">No recipes found for "{searchTerm}"</div>
        )}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo(0, 0); // Scroll to top para magandang UX
              }}
              className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomePage;
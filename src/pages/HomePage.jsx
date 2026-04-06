import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSeafoodRecipesQuery } from '../features/api/apiSlice';

const HomePage = () => {
  // Fetch data gamit ang RTK Query
  const { data, isLoading, error } = useGetSeafoodRecipesQuery();
  
  // States para sa Search at Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; 

  if (isLoading) return <div className="status-message">Loading recipes...</div>;
  if (error) return <div className="status-message">Error loading data.</div>;

  // Search Engine Logic: Real-time filtering
  const filteredRecipes = data?.meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // Pagination Logic
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div className="container">
      <header>
        <h1>Seafood Recipe Explorer</h1>
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search for a recipe..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset sa page 1 pag nag-search
            }}
          />
        </div>
      </header>

      {/* Grid Layout Container */}
      <div className="recipe-container">
        {currentRecipes.map((meal) => (
          <div key={meal.idMeal} className="recipe-card">
            <img src={meal.strMealThumb} alt={meal.strMeal} />
            <div className="card-content">
              <h3>{meal.strMeal}</h3>
              <Link to={`/recipe/${meal.idMeal}`} className="view-btn">
                View Full Recipe
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => {
                setCurrentPage(i + 1);
                window.scrollTo(0, 0);
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
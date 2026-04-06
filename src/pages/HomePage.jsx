import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetSeafoodRecipesQuery } from '../features/api/apiSlice';

const HomePage = () => {
  const { data, isLoading, error } = useGetSeafoodRecipesQuery();
  
  // States para sa Search at Pagination [cite: 29, 30]
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 8; // Requirement: Hatiin ang listahan 

  if (isLoading) return <p>Loading recipes...</p>;
  if (error) return <p>Error loading data.</p>;

  // 1. Search Logic: I-filter ang meals base sa input 
  const filteredRecipes = data?.meals?.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  // 2. Pagination Logic: Kunin lang ang recipes para sa current page 
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Seafood Recipe Explorer</h1>

      {/* Search Input Section [cite: 29] */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search for a recipe..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset sa page 1 kapag nag-search [cite: 32]
          }}
          style={{ padding: '10px', width: '300px' }}
        />
      </div>

      {/* Recipe Grid [cite: 18, 32] */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {currentRecipes.map((meal) => (
          <div key={meal.idMeal} style={{ border: '1px solid #ddd', padding: '10px', borderRadius: '8px' }}>
            <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: '5px' }} />
            <h4>{meal.strMeal}</h4>
            <Link to={`/recipe/${meal.idMeal}`}>View Recipe</Link>
          </div>
        ))}
      </div>

      {/* Pagination Controls  */}
      <div style={{ marginTop: '30px', display: 'flex', gap: '5px', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            style={{
              padding: '8px 12px',
              backgroundColor: currentPage === i + 1 ? '#007bff' : '#fff',
              color: currentPage === i + 1 ? '#fff' : '#000',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
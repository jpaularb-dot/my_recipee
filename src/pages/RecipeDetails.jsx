import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetRecipeDetailsQuery } from '../features/api/apiSlice';

const RecipeDetails = () => {
  const { id } = useParams(); // Kukuha ng ID mula sa URL (/recipe/:id)
  const navigate = useNavigate();
  
  // Requirement: API 2 Integration & Dynamic Fetching
  const { data, isLoading, error } = useGetRecipeDetailsQuery(id);

  // Requirement: Error Handling & UX (Loading/Error states)
  if (isLoading) return <div className="loader">Loading recipe details...</div>;
  if (error) return <div className="error">Something went wrong. Please try again.</div>;

  const meal = data?.meals?.[0];

  if (!meal) return <p>Recipe not found.</p>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => navigate(-1)}>Go Back</button>
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} style={{ width: '100%', borderRadius: '8px' }} />
      
      <h3>Category: {meal.strCategory} | Area: {meal.strArea}</h3>
      
      <h4>Instructions:</h4>
      <p style={{ lineHeight: '1.6' }}>{meal.strInstructions}</p>

      <h4>Ingredients:</h4>
      <ul>
        {/* Simple logic para ilista ang ingredients mula sa API response */}
        {Object.keys(meal)
          .filter(key => key.startsWith('strIngredient') && meal[key])
          .map((key, index) => (
            <li key={index}>{meal[key]} - {meal[`strMeasure${index + 1}`]}</li>
          ))}
      </ul>
    </div>
  );
};

export default RecipeDetails;
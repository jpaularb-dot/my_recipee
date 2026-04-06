import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const recipeApi = createApi({
  reducerPath: 'recipeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://www.themealdb.com/api/json/v1/1/' }),
  endpoints: (builder) => ({
    // API 1: Listahan ng Seafood [cite: 6]
    getSeafoodRecipes: builder.query({
      query: () => 'filter.php?c=Seafood',
    }),
    // API 2: Detalye ng Meal gamit ang ID [cite: 7]
    getRecipeDetails: builder.query({
      query: (id) => `lookup.php?i=${id}`,
    }),
  }),
});

export const { useGetSeafoodRecipesQuery, useGetRecipeDetailsQuery } = recipeApi;
import { configureStore } from '@reduxjs/toolkit';
import { recipeApi } from '../features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [recipeApi.reducerPath]: recipeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeApi.middleware),
});
import { configureStore } from '@reduxjs/toolkit';
import currentQuerySlice from '../features/currentQuerySlice';
import searchQuerySlice from '../features/searchQuerySlice';
import { kinopoiskApi } from '../services/kinopoiskApi';

export const store = configureStore({
  reducer: {
    [kinopoiskApi.reducerPath]: kinopoiskApi.reducer,
    currentQuerySlice: currentQuerySlice,
    searchQuerySlice: searchQuerySlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(kinopoiskApi.middleware),
});

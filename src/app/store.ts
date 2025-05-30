import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/newsActions'
import favoritesReducer from '../features/favoriteActions'
import filterReducer from '../features/filterActions'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    favorites: favoritesReducer,
    filter: filterReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

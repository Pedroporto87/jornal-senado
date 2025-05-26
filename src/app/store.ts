import { configureStore } from '@reduxjs/toolkit';
import newsReducer from '../features/newsActions'
import favoritesReducer from '../features/favoriteActions'

export const store = configureStore({
  reducer: {
    news: newsReducer,
    favorites: favoritesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

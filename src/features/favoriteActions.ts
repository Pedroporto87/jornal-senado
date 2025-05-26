import { createSlice } from '@reduxjs/toolkit'

interface FavoritesState {
    articles: any[]; // ou um tipo mais definido
  }

  const initialState: FavoritesState = {
    articles: [] as { url: string }[], 
  };

const favoritesSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: ( state, action ) => {
            const article = action.payload
            if(!state.articles.find(a => a.url === article.url)){
                state.articles.push(article);
            }
        },
        removeFavorite: (state, action) => {
            const url = action.payload;
            state.articles = state.articles.filter(article => article.url !== url);
        },
        setFavorite: ( state, action ) => {
            state.articles = action.payload;
        },
    },
})

export const { addFavorite, removeFavorite, setFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
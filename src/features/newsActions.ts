import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = 'ccd791acd9af43a4894147d61f577031'
const BASE_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

export const getNews = createAsyncThunk(
    'news/getNews',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(BASE_URL);
            return response.data.articles;
        } catch {
            console.error('Erro ao buscar notícias');
            return thunkApi.rejectWithValue('Erro ao buscar notícias');
        }
    }
);

interface NewsState {
    articles: any[];
    loading: boolean;
    error: string | null;
}

const initialState: NewsState = {
    articles: [],
    loading: false,
    error: null,
  };

  const newsSlice = createSlice({
    name: 'news',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(getNews.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(getNews.fulfilled, (state, action) => {
          state.articles = action.payload;
          state.loading = false;
        })
        .addCase(getNews.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as string;
        });
    },
  });
  
  export default newsSlice.reducer;
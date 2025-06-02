import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


// const API_KEY = 'ccd791acd9af43a4894147d61f577031'
// const BASE_URL = `https://newsapi.org/v2/everything?q=${subject}&language=${language}&apiKey=${API_KEY}`;

export const getNews = createAsyncThunk(
    'news/getNews',
    async ({ subject, language }: { subject: string; language: string }, thunkApi) => {
      const API_KEY = 'ccd791acd9af43a4894147d61f577031'
      const BASE_URL = `https://newsapi.org/v2/everything?q=${subject}&language=${language}&apiKey=${API_KEY}`;

        try {
            const response = await axios.get(BASE_URL);
            await AsyncStorage.setItem(
              'newsCache',
              JSON.stringify(response.data.articles)
            );
            return response.data.articles;
        } catch {
            console.error('Erro ao buscar notícias');
            const cachedData = await AsyncStorage.getItem('newsCache');
            if (cachedData) {
              return JSON.parse(cachedData);
            }
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
    reducers: {
      setArticles: (state, action) => {
        state.articles = action.payload;
      },
    },
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
  export const { setArticles } = newsSlice.actions;
  export default newsSlice.reducer;
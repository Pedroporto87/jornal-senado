import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = 'FAVORITES';

export const saveFavorites = async (articles: { url: string }[]) => {
    try {
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(articles));
    } catch (e) {
      console.warn('Erro ao salvar favoritos:', e);
    }
  };

  export const loadFavorites = async (dispatch, setFavorites) => {
    try {
      const json = await AsyncStorage.getItem(FAVORITES_KEY);
      const articles = json ? JSON.parse(json) : [];
      dispatch(setFavorites(articles));
    } catch (e) {
      console.warn('Erro ao carregar favoritos:', e);
    }
  };
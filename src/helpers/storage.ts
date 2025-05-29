import AsyncStorage from "@react-native-async-storage/async-storage";

export const FAVORITES_KEY = 'FAVORITES';

export const saveFavorites = async (articles: any[]) => {
  try {
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(articles));
  } catch (e) {
    console.warn('Erro ao salvar favoritos:', e);
  }
};

export const loadFavorites = async (dispatch, setFavorites) => {
  try {
    const json = await AsyncStorage.getItem(FAVORITES_KEY);
    const rawFavorites = json ? JSON.parse(json) : [];
    // Normalize para garantir que todos sejam objetos com 'url'
    const favorites = rawFavorites.map(item =>
      typeof item === 'string' ? { url: item } : item
    );
    dispatch(setFavorites(favorites));
  } catch (e) {
    console.warn('Erro ao carregar favoritos:', e);
  }
};

// export const removerItensEspecificos = async () => {
//   try {
//     const json = await AsyncStorage.getItem(FAVORITES_KEY);
//     if (json) {
//       let favoritos = JSON.parse(json);
//       // Normalizar para objetos
//       favoritos = favoritos.map(item => typeof item === 'string' ? { url: item } : item);
//       // Remove os itens indesejados
//       favoritos = favoritos.filter(item => 
//         item.url !== "http://hipertextual.com/2025/05/irlanda-multa-a-tiktok-con-mas-de-500-millones-de-euros" &&
//         item.url !== "https://www.xataka.com/servicios/espana-se-queda-a-oscuras-apagon-general-nos-ha-dejado-a-todos-luz"
//       );
//       await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritos));
//       console.log('Itens removidos:', favoritos);
//     }
//   } catch (e) {
//     console.warn('Erro ao remover itens específicos:', e);
//   }
// };

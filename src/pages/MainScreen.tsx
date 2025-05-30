import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import  { Navbar }  from "../components/Navbar";
import { NewsCard } from '../components/NewsCard';
import { getNews } from '../features/newsActions'
import { FavoritesFilterBar } from '../components/FavoriteandFiltersView';
import { RootState } from '../app/store'; 
import { loadFavorites } from '../helpers/storage'
import { setFavorite } from '../features/favoriteActions';



export default function MainScreen() {
  const [showFavorites, setShowFavorites] = useState(false);
  const [activeFilters, setActiveFilters] = useState(false);
  const dispatch = useDispatch<typeof import('../app/store').store.dispatch>();
  const { articles, loading, error } = useSelector((state: any) => state.news);
  const [searchTerm, setSearchTerm] = useState('');
  const favorites = useSelector((state: RootState) => state.favorites.articles);
  const favoritesCount = favorites.length;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'MainScreen'>>()
  const { subject, language } = useSelector((state: RootState) => state.filter);


  useEffect(() => {
    dispatch(getNews({ subject, language }));
  }, [dispatch, subject, language]);

  useEffect(() => {
    loadFavorites(dispatch, setFavorite) 
  }, [dispatch]) 

  const handleFavoritesPress = () => {
    navigation.navigate('FavoriteScreen'); // nome da sua tela
  };

  const filteredArticles = articles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
    <Navbar
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}

      />
      <FavoritesFilterBar
        favoritesCount={favoritesCount}
        hasFilters={activeFilters} 
        onFavoritesPress={handleFavoritesPress}
        />
      {loading && <Text>Carregando...</Text>}
      {error && <Text>{error}</Text>}

      {!loading && !error && (
        <FlatList
          data={filteredArticles}
          keyExtractor={(item: any) => item.url}
          renderItem={({ item }) => (
            <NewsCard
              source={item.source.name}
              title={item.title}
              imageUrl={item.urlToImage}
              publishedAt={item.publishedAt}
              url={item.url}
              content={item.content}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { Text, View, StyleSheet, FlatList, Animated, Image } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import  { Navbar }  from "../components/Navbar";
import { NewsCard } from '../components/NewsCard';
import { getNews, setArticles } from '../features/newsActions'
import { FavoritesFilterBar } from '../components/FavoriteandFiltersView';
import { RootState } from '../app/store'; 
import { loadFavorites } from '../helpers/storage'
import { setFavorite } from '../features/favoriteActions';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';


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
  const [offline, setOffline] = useState(false);
  const [cacheLoaded, setCacheLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    NetInfo.fetch().then(state => {
      if (!state.isConnected) {
        setOffline(true);
        loadCache();
      } else {
        setOffline(false);
        dispatch(getNews({ subject, language }));
      }
    });
  }, [dispatch, subject, language]);

  useEffect(() => {
    loadFavorites(dispatch, setFavorite) 
  }, [dispatch]) 

  const loadCache = async () => {
    try {
      const cachedData = await AsyncStorage.getItem('newsCache');
      if (cachedData) {
        dispatch(setArticles(JSON.parse(cachedData))); 
        setCacheLoaded(true);
      }
    } catch (e) {
      console.log('Erro ao carregar cache:', e);
    }
  };
  const handleFavoritesPress = () => {
    navigation.navigate('FavoriteScreen');
  };

  const filteredArticles = articles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View
    style={[
      styles.container,
      offline ? styles.offlineContainer : null
    ]}
  >
    <Navbar
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}

      />
      <FavoritesFilterBar
        favoritesCount={favoritesCount}
        hasFilters={activeFilters} 
        onFavoritesPress={handleFavoritesPress}
        />
      {offline && (
        <Text style={styles.offlineMessage}>Modo offline</Text>
      )}
      {loading && (
        <Animated.View style={[styles.logoOverlay, { opacity: fadeAnim }]}>
          <View style={styles.logoBackground} />
          <View style={styles.logoContainer}>
            <Image source={require('../../assets/images/Senado Federal.png')} style={styles.logo} />
            <Text style={styles.loadingText}>Carregando...</Text>
          </View>
        </Animated.View>
      )}
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
  offlineContainer: {
    backgroundColor: '#222', // fundo escuro
  },
  offlineMessage: {
    color: 'red',
    marginBottom: 10,
    fontSize: 16,
  },
  logoOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  logoBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // fundo escurecido atrás do logo
  },
  logoContainer: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
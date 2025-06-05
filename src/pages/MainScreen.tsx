import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/types';
import { Text, View, StyleSheet, FlatList, Animated, Image, TouchableOpacity } from "react-native";
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
import ErrorComponent from '../components/ErrorComponent';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function MainScreen() {
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
  const [showFilters, setShowFilters] = useState(true);

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

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

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
      <TouchableOpacity style={styles.header} onPress={toggleFilters}>
        <Text style={styles.headerText}>Favoritos e Filtros</Text>
        <Icon
          name={showFilters ? 'chevron-up' : 'chevron-down'}
          size={24}
          color="#333"
        />
      </TouchableOpacity>
      {showFilters && (
        <FavoritesFilterBar
          favoritesCount={favoritesCount}
          onFavoritesPress={handleFavoritesPress}
          hasFilters={activeFilters}
        />
      )}
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
      {error && <ErrorComponent message="Erro ao carregar notícias" />}

      {!loading && !error && (
        <View style={styles.listContainer}>
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
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    alignSelf: 'center',          
    maxWidth: 769,                
    width: '100%',                
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: 'rgba(222, 221, 221, 0.91)',
    borderBottomColor: '#8e8e8e',
    borderBottomWidth: 1,
  },
  headerText: {
    fontSize: 12,
    fontWeight: 'bold',
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
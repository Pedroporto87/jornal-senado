import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import  { Navbar }  from "../components/Navbar";
import { NewsCard } from '../components/NewsCard';
import { getNews } from '../features/newsActions'

export default function MainScreen() {
  const dispatch = useDispatch<typeof import('../app/store').store.dispatch>();
  const { articles, loading, error } = useSelector((state: any) => state.news);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getNews());
  }, [dispatch]);

  const filteredArticles = articles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFilterPress = () => {
    // implemente o que acontecer ao clicar no botão de filtros
    alert('Filtros clicados!');
  };

  return (
    <View style={styles.container}>
    <Navbar
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        onFilterPress={handleFilterPress}
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
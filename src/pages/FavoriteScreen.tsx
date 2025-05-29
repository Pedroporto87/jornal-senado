import React, { useState, useEffect} from "react";
import { RootState } from '../app/store';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { loadFavorites } from "../helpers/storage";
import { NewsCard } from "../components/NewsCard";
import { useSelector, useDispatch } from 'react-redux'

export default function FavoriteScreen() {
    const dispatch = useDispatch();
    const favorites = useSelector((state: RootState) => state.favorites.articles);
    const [favoriteArticles, setFavoriteArticles] = useState([]);

    useEffect(() => {
        loadFavorites(dispatch).then((articles) => {
          setFavoriteArticles(articles);
        });
      }, []);

      return (
      <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Jornal do Senado</Text>
            <View style={styles.titleBorder} />
            </View>
            <View style={styles.searchBorder} />
          {favorites.length === 0 ? (
            <Text style={styles.msg}>Sem favoritos ainda</Text>
          ) : (
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => (
                <NewsCard
                    source={item.source}
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
      )
    }

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    msg: {
      textAlign: 'center',
      marginTop: 20,
      fontSize: 16,
    },
    titleContainer: {
        marginTop: 30,
        alignItems: 'center',
      },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
      },
    titleBorder: {
        height: 4,
        backgroundColor: '#007AFF', 
        width: '100%',
        marginTop: 4,
        marginBottom: 0
      },
    searchBorder: {
        height: 4,
        backgroundColor: '#53b94f', 
        width: '100%',
        marginTop: 1,
      },
  });
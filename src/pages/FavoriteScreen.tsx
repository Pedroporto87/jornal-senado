import React, { useState, useEffect} from "react";
import { RootState } from '../app/store';
import { View, FlatList, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { loadFavorites } from "../helpers/storage";
import { NewsCard } from "../components/NewsCard";
import { useSelector, useDispatch } from 'react-redux'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
const Estrela = require('../../assets/images/estrela-triste.png');

export default function FavoriteScreen({ navigation }) {
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
        <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainScreen')}>
                <MaterialCommunityIcons name="home-outline" size={28} color="blue" />
            </TouchableOpacity>
            <View>
                <Text style={styles.title}>Jornal do Senado</Text>
            </View>
        </View>
        <View style={styles.titleBorder} />
        <View style={styles.searchBorder} />
          {favorites.length === 0 ? (
                <View style={{ 
                    flex: 1, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                    marginTop: 20 
                }}>
                <Image source={Estrela} style={styles.image} />
                <Text style={styles.msg}>Sem favoritos ainda</Text>
            </View>
          ) : (
            <FlatList
                data={favorites}
                keyExtractor={(item) => item.url}
                renderItem={({ item }) => (
                    <NewsCard
                        source={item.source}
                        imageUrl={item.imageUrl}
                        title={item.title}
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        position: 'relative',
      },
      button: {
        position: 'absolute',
        left: 10,
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
      image: {
        width: 200,
        height: 200, 
        borderRadius: 8,
        marginBottom: 8,
      },
  });
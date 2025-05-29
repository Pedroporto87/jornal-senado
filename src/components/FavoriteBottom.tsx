import React from 'react'
import { StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../features/favoriteActions';
import { saveFavorites } from '../helpers/storage';

interface FavoriteButtonProps {
    source: string;
    title: string;
    imageUrl?: string;
    publishedAt: string;
    content: string;
    articleUrl: string;
  }

  export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ articleUrl, source, title, imageUrl, publishedAt, content }) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state: { favorites: { articles: any[] } }) => state.favorites.articles);
    const favorited = favorites.some(a => a.url === articleUrl)
    const scaleValue = new Animated.Value(1);

    const toggleFavorite = async () => {
        Animated.sequence([
            Animated.timing(scaleValue, {
                toValue: 1.2,
                duration: 150,
                useNativeDriver: true
            }),
            Animated.timing(scaleValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            })
        ]).start()

        if (favorited) {
          dispatch(removeFavorite(articleUrl))
        } else {
            dispatch(addFavorite({ 
                source, 
                title, 
                imageUrl, 
                publishedAt, 
                url: articleUrl,
                content
              }));
        }
        // após atualizar o Redux, salva no storage
        const updated = favorited
        ? favorites.filter(a => a.url !== articleUrl)
        : [...favorites, { source, title, imageUrl, publishedAt, url: articleUrl, content }];
        await saveFavorites(updated)
        // removerItensEspecificos();
        console.log('Favoritos atualizados:', updated);
      }
    return (
       <TouchableOpacity onPress={toggleFavorite} style={styles.button}>
            <Icon name="star" size={24} color={favorited ? '#ffd700' : '#ccc'}/>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
      padding: 10,
    },
  });


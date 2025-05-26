import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign'
import { useDispatch, useSelector } from 'react-redux'
import { addFavorite, removeFavorite } from '../features/favoriteActions';
import { saveFavorites } from '../helpers/storage';

interface FavoriteButtonProps {
    articleUrl: string;
  }

  export const FavoriteButton: React.FC<FavoriteButtonProps> = ({ articleUrl }) => {
    const dispatch = useDispatch()
    const favorites = useSelector((state: { favorites: { articles: any[] } }) => state.favorites.articles);
    const favorited = favorites.some(a => a.url === articleUrl)


    const toggleFavorite = async () => {
        if (favorited) {
          dispatch(removeFavorite(articleUrl))
        } else {
            dispatch(addFavorite({ url: articleUrl }))
        }
        // após atualizar o Redux, salva no storage
        const updated = favorited
          ? favorites.filter(a => a.url !== articleUrl)
          : [...favorites, articleUrl]
        await saveFavorites(updated)
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


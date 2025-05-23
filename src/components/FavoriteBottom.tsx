import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign'

export const FavoriteButton = () => {
    const [favorited, setFavorited] = useState(false)

    const toggleFavorite = () => {
        setFavorited(!favorited);
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


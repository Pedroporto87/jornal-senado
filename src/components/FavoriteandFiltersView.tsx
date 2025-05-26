import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';

interface FavoritesFilterBarProps {
    favoritesCount: number;
    onFavoritesPress: () => void;
    hasFilters: boolean;
  }

  export const FavoritesFilterBar: React.FC<FavoritesFilterBarProps> = ({
    favoritesCount,
    onFavoritesPress,
    hasFilters,
  }) => {
    if (!hasFilters && favoritesCount === 0) {
      return null;  // não mostrar se não tiver favoritos nem filtros
    }
  
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.starContainer} onPress={onFavoritesPress}>
          <Icon name="star" size={24} color="#ffd700" />
          {favoritesCount > 0 && (
            <View style={styles.counter}>
              <Text style={styles.counterText}>{favoritesCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#fff',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      padding: 10,
    },
    starContainer: {
      position: 'relative',
    },
    counter: {
      position: 'absolute',
      right: -8,
      top: -8,
      backgroundColor: 'red',
      borderRadius: 10,
      width: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    counterText: {
      color: '#fff',
      fontSize: 12,
    },
  });
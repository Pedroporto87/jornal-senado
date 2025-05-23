import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { FavoriteButton } from './FavoriteBottom';
import { getTimeAgo } from '../helpers/getTimeAgo'

interface NewsProps {
  source: string;
  title: string;
  imageUrl?: string;
  publishedAt: string;
  url: string;
}

export const NewsCard: React.FC<NewsProps> = ({ source, title, imageUrl, publishedAt, url }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.source}>{source}</Text>
      
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.image} />
      )}

      <Text style={styles.title}>{title}</Text>
      <View style={styles.footerCard}>
      <Text style={styles.date}>{getTimeAgo(publishedAt)}</Text>
        <TouchableOpacity onPress={() => Linking.openURL(url)} style={styles.centerLink}>
            <Text style={styles.link}>Ver mais</Text>
        </TouchableOpacity>
        <FavoriteButton />   
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  source: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
  image: {
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  footerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    },
  date: {
    fontSize: 12,
    color: '#999',
  
    paddingHorizontal: 5,
  },
  centerLink: {
    
    alignItems: 'center',
  },
  link: {
    fontSize: 14,
    color: '#1e90ff',
  },
});


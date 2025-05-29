import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { getTimeAgo } from '../helpers/getTimeAgo';
import { DetailModal } from './DetailsModal';
import { FavoriteButton } from './FavoriteBottom';

interface NewsProps {
  source: string;
  title: string;
  imageUrl?: string;
  publishedAt: string;
  url: string;
  content: string;
}

export const NewsCard: React.FC<NewsProps> = ({ source, title, imageUrl, publishedAt, url, content }) => {
   const [modal, setModal] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setModal(true)}>
        <View style={styles.card}>
          <Text style={styles.source}>{source}</Text>
          {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
          <Text style={styles.title}>{title}</Text>
          <View style={styles.footerCard}>
            <Text style={styles.date}>{getTimeAgo(publishedAt)}</Text>
            <FavoriteButton 
                source={source}
                title={title}
                articleUrl={url}
                publishedAt={publishedAt}
                imageUrl={imageUrl}
                content={content} 
            />
          </View>
        </View>
      </TouchableOpacity>

      <DetailModal
        visible={modal}
        onClose={() => setModal(false)}
        title={title}
        imageUrl={imageUrl}
        content={content}
        url={url}
      />
    </>
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


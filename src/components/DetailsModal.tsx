import React from "react";
import { View, Text, Image, Button, Modal, StyleSheet, TouchableOpacity, Linking } from 'react-native'
import { FavoriteButton } from "./FavoriteBottom";

interface DetailsModalProps {
    visible: boolean,
    onClose: () => void,
    title: string,
    imageUrl?: string,
    content: string,
    url: string,
}

export const DetailModal: React.FC<DetailsModalProps> = ({visible, onClose, title, imageUrl, content, url  }) => {
    return (
        <Modal
            visible = {visible}
            animationType = "slide"
            transparent = {true}
        >
            <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                    {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
                    <FavoriteButton articleUrl={url}/> 
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.content}>{content}</Text>
                    <Button title="Ver notícia completa" onPress={() => Linking.openURL(url)} ></Button>
                    <TouchableOpacity onPress={onClose} style={styles.closeButton}> 
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      width: '80%',
    },
    image: {
      height: 200,
      borderRadius: 8,
      marginBottom: 8,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    content: {
      fontSize: 16,
      color: '#555',
      marginBottom: 16,
    },
    closeButton: {
      marginTop: 16,
      alignSelf: 'center',
    },
    closeButtonText: {
      color: '#1e90ff',
      fontSize: 16,
    },
  });

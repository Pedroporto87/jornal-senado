import React, { FC } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface NavBarProps {
    searchTerm: string;
    onChangeSearch: (text: string) => void;
}

export const Navbar: FC<NavBarProps> = ({ searchTerm, onChangeSearch  }) => {
    return (
        
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Jornal do Senado</Text>
            <View style={styles.titleBorder} />
            </View>
            <View style={styles.searchBorder} />
            <View style={styles.searchContainer}>
                <Icon name="magnify" size={20} color="#999" style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar notícias..."
                    value={searchTerm}
                    onChangeText={onChangeSearch}
                />
            </View>
      </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginTop: 30,
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
    },
    titleContainer: {
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
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        borderWidth: 2,
        borderRadius: 8,
        alignSelf: 'center',
        maxWidth: 769, 
        width: '100%',
    },
    searchIcon: {
        marginLeft: 8,
      },
    searchInput: {
        height: 40,
        paddingHorizontal: 10,
        maxWidth: 769,
        alignSelf: 'center',
        width: '100%',
    },
  });


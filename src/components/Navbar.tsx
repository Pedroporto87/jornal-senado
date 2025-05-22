import React, { FC } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

interface NavBarProps {
    searchTerm: string;
    onChangeSearch: (text: string) => void;
    onFilterPress: () => void;
}

export const Navbar: FC<NavBarProps> = ({ searchTerm, onChangeSearch, onFilterPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Jornal do Senado</Text>
            <View style={styles.titleBorder} />
        </View>
            <View style={styles.searchBorder} />
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Buscar notícias..."
                    value={searchTerm}
                    onChangeText={onChangeSearch}
                />
            <TouchableOpacity style={styles.filterButton} onPress={onFilterPress}>
                <Text style={styles.filterText}>Filtros</Text>
            </TouchableOpacity>
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
    },
    searchInput: {
        flex: 1,
        height: 40,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
    filterButton: {
        marginLeft: 10,
        paddingHorizontal: 12,
        paddingVertical: 8,
        backgroundColor: '#007AFF',
        borderRadius: 8,
      },
      filterText: {
        color: '#fff',
        fontWeight: 'bold',
      },
  });


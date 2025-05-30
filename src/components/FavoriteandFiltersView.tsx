import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/AntDesign';
import { Picker } from '@react-native-picker/picker';
import { useDispatch, useSelector } from 'react-redux';
import { setSubject, setLanguage } from '../features/filterActions';

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
    const dispatch = useDispatch();
    const { subject, language } = useSelector((state: any) => state.filter);

    const handleSubjectChange = (itemValue: string) => {
      dispatch(setSubject(itemValue));
    };
  
    const handleLanguageChange = (itemValue: string) => {
      dispatch(setLanguage(itemValue));
    };
  
    return (
      <View style={styles.filterContainer}>
        <View style={styles.pickerContainer}>
        <Text style={styles.label}>Assunto:</Text>
        <Picker
          selectedValue={subject}
          style={styles.picker}
          onValueChange={handleSubjectChange}
        >
          <Picker.Item label="Todos" value="general" />
          <Picker.Item label="Tecnologia" value="technology" />
          <Picker.Item label="Negócios" value="business" />
          <Picker.Item label="Esportes" value="sports" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Idioma:</Text>
        <Picker
          selectedValue={language}
          style={styles.picker}
          onValueChange={handleLanguageChange}
        >
          <Picker.Item label="Inglês" value="en" />
          <Picker.Item label="Espanhol" value="es" />
          <Picker.Item label="Francês" value="fr" />
        </Picker>
      </View>
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
    filterContainer: {
      padding: 10,
      backgroundColor: '#fff',
      flexDirection: 'row', 
      alignItems: 'center', 
      justifyContent: 'space-between', 
      borderBottomColor: '#8e8e8e',
      borderBottomWidth: 1,
      marginBottom: 10,
      borderRadius: 8,
    },
    pickerContainer: {
      flex: 1,
      marginVertical: 5,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
    },
    picker: {
      height: 60,
      width: '100%',
    },
    button: {
      marginTop: 10,
      backgroundColor: '#007bff',
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      color: '#fff',
      textAlign: 'center',
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
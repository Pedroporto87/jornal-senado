import React, { useState } from 'react';
import { Text, View, StyleSheet } from "react-native";
import  { Navbar }  from "../components/Navbar";

export default function Index() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleFilterPress = () => {
    // implemente o que acontecer ao clicar no botão de filtros
    alert('Filtros clicados!');
  };

  return (
    <View style={styles.container}>
    <Navbar
        searchTerm={searchTerm}
        onChangeSearch={setSearchTerm}
        onFilterPress={handleFilterPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
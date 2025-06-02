import React, { useEffect, useState, useRef } from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types'; 

const message = [
    "Jornal do Senado",
    "Saiba tudo no Jornal Senado",
    "Noticias relevantes em breve...",
]

const SplashScreen: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const opacity = useRef(new Animated.Value(1)).current; 
  const durationPerMessage = 1500; // ms
  const totalMessages = message.length;

  useEffect(() => {
      const interval = setInterval(() => {
          // anima fade out
          Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
          }).start(() => {
              // troca a mensagem
              setCurrentIndex(prev => (prev + 1) % totalMessages);
              // anima fade in
              Animated.timing(opacity, {
                  toValue: 1,
                  duration: 300,
                  useNativeDriver: true,
              }).start();
          });
      }, durationPerMessage);
      // Limpa no unmount
      return () => clearInterval(interval);
  }, []);

  // Controlar o fim do ciclo
  const [cycleFinished, setCycleFinished] = useState(false);

  useEffect(() => {
      const timer = setTimeout(() => {
          setCycleFinished(true);
      }, durationPerMessage * totalMessages); // total do ciclo
      return () => clearTimeout(timer);
  }, []);

  // Navega após o ciclo completo
  useEffect(() => {
      if (cycleFinished) {
          // Pode adicionar uma animação final se desejar
          navigation.navigate('MainScreen');
      }
  }, [cycleFinished, navigation]);

  return (
      <View style={styles.container}>
          <Image
              source={require('../../assets/images/Senado Federal.png')}
              style={styles.logo}
              resizeMode='contain'
          />
          <Animated.Text style={[styles.message, { opacity }]}>
              {message[currentIndex]}
          </Animated.Text>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
  },
  logo: {
      width: 200,
      height: 200,
      marginBottom: 20,
  },
  message: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
  },
});

export default SplashScreen;
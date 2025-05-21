import React, { useEffect, useState, useRef } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { View, Text, Image, StyleSheet, Animated } from 'react-native';

const message = [
    "Jornal do Senado",
    "Saiba tudo no Jornal Senado",
    "Aguarde um minutinho...",
]

const SplashScreen: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const opacity = useRef(new Animated.Value(1)).current;


    // useEffect(() => {
    //      const loadData = async () => {
    //         await new Promise(resolve => setTimeout(resolve, 4000)) 
    //         setLoading(false)
    //     };
    //     loadData()
    // }, []);
   
    useEffect(() => {
        const interval = setInterval(() => {
          Animated.timing(opacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }).start(() => {
            setCurrentIndex(prev => (prev + 1) % message.length);

            Animated.timing(opacity, {
              toValue: 1,
              duration: 400,
              useNativeDriver: true,
            }).start();
          });
        }, 1500);
    
        return () => clearInterval(interval);
      }, []);


    const navigation = useNavigation<NavigationProp<any>>();
    useEffect(() => {
        const timer = setTimeout(() => {
          navigation.navigate('MainScreen');
        }, 12000); 
    
        return () => clearTimeout(timer);
      }, [navigation]);

    if(loading) {
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
            return null;
        }
    

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        height: '100%',
    },
    logo:{
        width: 200,
        height: 200,
    },
    message: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        textAlign: 'center',
    },
});

export default SplashScreen;
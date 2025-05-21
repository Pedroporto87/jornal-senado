import React, { useEffect, useState } from 'react';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';



const SplashScreen: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         const loadData = async () => {
            await new Promise(resolve => setTimeout(resolve, 4000)) 
            setLoading(false)
        };
        loadData()
    }, []);
    const navigation = useNavigation<NavigationProp<any>>();

    useEffect(() => {
      if(!loading) {
        navigation.navigate('MainScreen');
      }
    }, [loading]);

    if(loading) {
        return (
                <View style={styles.container}>
                    <Image
                        source={require('../../assets/images/Senado Federal.png')}
                        style={styles.logo}
                        resizeMode='contain'
                    />
                    <Text style={styles.message}>Jornal do Senado</Text>
                    <Text style={styles.message}>Saiba tudo no Jornal Senado</Text>
                    <Text style={styles.message}>Aguarde um minutinho...</Text>
                    <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20}}/>
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
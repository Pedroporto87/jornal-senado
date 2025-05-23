import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from './src/app/store'
import MainScreen from "./src/pages/MainScreen";
import SplashScreen from "./src/pages/SplashScreen";

const Stack = createNativeStackNavigator()

export default function App() {
    return(
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="SplashScreen" screenOptions = {{headerShown: false}}>
                    <Stack.Screen name="SplashScreen" component={SplashScreen} />
                    <Stack.Screen name="MainScreen" component={MainScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    )
}
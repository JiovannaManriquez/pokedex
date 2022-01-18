/**
 * Pokedex
 * By Jiovanna Manriquez
 * https://jiovanna.com
 *
 */

import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import PokemonScreen from './src/screens/DetailScreen';
import {RootStackParamList} from './src/screens/RootStackParamList';
import SplashScreen from 'react-native-splash-screen';
import {Provider} from 'react-redux';
import store from './src/store';

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    useEffect(() => {
        SplashScreen.hide();
    }, []);

    return (
        <Provider store={store}>
            <NavigationContainer>
                <RootStack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                        headerShown: false,
                    }}>
                    <RootStack.Screen name="Home" component={HomeScreen} />
                    <RootStack.Screen
                        name="Pokemon"
                        component={PokemonScreen}
                        getId={({params}) => params.pokemon.name}
                    />
                </RootStack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

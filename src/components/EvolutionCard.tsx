import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import {PokemonEvolution} from '../models/Pokemon';
import {ColorTheme, useColor} from '../utils/colors';
import EvolutionDetailList from './EvolutionDetailList';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../screens/RootStackParamList';

interface EvolutionCardProps {
    evolution: PokemonEvolution;
}

export const SPACING = 10;

export default function EvolutionCard({evolution}: EvolutionCardProps) {
    const navigation =
        useNavigation<
            NativeStackNavigationProp<RootStackParamList, 'Pokemon'>
        >();
    const color = useColor(ColorTheme.gray700, ColorTheme.gray200);
    const onPressPokemon = () => {
        if (evolution.pokemon !== null) {
            navigation.push('Pokemon', {
                pokemon: evolution.pokemon,
            });
        }
    };

    return (
        <TouchableOpacity style={styles.container} onPress={onPressPokemon}>
            <View style={styles.row}>
                <Text style={[styles.title, {color: color}]}>
                    {evolution.pokemon?.name}
                </Text>
                <FastImage
                    style={styles.image}
                    source={{
                        uri: evolution.pokemon?.sprites.other.home
                            .front_default,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.stretch}
                />
            </View>
            {evolution.evolutionDetails.map((details, index) => (
                <EvolutionDetailList
                    key={evolution.pokemon?.id + '-details-' + index}
                    data={details}
                    trigger={index}
                />
            ))}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: SPACING * 2,
        borderColor: ColorTheme.blackWithOpacity,
        borderRadius: SPACING,
        borderWidth: 1,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        height: 100,
        width: 100,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
        marginRight: SPACING,
    },
    subtitle: {
        fontSize: 12,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
        marginRight: SPACING,
    },
});

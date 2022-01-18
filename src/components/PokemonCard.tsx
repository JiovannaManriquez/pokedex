import React, {useMemo} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, Animated} from 'react-native';
import {getBackgroundColor, ScreenSize} from '../utils/colors';
import {Pokemon} from '../models/Pokemon';
import ChipType from './ChipType';
import FastImage from 'react-native-fast-image';

interface PokemonCardProps {
    index: number;
    navigation: any;
    scrollY: Animated.Value;
    pokemon: Pokemon;
    textColor: string;
}

export const THUMBNAIL_SIZE = 100;
export const SPACING = 10;
export const ITEM_SIZE = THUMBNAIL_SIZE + SPACING * 3;

export default function PokemonCard({
    index,
    navigation,
    pokemon,
    scrollY,
    textColor,
}: PokemonCardProps) {
    const {scale, opacity, marginLeft, marginRight} = useMemo(() => {
        const inputRange = [
            -1,
            0,
            ITEM_SIZE * Math.floor(index / 2),
            ITEM_SIZE * (Math.floor(index / 2) + 2),
        ];

        const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * Math.floor(index / 2),
            ITEM_SIZE * (Math.floor(index / 2) + 0.5),
        ];

        const scaleMemo = scrollY.interpolate({
            inputRange,
            outputRange: [1, 1, 1, 0],
        });

        const opacityMemo = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
        });

        const marginLeftMemo = index % 2 === 0 ? 0 : SPACING;
        const marginRightMemo = index % 2 === 0 ? SPACING : 0;

        return {
            scale: scaleMemo,
            opacity: opacityMemo,
            marginLeft: marginLeftMemo,
            marginRight: marginRightMemo,
        };
    }, [scrollY, index]);

    const onPressPokemon = () => {
        navigation.push('Pokemon', {
            pokemon: pokemon,
        });
    };

    const background = getBackgroundColor(pokemon.types[0].type.name);

    return (
        <Animated.View
            style={[
                styles.card,
                {
                    backgroundColor: background,
                    transform: [{scale}],
                    opacity,
                    marginLeft: marginLeft,
                    marginRight: marginRight,
                },
            ]}>
            <TouchableOpacity onPress={onPressPokemon} style={styles.container}>
                <FastImage
                    style={styles.thumbnail}
                    source={{
                        uri: pokemon.sprites.other.home.front_default,
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <Text style={[styles.number, {color: textColor}]}>
                    #{pokemon.id}
                </Text>
                <View style={styles.data}>
                    <Text style={[styles.name, {color: textColor}]}>
                        {pokemon.name.replace(/-/g, ' ')}
                    </Text>
                    {pokemon.types.map(item => (
                        <ChipType key={item.type.name} name={item.type.name} />
                    ))}
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: SPACING,
        justifyContent: 'flex-end',
        overflow: 'hidden',
    },
    card: {
        width: (ScreenSize.Width - 6 * SPACING) / 2,
        borderRadius: 16,
        marginBottom: SPACING,
    },
    thumbnail: {
        width: THUMBNAIL_SIZE,
        height: THUMBNAIL_SIZE,
        resizeMode: 'center',
        alignSelf: 'flex-end',
    },
    name: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        textTransform: 'capitalize',
    },
    number: {
        fontFamily: 'Poppins-Light',
        fontSize: 16,
        position: 'absolute',
        right: 10,
        top: 10,
    },
    data: {
        position: 'absolute',
        left: 10,
        top: 10,
        alignItems: 'flex-start',
    },
});

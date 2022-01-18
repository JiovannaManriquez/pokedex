import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Ability} from '../models/Pokemon';
import {ColorTheme, useColor} from '../utils/colors';
import {LANGUAGE} from '../utils/strings';

interface AbilityCardProps {
    ability: Ability;
}

export const SPACING = 10;

export default function AbilityCard({ability}: AbilityCardProps) {
    const color = useColor(ColorTheme.gray700, ColorTheme.gray200);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: color}]}>
                {
                    ability.names.find(item => item.language.name === LANGUAGE)
                        ?.name
                }
            </Text>
            <Text style={[styles.body, {color: color}]}>
                {ability.flavor_text_entries
                    .find(item => item.language.name === LANGUAGE)
                    ?.flavor_text.replace(/\n|\r|\f/g, ' ')}
            </Text>
            <Text style={[styles.effect]}>
                Effects:{' '}
                <Text style={styles.body}>
                    {ability.effect_entries
                        .find(item => item.language.name === LANGUAGE)
                        ?.effect.replace(/\n|\r|\f/g, ' ')}
                </Text>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: ColorTheme.blackWithOpacity,
        borderRadius: SPACING,
        padding: SPACING * 2,
        marginBottom: SPACING * 2,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
    },
    effect: {
        fontSize: 14,
        fontFamily: 'Poppins-Bold',
        marginTop: SPACING,
        color: ColorTheme.gray500,
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
    },
});

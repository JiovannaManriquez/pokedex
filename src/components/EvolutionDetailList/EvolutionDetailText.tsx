import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {NamedAPIResource} from '../../models/Pokemon';
import {ColorTheme, useColor} from '../../utils/colors';

interface EvolutionDetailTextProps {
    label: string;
    value: string | number | boolean | NamedAPIResource;
    border: boolean;
    bold: boolean;
}

const SPACING = 10;

export default function EvolutionDetailText({
    label,
    value,
    border,
    bold,
}: EvolutionDetailTextProps) {
    const textColor = useColor(ColorTheme.gray700, ColorTheme.gray200);
    const styles = StyleSheet.create({
        body: {
            fontFamily: bold ? 'Poppins-Bold' : 'Poppins-Regular',
            fontSize: 14,
            lineHeight: 21,
            color: textColor,
            textTransform: 'capitalize',
        },
        row: {
            borderBottomWidth: border ? 1 : 0,
            borderColor: ColorTheme.blackWithOpacity,
            paddingVertical: SPACING,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: SPACING * 2,
        },
    });

    if (value === null || value === '' || value === undefined) {
        return null;
    }

    if (typeof value === 'boolean') {
        return (
            <View style={styles.row}>
                <Text style={styles.body}>{label.replace(/_/g, ' ')}</Text>
                <Text style={styles.body}>{value ? 'Yes' : 'No'}</Text>
            </View>
        );
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return (
            <View style={styles.row}>
                <Text style={styles.body}>{label.replace(/_/g, ' ')}</Text>
                <Text style={styles.body}>
                    {value.toString().replace(/-/g, ' ')}
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.row}>
            <Text style={styles.body}>{label.replace(/_/g, ' ')}</Text>
            <Text style={styles.body}>
                {value.name.toString().replace(/-/g, ' ')}
            </Text>
        </View>
    );
}

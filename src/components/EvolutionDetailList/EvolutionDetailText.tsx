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
    const borderBottomWidth = {borderBottomWidth: border ? 1 : 0};
    const fontFamily = bold ? 'Poppins-Bold' : 'Poppins-Regular';
    const textStyle = [styles.body, {color: textColor, fontFamily: fontFamily}];

    if (value === null || value === '' || value === undefined) {
        return null;
    }

    if (typeof value === 'boolean') {
        return (
            <View style={[styles.row, borderBottomWidth]}>
                <Text style={textStyle}>{label.replace(/_/g, ' ')}</Text>
                <Text style={textStyle}>{value ? 'Yes' : 'No'}</Text>
            </View>
        );
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return (
            <View style={[styles.row, borderBottomWidth]}>
                <Text style={textStyle}>{label.replace(/_/g, ' ')}</Text>
                <Text style={textStyle}>
                    {value.toString().replace(/-/g, ' ')}
                </Text>
            </View>
        );
    }

    return (
        <View style={[styles.row, borderBottomWidth]}>
            <Text style={textStyle}>{label.replace(/_/g, ' ')}</Text>
            <Text style={textStyle}>
                {value.name.toString().replace(/-/g, ' ')}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        fontSize: 14,
        lineHeight: 21,
        textTransform: 'capitalize',
    },
    row: {
        borderColor: ColorTheme.blackWithOpacity,
        paddingVertical: SPACING,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: SPACING * 2,
    },
});

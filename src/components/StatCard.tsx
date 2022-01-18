import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ColorTheme, useColor} from '../utils/colors';

interface StatCardProps {
    name?: string;
    base?: string;
}

export const SPACING = 10;

export default function StatCard({name, base}: StatCardProps) {
    const color = useColor(ColorTheme.gray700, ColorTheme.gray200);

    return (
        <View style={styles.card}>
            <Text style={[styles.body, {color: color}]}>{name}</Text>
            <Text style={[styles.title, {color: color}]}>{base}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        width: '50%',
        justifyContent: 'space-between',
        marginBottom: SPACING,
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        textAlign: 'center',
    },
    title: {
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
        textAlign: 'center',
    },
});

import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {ColorTheme, useColor} from '../utils/colors';

const SPACING = 10;

export default function NotFound() {
    const color = useColor(ColorTheme.gray500, ColorTheme.gray200);

    return (
        <View style={styles.container}>
            <Icon name="exclamation" size={80} color={color} />
            <Text style={[styles.title, styles.marginTop, {color: color}]}>
                Sorry, content could not be loaded
            </Text>
            <Text style={[styles.body, {color: color}]}>
                Please check your internet connection or try again later.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    marginTop: {
        marginTop: SPACING,
    },
    container: {
        flex: 1,
        borderWidth: 1,
        borderColor: ColorTheme.blackWithOpacity,
        borderRadius: SPACING,
        padding: SPACING * 2,
        margin: SPACING * 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
        textAlign: 'center',
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        textAlign: 'center',
    },
});

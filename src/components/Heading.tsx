import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/EvilIcons';
import {ColorTheme, useColor} from '../utils/colors';

interface HeadingProps {
    title: string;
    icon: string;
    counter?: number;
    background: string;
}

export const SPACING = 10;

export default function Heading({
    title,
    icon,
    counter,
    background,
}: HeadingProps) {
    const colorDark = useColor(ColorTheme.gray700, ColorTheme.gray200);
    const colorLight = useColor(ColorTheme.white, ColorTheme.gray200);

    return (
        <View style={styles.container}>
            <View style={[styles.circle, {backgroundColor: background}]}>
                <Icon name={icon} size={24} color={colorLight} />
            </View>
            <Text
                style={[
                    styles.title,
                    {
                        color: colorDark,
                    },
                ]}>
                {title} {counter ? `(${counter})` : ''}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING * 2,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
    },
    circle: {
        height: 30,
        width: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
});

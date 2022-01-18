import React, {ReactElement} from 'react';
import {View, StyleSheet, Text} from 'react-native';

interface HeaderProps {
    title: string;
    color: string;
    left?: ReactElement;
    right?: ReactElement;
    center?: string;
}

const SPACING = 10;

export default function Header({title, color, left, right}: HeaderProps) {
    return (
        <View style={styles.header}>
            {left}
            <Text style={[styles.logo, {color: color}]}>
                {title.replace(/-/g, ' ')}
            </Text>
            {right}
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: SPACING * 2,
    },
    logo: {
        fontFamily: 'Poppins-Bold',
        fontSize: 24,
        textTransform: 'capitalize',
    },
});

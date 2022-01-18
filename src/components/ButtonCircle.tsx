import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {ColorTheme, useColor} from '../utils/colors';
import Icon from 'react-native-vector-icons/EvilIcons';

interface ButtonCircleProps {
    onPress: () => void;
}
export const SPACING = 10;

export default function ButtonCircle({onPress}: ButtonCircleProps) {
    const backgroundColorWithOpacity = useColor(
        ColorTheme.whiteWithOpacity,
        ColorTheme.blackWithOpacity,
    );

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.buttonCircle,
                {backgroundColor: backgroundColorWithOpacity},
            ]}>
            <Icon name="chevron-left" size={40} color="white" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    buttonCircle: {
        height: 40,
        width: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

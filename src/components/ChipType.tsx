import React from 'react';
import {View, Text, StyleProp, ViewStyle, TextStyle} from 'react-native';
import {ColorTheme, useColor} from '../utils/colors';

interface ChipTypeProps {
    name: string;
}

export default function ChipType({name}: ChipTypeProps) {
    const backgroundColor = useColor(
        ColorTheme.whiteWithOpacity,
        ColorTheme.blackWithOpacity,
    );
    const textColor = useColor(ColorTheme.white, ColorTheme.gray200);

    const chipStyle: StyleProp<ViewStyle> = {
        backgroundColor: backgroundColor,
        height: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 4,
        marginRight: 4,
        paddingHorizontal: 10,
    };

    const nameStyle: StyleProp<TextStyle> = {
        color: textColor,
        fontSize: 12,
        textTransform: 'capitalize',
        fontFamily: 'Poppins-Regular',
    };

    return (
        <View style={chipStyle}>
            <Text style={nameStyle}>{name}</Text>
        </View>
    );
}

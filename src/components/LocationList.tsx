import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {LocationAreas} from '../models/Pokemon';
import {ColorTheme, useColor} from '../utils/colors';
import Heading from './Heading';

interface LocationListProps {
    color: string;
    locations: LocationAreas[];
}

export const SPACING = 10;

export default function LocationList({color, locations}: LocationListProps) {
    const colorDark = useColor(ColorTheme.gray700, ColorTheme.gray200);

    if (locations.length === 0) {
        return null;
    }

    return (
        <View>
            <Heading
                title="Location Areas"
                icon="location"
                background={color}
            />
            {locations.map((location, index) => (
                <View key={location.location_area.name}>
                    <Text style={[styles.body, {color: colorDark}]}>
                        {index + 1}.{'  '}
                        {location.location_area.name.replace(/-/g, ' ')}
                    </Text>
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        borderColor: ColorTheme.blackWithOpacity,
        borderWidth: 1,
        padding: SPACING * 2,
        borderRadius: SPACING,
        marginTop: SPACING * 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    locationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SPACING * 2,
        marginTop: SPACING * 2,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        textTransform: 'capitalize',
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: SPACING,
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

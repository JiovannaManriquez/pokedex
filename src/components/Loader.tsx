import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {ColorTheme, useColor} from '../utils/colors';

interface LoaderProps {
    isLoading: boolean;
}

export default function Loader({isLoading}: LoaderProps) {
    const loaderColor = useColor(ColorTheme.gray700, ColorTheme.gray200);
    const backgroundColorWithOpacity = useColor(
        ColorTheme.whiteWithOpacity,
        ColorTheme.blackWithOpacity,
    );

    const styles = StyleSheet.create({
        loader: {
            zIndex: 3,
            flexDirection: 'row',
            position: 'absolute',
            alignSelf: 'center',
            bottom: 20,
            backgroundColor: backgroundColorWithOpacity,
            borderRadius: 30,
            padding: 10,
        },
    });

    if (!isLoading) {
        return null;
    }

    return (
        <View style={styles.loader}>
            <ActivityIndicator size="large" color={loaderColor} />
        </View>
    );
}

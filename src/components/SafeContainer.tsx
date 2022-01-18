import React, {ReactElement} from 'react';
import {StatusBar, StatusBarStyle} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useColor} from '../utils/colors';

interface SafeContainerProps {
    background: string;
    children: ReactElement | ReactElement[];
}

export default function SafeContainer({
    background,
    children,
}: SafeContainerProps) {
    const statusBarColor = useColor(
        'dark-content',
        'light-content',
    ) as StatusBarStyle;

    const styles = {
        flex: 1,
        backgroundColor: background,
    };

    return (
        <SafeAreaView style={styles}>
            <StatusBar
                animated={true}
                backgroundColor={background}
                barStyle={statusBarColor}
            />
            {children}
        </SafeAreaView>
    );
}

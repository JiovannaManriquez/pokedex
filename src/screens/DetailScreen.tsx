import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList';
import {
    ColorTheme,
    getBackgroundColor,
    ScreenSize,
    useColor,
} from '../utils/colors';
import ChipType from '../components/ChipType';
import FastImage from 'react-native-fast-image';
import SafeContainer from '../components/SafeContainer';
import {StatusBarHeight} from '../utils/statusBar';
import Tabs from '../components/Tabs';
import ButtonCircle from '../components/ButtonCircle';
import Header from '../components/Header';

type PokemonScreenProps = NativeStackScreenProps<RootStackParamList, 'Pokemon'>;

const IMAGE_SIZE = 240;
const SPACING = 10;

export default function PokemonScreen({navigation, route}: PokemonScreenProps) {
    const {pokemon} = route.params;
    const background = getBackgroundColor(pokemon.types[0].type.name);
    const color = useColor(ColorTheme.white, ColorTheme.gray200);
    const containerBackground = useColor(ColorTheme.white, ColorTheme.gray700);

    const onPressBack = () => navigation.goBack();

    const left = <ButtonCircle onPress={onPressBack} />;

    const right = (
        <Text
            style={[
                styles.body,
                {
                    color: color,
                },
            ]}>
            #{pokemon.id}
        </Text>
    );

    return (
        <SafeContainer background={background}>
            <Header
                title={pokemon.name}
                color={color}
                right={right}
                left={left}
            />
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.rowPokemonTypes}>
                    {pokemon.types.map(item => (
                        <ChipType key={item.type.name} name={item.type.name} />
                    ))}
                </View>
                <View
                    style={[
                        styles.container,
                        {backgroundColor: containerBackground},
                    ]}>
                    <FastImage
                        style={styles.image}
                        source={{
                            uri: pokemon.sprites.other.home.front_default,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.stretch}
                    />
                    <Tabs pokemon={pokemon} />
                </View>
            </ScrollView>
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING * 2,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingVertical: 50,
        minHeight: ScreenSize.Height - IMAGE_SIZE - StatusBarHeight,
    },
    image: {
        width: IMAGE_SIZE,
        height: IMAGE_SIZE,
        position: 'absolute',
        top: -IMAGE_SIZE * 0.8,
        alignSelf: 'center',
    },
    rowPokemonTypes: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 10,
        height: IMAGE_SIZE,
    },
    body: {
        fontFamily: 'Poppins-Light',
        fontSize: 24,
    },
});

import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
    ColorTheme,
    getBackgroundColor,
    ScreenSize,
    useColor,
} from '../../utils/colors';
import {Tab, TabView} from 'react-native-elements';
import {Pokemon} from '../../models/Pokemon';
import About from './About';
import Stats from './Stats';
import Evolve from './Evolve';
import Moves from './Moves';

interface TabsProps {
    pokemon: Pokemon;
}

export const SPACING = 10;

export default function Tabs({pokemon}: TabsProps) {
    const [index, setIndex] = React.useState(0);
    const backgroundColor = getBackgroundColor(pokemon.types[0].type.name);
    const tabBackgroundColor = useColor(ColorTheme.white, ColorTheme.gray700);
    const tabTitleColor = useColor(ColorTheme.gray700, ColorTheme.gray200);

    const tabStyle = StyleSheet.create({
        titleText: {
            fontSize: 12,
            fontFamily: 'Poppins-Bold',
            textTransform: 'capitalize',
            color: tabTitleColor,
            paddingHorizontal: 0,
        },
        titleContainer: {
            backgroundColor: tabBackgroundColor,
            borderBottomColor: ColorTheme.blackWithOpacity,
            borderBottomWidth: 1,
        },
        indicator: {
            backgroundColor: backgroundColor,
            height: 4,
            borderRadius: 2,
        },
        itemContainer: {
            paddingVertical: SPACING * 2,
            backgroundColor: tabBackgroundColor,
            width: ScreenSize.Width - SPACING * 4,
        },
    });

    const headers = ['About', 'Stats', 'Evolve', 'Moves'];

    return (
        <View>
            <Tab
                value={index}
                onChange={e => setIndex(e)}
                indicatorStyle={tabStyle.indicator}
                variant="default">
                {headers.map((header, i) => (
                    <Tab.Item
                        key={`header-${i}`}
                        title={header}
                        titleStyle={tabStyle.titleText}
                        containerStyle={tabStyle.titleContainer}
                        TouchableComponent={TouchableOpacity}
                    />
                ))}
            </Tab>
            <TabView value={index} onChange={setIndex} animationType="spring">
                <TabView.Item style={tabStyle.itemContainer}>
                    <About pokemon={pokemon} />
                </TabView.Item>
                <TabView.Item style={tabStyle.itemContainer}>
                    <Stats pokemon={pokemon} />
                </TabView.Item>
                <TabView.Item style={tabStyle.itemContainer}>
                    <Evolve pokemon={pokemon} />
                </TabView.Item>
                <TabView.Item style={tabStyle.itemContainer}>
                    <Moves pokemon={pokemon} />
                </TabView.Item>
            </TabView>
        </View>
    );
}

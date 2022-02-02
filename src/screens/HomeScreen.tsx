import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, ListRenderItem, Animated, View} from 'react-native';
import PokemonCard from '../components/PokemonCard';
import Loader from '../components/Loader';
import {Pokemon} from '../models/Pokemon';
import {fetchPokemons} from '../client/fetcher';
import {RootStackParamList} from './RootStackParamList';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import Header from '../components/Header';
import SafeContainer from '../components/SafeContainer';
import {ColorTheme, useColor} from '../utils/colors';
import {useAppDispatch, useAppSelector} from '../store';
import {getIndex, searchPokemons} from '../store/pokemonIndex';
import NotFound from '../components/NotFound';
import {SearchBar} from 'react-native-elements';

const SPACING = 10;
const PAGE_SIZE = 20;

type HomeScreenProps = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
    const scrollY = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation<HomeScreenProps>();
    const [data, setData] = useState<Pokemon[]>([]);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const dispatch = useAppDispatch();
    const pokedexIndex = useAppSelector(state => state.index.index);

    const backgroundColor = useColor(ColorTheme.white, ColorTheme.gray700);
    const textColor = useColor(ColorTheme.white, ColorTheme.gray200);
    const color = useColor(ColorTheme.gray700, ColorTheme.white);

    const loadPage = () => {
        if (pokedexIndex.length === 0) {
            return;
        }
        if (isLoading) {
            return;
        }
        setLoading(true);
        const page = pokedexIndex.slice(data.length, data.length + PAGE_SIZE);
        fetchPokemons(page)
            .then(response => {
                let tempData: Pokemon[] = data.concat(response);
                setData(tempData);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        dispatch(getIndex());
    }, []);

    useEffect(() => {
        loadPage();
    }, [pokedexIndex]);

    if (pokedexIndex === null) {
        return <NotFound />;
    }

    const renderItem: ListRenderItem<Pokemon> = ({item, index}) => {
        return (
            <PokemonCard
                index={index}
                pokemon={item}
                navigation={navigation}
                scrollY={scrollY}
                textColor={textColor}
            />
        );
    };

    const updateSearch = (text: string) => {
        setData([]);
        dispatch(searchPokemons({text}));
        setSearch(text);
    };

    return (
        <SafeContainer background={backgroundColor}>
            <Header title="Pokedex" color={color} />
            <View style={styles.bar}>
                <SearchBar
                    placeholder="Type Here..."
                    onChangeText={updateSearch}
                    value={search}
                    containerStyle={{backgroundColor: backgroundColor}}
                    platform={'ios'}
                    onCancel={() => updateSearch('')}
                />
            </View>
            <Loader isLoading={isLoading} />
            <Animated.FlatList
                data={data}
                keyExtractor={item => item.name}
                renderItem={renderItem}
                onEndReachedThreshold={0.8}
                onEndReached={loadPage}
                showsVerticalScrollIndicator={true}
                bounces={true}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: scrollY}}}],
                    {useNativeDriver: true},
                )}
                numColumns={2}
                contentContainerStyle={styles.container}
            />
        </SafeContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: SPACING * 2,
    },
    bar: {
        marginHorizontal: SPACING,
        marginBottom: SPACING,
    },
});

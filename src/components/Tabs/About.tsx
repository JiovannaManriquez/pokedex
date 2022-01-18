import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fetchLocationAreas, fetchSpecieDescription} from '../../client/fetcher';
import {ColorTheme, getBackgroundColor, useColor} from '../../utils/colors';
import {LocationAreas, Pokemon} from '../../models/Pokemon';
import Loader from '../Loader';
import {LANGUAGE} from '../../utils/strings';
import LocationList from '../LocationList';

interface AboutProps {
    pokemon: Pokemon;
}

export const SPACING = 10;

export default function About({pokemon}: AboutProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [specie, setSpecie] = useState<string>('');
    const [locations, setLocation] = useState<LocationAreas[]>([]);
    const colorDark = useColor(ColorTheme.gray700, ColorTheme.gray200);
    const colorType = getBackgroundColor(pokemon.types[0].type.name);

    const fetchData = () => {
        let fetchSpecie = fetchSpecieDescription(pokemon.species.url);
        let fetchLocations = fetchLocationAreas(
            pokemon.location_area_encounters,
        );
        Promise.all([fetchSpecie, fetchLocations])
            .then(values => {
                const text = values[0].flavor_text_entries.find(
                    item => item.language.name === LANGUAGE,
                );
                if (text !== undefined) {
                    setSpecie(text.flavor_text);
                }
                setLocation(values[1]);
            })
            .catch(e => console.log(e))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (isLoading) {
        return <Loader isLoading={isLoading} />;
    }

    return (
        <View>
            <Text style={[styles.body, {color: colorDark}]}>
                {specie.replace(/\n|\r|\f/g, ' ')}
            </Text>
            <View style={styles.row}>
                <Text style={[styles.body, {color: colorDark}]}>Height</Text>
                <Text style={[styles.body, {color: colorDark}]}>
                    {pokemon.height / 10} m
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={[styles.body, {color: colorDark}]}>Weight</Text>
                <Text style={[styles.body, {color: colorDark}]}>
                    {pokemon.weight / 10} kg
                </Text>
            </View>
            <LocationList color={colorType} locations={locations} />
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
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: SPACING,
    },
});

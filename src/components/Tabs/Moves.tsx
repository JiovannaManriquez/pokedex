import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {fetchMoves} from '../../client/fetcher';
import {ColorTheme, useColor} from '../../utils/colors';
import {Move, MoveIndex, Pokemon} from '../../models/Pokemon';
import Loader from '../Loader';
import {LANGUAGE} from '../../utils/strings';
import Icon from 'react-native-vector-icons/EvilIcons';

interface MovesProps {
    pokemon: Pokemon;
}

const SPACING = 10;

export default function Moves({pokemon}: MovesProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [moves, setMoves] = useState<Move[]>([]);
    const color = useColor(ColorTheme.gray500, ColorTheme.gray200);
    const titleColor = useColor(ColorTheme.gray700, ColorTheme.gray200);

    if (pokemon.moves.length === 0) {
        return (
            <View style={[styles.container, styles.center]}>
                <Icon name="exclamation" size={40} color={color} />
                <Text style={[styles.body, styles.marginTop, {color: color}]}>
                    This POKéMON has no moves.
                </Text>
            </View>
        );
    }

    const fetchData = () => {
        const version =
            pokemon.moves[0].version_group_details[0].version_group.name;
        const movesVersionGroup = getMovesVersion(version, pokemon);
        let movesNames = movesVersionGroup.map(move => move.move);
        fetchMoves(movesNames)
            .then(values => {
                setMoves(values);
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
            {moves.map((move, index) => {
                return (
                    <View
                        key={`move-${index}`}
                        style={[styles.container, styles.border]}>
                        <Text style={[styles.title, {color: titleColor}]}>
                            {`${index + 1}. ${
                                move.names.find(
                                    item => item.language.name === LANGUAGE,
                                )?.name
                            }`}
                        </Text>
                        <Text style={[styles.body, {color: color}]}>
                            {move.flavor_text_entries
                                .find(text => text.language.name === LANGUAGE)
                                ?.flavor_text.replace(/\n|\r|\f/g, ' ')}
                        </Text>
                    </View>
                );
            })}
        </View>
    );
}

export function getMovesVersion(
    version: string,
    pokemon: Pokemon,
): MoveIndex[] {
    return pokemon.moves.filter(move => {
        const index = move.version_group_details.findIndex(
            group => group.version_group.name === version,
        );
        return index >= 0;
    });
}

const styles = StyleSheet.create({
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    marginTop: {
        marginTop: SPACING,
    },
    container: {
        padding: SPACING * 2,
        marginBottom: SPACING * 2,
    },
    border: {
        borderWidth: 1,
        borderColor: ColorTheme.blackWithOpacity,
        borderRadius: SPACING,
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
    },
});

import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {fetchAbility, fetchStat} from '../../client/fetcher';
import {ColorTheme, getBackgroundColor} from '../../utils/colors';
import {Ability, Pokemon, Stat} from '../../models/Pokemon';
import Loader from '../Loader';
import {LANGUAGE} from '../../utils/strings';
import StatCard from '../StatCard';
import Heading from '../Heading';
import AbilityCard from '../AbilityCard';

interface StatsProps {
    pokemon: Pokemon;
}

export const SPACING = 10;

export default function Stats({pokemon}: StatsProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [stats, setStats] = useState<Stat[]>([]);
    const [abilities, setAbilities] = useState<Ability[]>([]);
    const colorType = getBackgroundColor(pokemon.types[0].type.name);

    const fetchData = () => {
        let statsPromises = pokemon.stats.map(stat => {
            return fetchStat(stat.stat.url);
        });
        let abilitiesPromises = pokemon.abilities.map(ability => {
            return fetchAbility(ability.ability.url);
        });
        Promise.all(statsPromises.concat(abilitiesPromises))
            .then(values => {
                setStats(values.slice(0, pokemon.stats.length) as Stat[]);
                setAbilities(
                    values.slice(
                        pokemon.stats.length,
                        values.length,
                    ) as Ability[],
                );
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
            <View style={styles.board}>
                {stats.map((stat, index) => {
                    return (
                        <StatCard
                            key={`stat-${index}`}
                            name={
                                stat.names.find(
                                    item => item.language.name === LANGUAGE,
                                )?.name
                            }
                            base={pokemon.stats[index].base_stat.toString()}
                        />
                    );
                })}
            </View>
            <View>
                <Heading
                    title="Abilities"
                    icon="star"
                    background={colorType}
                    counter={abilities.length}
                />
                {abilities.map((ability, index) => (
                    <AbilityCard key={`ability-${index}`} ability={ability} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    board: {
        borderWidth: 1,
        borderColor: ColorTheme.blackWithOpacity,
        borderRadius: SPACING,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: SPACING * 2,
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
    },
});

import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {
    fetchEvolutionChain,
    fetchPokemons,
    fetchSpecieDescription,
} from '../../client/fetcher';
import {ColorTheme, useColor} from '../../utils/colors';
import {Chain, Pokemon, PokemonEvolution} from '../../models/Pokemon';
import Loader from '../Loader';
import EvolutionCard from '../EvolutionCard';
import Icon from 'react-native-vector-icons/EvilIcons';

interface EvolveProps {
    pokemon: Pokemon;
}

export const SPACING = 10;

export default function Evolve({pokemon}: EvolveProps) {
    const [isLoading, setLoading] = useState<boolean>(true);
    const [evolutions, setEvolutions] = useState<PokemonEvolution[]>([]);
    const color = useColor(ColorTheme.gray500, ColorTheme.gray200);

    const fetchData = () => {
        fetchSpecieDescription(pokemon.species.url)
            .then(response => fetchEvolutionChain(response.evolution_chain.url))
            .then(chain => {
                let names = getEvolutions(pokemon.name, chain);
                let evolvesTo = getEvolvesTo(pokemon.name, chain);
                let evolutionDetails = evolvesTo.map(
                    evolution => evolution.evolution_details,
                );
                return {names, evolutionDetails};
            })
            .then(async response => ({
                pokemons: await fetchPokemons(response.names),
                evolutionDetails: response.evolutionDetails,
            }))
            .then(response => {
                let tempEvolutions = response.pokemons.map(
                    (evolution, index) => ({
                        pokemon: evolution,
                        evolutionDetails: response.evolutionDetails[index],
                    }),
                );
                setEvolutions(tempEvolutions);
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

    if (evolutions.length === 0) {
        return (
            <View style={styles.container}>
                <Icon name="exclamation" size={40} color={color} />
                <Text style={[styles.body, {color: color}]}>
                    This POKéMON does not evolve.
                </Text>
            </View>
        );
    }

    return (
        <View>
            {evolutions.map((evolution, index) => (
                <EvolutionCard
                    key={`evolution-${index}`}
                    evolution={evolution}
                />
            ))}
        </View>
    );
}

function getEvolvesTo(name: string, chain: Chain): Chain[] {
    if (chain.species.name === name) {
        return chain.evolves_to;
    } else {
        for (let i = 0; i < chain.evolves_to.length; i++) {
            let evolvesTo = getEvolvesTo(name, chain.evolves_to[i]);
            if (evolvesTo.length !== 0) {
                return evolvesTo;
            }
        }
    }
    return [];
}

export function getEvolutions(name: string, chain: Chain): string[] {
    let evolvesTo = getEvolvesTo(name, chain);
    return evolvesTo.map(evolution => evolution.species.name);
}

const styles = StyleSheet.create({
    container: {
        borderRadius: SPACING,
        padding: SPACING * 2,
        marginTop: SPACING * 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    body: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        lineHeight: 21,
        marginBottom: SPACING,
        marginTop: SPACING,
    },
});

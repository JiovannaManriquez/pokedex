import {
    Ability,
    Chain,
    EvolutionChain,
    LocationAreas,
    Move,
    NamedAPIResource,
    Pokemon,
    PokemonIndex,
    SpecieDescription,
    Stat,
} from '../models/Pokemon';
import call from './API';

export async function fetchPokemonIndex(): Promise<string[]> {
    const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=5000';
    const response = await call<PokemonIndex>(url);
    const names = response.results.map(item => item.name);
    return names;
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
    return call<Pokemon>('https://pokeapi.co/api/v2/pokemon/' + name);
}

export async function fetchPokemons(names: string[]): Promise<Pokemon[]> {
    let pokemonsFetch = names.map(name => fetchPokemon(name));
    return Promise.all(pokemonsFetch);
}

export async function fetchSpecieDescription(
    url: string,
): Promise<SpecieDescription> {
    return call<SpecieDescription>(url);
}

export async function fetchLocationAreas(
    url: string,
): Promise<LocationAreas[]> {
    return call<LocationAreas[]>(url);
}

export async function fetchStat(url: string): Promise<Stat> {
    return call<Stat>(url);
}

export async function fetchAbility(url: string): Promise<Ability> {
    return call<Ability>(url);
}

export async function fetchEvolutionChain(url: string): Promise<Chain> {
    return (await call<EvolutionChain>(url)).chain;
}

export async function fetchMove(url: string): Promise<Move> {
    return call<Move>(url);
}

export async function fetchMoves(moves: NamedAPIResource[]): Promise<Move[]> {
    let movesFetch = moves.map(move => fetchMove(move.url));
    return Promise.all(movesFetch);
}

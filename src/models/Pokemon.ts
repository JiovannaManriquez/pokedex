export type NamedAPIResource = {
    name: string;
    url: string;
};

export type PokemonIndex = {
    count: number;
    next: string;
    previous: string;
    results: NamedAPIResource[];
};

export type Pokemon = {
    id: number;
    name: string;
    weight: number;
    height: number;
    types: {
        slot: number;
        type: NamedAPIResource;
    }[];
    stats: {
        base_stat: number;
        effort: number;
        stat: NamedAPIResource;
    }[];
    sprites: {
        other: {
            home: {
                front_default: string;
                front_shiny: string;
            };
        };
    };
    species: NamedAPIResource;
    moves: MoveIndex[];
    abilities: {
        ability: NamedAPIResource;
    }[];
    location_area_encounters: string;
};

export type MoveIndex = {
    move: NamedAPIResource;
    version_group_details: {
        level_learned_at: number;
        move_learn_method: NamedAPIResource;
        version_group: NamedAPIResource;
    }[];
};

export type SpecieDescription = {
    flavor_text_entries: {
        flavor_text: string;
        language: NamedAPIResource;
    }[];
    evolution_chain: {
        url: string;
    };
};

export type LocationAreas = {
    location_area: NamedAPIResource;
};

export type Stat = {
    name: string;
    names: {
        language: NamedAPIResource;
        name: string;
    }[];
};

export type Ability = {
    name: string;
    effect_entries: {
        effect: string;
        language: NamedAPIResource;
        short_effect: string;
    }[];
    flavor_text_entries: {
        flavor_text: string;
        language: NamedAPIResource;
    }[];
    names: {
        language: NamedAPIResource;
        name: string;
    }[];
};

export type EvolutionDetail = {
    gender: number;
    held_item: NamedAPIResource;
    item: NamedAPIResource;
    known_move: NamedAPIResource;
    known_move_type: NamedAPIResource;
    location: NamedAPIResource;
    min_affection: number;
    min_beauty: number;
    min_happiness: number;
    min_level: number;
    needs_overworld_rain: boolean;
    party_species: NamedAPIResource;
    party_type: NamedAPIResource;
    relative_physical_stats: number;
    time_of_day: string;
    trade_species: NamedAPIResource;
    trigger: NamedAPIResource;
    turn_upside_down: boolean;
};

export type Chain = {
    evolution_details: EvolutionDetail[];
    evolves_to: Chain[];
    species: NamedAPIResource;
};

export type EvolutionChain = {
    chain: Chain;
};

export type PokemonEvolution = {
    pokemon: Pokemon | null;
    evolutionDetails: EvolutionDetail[];
};

export type Move = {
    name: string;
    names: {
        language: NamedAPIResource;
        name: string;
    }[];
    type: NamedAPIResource;
    flavor_text_entries: {
        flavor_text: string;
        language: NamedAPIResource;
    }[];
};

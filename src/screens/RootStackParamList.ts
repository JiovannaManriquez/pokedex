import {Pokemon} from '../models/Pokemon';

export type RootStackParamList = {
    Home: undefined;
    Pokemon: {pokemon: Pokemon};
};

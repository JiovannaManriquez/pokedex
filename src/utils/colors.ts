import {Dimensions} from 'react-native';
import {Appearance} from 'react-native';

export const ScreenSize = {
    Width: Dimensions.get('window').width,
    Height: Dimensions.get('window').height,
};

export const ColorTypes: {
    [key: string]: {light: string; dark: string};
} = {
    bug: {light: '#9DC130', dark: '#8CAC2A'},
    dark: {light: '#5F606D', dark: '#545561'},
    dragon: {light: '#0773C7', dark: '#0666B2'},
    electric: {light: '#EDD53F', dark: '#D4BE38'},
    fairy: {light: '#EF97E6', dark: '#D587CD'},
    fighting: {light: '#D94256', dark: '#C23B4C'},
    fire: {light: '#F8A54F', dark: '#DD9346'},
    flying: {light: '#9BB4E8', dark: '#8AA1CF'},
    ghost: {light: '#6970C5', dark: '#5D64B0'},
    grass: {light: '#5DBE62', dark: '#53A957'},
    ground: {light: '#D78555', dark: '#C0764C'},
    ice: {light: '#7ED4C9', dark: '#70BDB3'},
    normal: {light: '#9A9DA1', dark: '#898C90'},
    poison: {light: '#B563CE', dark: '#A158B8'},
    psychic: {light: '#F87C7A', dark: '#DD6E6D'},
    rock: {light: '#CEC18C', dark: '#B8AC7D'},
    steel: {light: '#5596A4', dark: '#4C8692'},
    water: {light: '#559EDF', dark: '#4C8DC7'},
};

export enum ColorTheme {
    white = 'white',
    whiteWithOpacity = 'rgba(255, 255, 255, 0.2)',
    black = 'black',
    blackWithOpacity = 'rgba(0, 0, 0, 0.2)',
    gray200 = '#E2E8F0',
    gray300 = '#CBD5E0',
    gray500 = '#718096',
    gray700 = '#2D3748',
}

export const getBackgroundColor = (name: string) => {
    return Appearance.getColorScheme() === 'dark'
        ? ColorTypes[name].dark
        : ColorTypes[name].light;
};

export function useColor(lightValue: string, darkValue: string) {
    return Appearance.getColorScheme() === 'dark' ? darkValue : lightValue;
}

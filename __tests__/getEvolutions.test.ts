const {getEvolutions} = require('../src/components/Tabs/Evolve');
const eeveeJSON = require('./data/eeveeChain.json');
const bulbasaurJSON = require('./data/bulbasaurChain.json');

describe('Function to get all the evolutions of a POKéMON', () => {
    test('Eevee evolutions are', () => {
        const input = {
            name: 'eevee',
            chain: eeveeJSON.chain,
        };
        const output = [
            'vaporeon',
            'jolteon',
            'flareon',
            'espeon',
            'umbreon',
            'leafeon',
            'glaceon',
            'sylveon',
        ];
        expect(getEvolutions(input.name, input.chain)).toStrictEqual(output);
    });

    test('Bulbasaur evolution is', () => {
        const input = {
            name: 'bulbasaur',
            chain: bulbasaurJSON.chain,
        };
        const output = ['ivysaur'];
        expect(getEvolutions(input.name, input.chain)).toStrictEqual(output);
    });

    test('Ivisaur evolution is', () => {
        const input = {
            name: 'ivysaur',
            chain: bulbasaurJSON.chain,
        };
        const output = ['venusaur'];
        expect(getEvolutions(input.name, input.chain)).toStrictEqual(output);
    });

    test('Venusaur evolution is', () => {
        const input = {
            name: 'venusaur',
            chain: bulbasaurJSON.chain,
        };
        const output = [] as string[];
        expect(getEvolutions(input.name, input.chain)).toStrictEqual(output);
    });
});

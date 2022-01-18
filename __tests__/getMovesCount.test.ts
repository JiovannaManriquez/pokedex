import {Pokemon} from '../src/models/Pokemon';

const {getMovesVersion} = require('../src/components/Tabs/Moves');
const bulbasaurJSON = require('./data/bulbasaur.json');

describe('Function to get all the moves of a POKéMON in a version group', () => {
    test('The moves of Bulbasaur in Red-Blue are', () => {
        const input = {
            version: 'red-blue',
            pokemon: bulbasaurJSON as Pokemon,
        };
        const output = 23;
        expect(getMovesVersion(input.version, input.pokemon)).toHaveLength(
            output,
        );
    });
});

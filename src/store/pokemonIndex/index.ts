import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {fetchPokemonIndex} from '../../client/fetcher';

export const getIndex = createAsyncThunk('pokemon/index', async () => {
    const response: string[] = await fetchPokemonIndex();
    return response;
});

interface IndexState {
    status: string;
    index: string[];
    names: string[];
}

const initialState: IndexState = {
    status: 'idle',
    index: [],
    names: [],
};

const indexSlice = createSlice({
    name: 'index',
    initialState: initialState,
    reducers: {
        searchPokemons: (state, {payload}) => {
            if (payload.text === '') {
                state.index = state.names;
            } else {
                const text = `${payload.text}`.toLowerCase();
                const searchNames = state.names.filter(name =>
                    name.includes(text),
                );
                state.index = searchNames;
            }
        },
    },
    extraReducers: builder => {
        builder
            .addCase(getIndex.pending, state => {
                state.status = 'loading';
            })
            .addCase(getIndex.fulfilled, (state, action) => {
                state.index = action.payload;
                state.names = action.payload;
                state.status = 'success';
            })
            .addCase(getIndex.rejected, state => {
                state.status = 'error';
            });
    },
});

export const {searchPokemons} = indexSlice.actions;
export default indexSlice.reducer;

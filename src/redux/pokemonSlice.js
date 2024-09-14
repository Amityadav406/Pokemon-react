import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    addPokemon: (state, action) => {
      state.pokemons.push(action.payload);
    },
    removePokemon: (state, action) => {
      state.pokemons = state.pokemons.filter(pokemon => pokemon.id !== action.payload);
    },
    editPokemon: (state, action) => {
      const { id, updatedPokemon } = action.payload;
      const index = state.pokemons.findIndex(pokemon => pokemon.id === id);
      if (index !== -1) {
        state.pokemons[index] = updatedPokemon;
      }
    },
  },
});

export const { addPokemon, removePokemon, editPokemon } = pokemonSlice.actions;
export default pokemonSlice.reducer;

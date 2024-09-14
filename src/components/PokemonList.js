// components/PokemonList.js
import { useSelector } from 'react-redux';
import PokemonItem from './PokemonItem';
import { useState, useEffect } from 'react';

const PokemonList = () => {
  const pokemons = useSelector((state) => state.pokemon.pokemons);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setLoading(false);
      }, 300); // Simulate loading for 300ms
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-blue-500 rounded-full"></div>
        <p className="mt-2 text-lg">Loading Pokémon...</p>
      </div>
    );
  }

  if (pokemons.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-lg">No Pokémon added yet. Start by adding some!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonItem key={pokemon.id} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;

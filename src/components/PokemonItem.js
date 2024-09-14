// components/PokemonItem.js
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removePokemon } from '../redux/pokemonSlice';
import PokemonForm from './PokemonForm';

const PokemonItem = ({ pokemon }) => {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removePokemon(pokemon.id));
  };

  return (
    <div className="bg-white p-5 rounded-2xl shadow-lg mb-6 flex flex-col items-center relative overflow-hidden">

      {isEditing ? (
        <PokemonForm pokemon={pokemon} toggleEditMode={() => setIsEditing(false)} />
      ) : (
        <>
          <div className="relative z-10 w-full flex flex-col items-center">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-md mb-4"
            />
            <h3 className="text-3xl font-semibold text-blue-800 mb-2">{pokemon.name}</h3>
            <p className="text-lg text-blue-600 mb-1">{pokemon.breed}</p>
            <p className="text-gray-700 text-center mb-4">{pokemon.description}</p>
          </div>
          <div className="flex justify-center gap-4 mt-4 w-full relative z-10">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-5 rounded-lg shadow-lg transition-transform transform hover:scale-105"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PokemonItem;

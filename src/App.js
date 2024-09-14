import React from 'react';
import PokemonForm from './components/PokemonForm';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <header className="w-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-center py-10 mb-10 rounded-b-3xl shadow-2xl">
        <h1 className="text-5xl font-extrabold mb-2">Ash's Pokémon Tracker</h1>
        <p className="text-lg font-semibold">Track, manage, and enjoy your Pokémon collection!</p>
      </header>

          <PokemonForm />
   
          <PokemonList />
     
    </div>
  );
};

export default App;

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPokemon, editPokemon } from '../redux/pokemonSlice';
import { v4 as uuidv4 } from 'uuid';

const PokemonForm = ({ pokemon, toggleEditMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    description: '',
    image: '',
  });
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (pokemon) {
      setFormData({
        name: pokemon.name,
        breed: pokemon.breed,
        description: pokemon.description,
        image: pokemon.image,
      });
      setImagePreview(pokemon.image);
    }
  }, [pokemon]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prevData => ({ ...prevData, image: reader.result }));
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pokemon) {
      dispatch(editPokemon({ id: pokemon.id, updatedPokemon: formData }));
      toggleEditMode();
    } else {
      dispatch(addPokemon({ id: uuidv4(), ...formData }));
      setFormData({ name: '', breed: '', description: '', image: '' });
      setImagePreview('');
    }
  };

  return (
    <div className="flex justify-center items-center  bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white rounded-3xl shadow-lg max-w-lg w-full mx-4 sm:mx-auto space-y-6 border border-gray-200"
      >
        <h2 className="text-4xl font-semibold text-gray-800 text-center mb-6">
          {pokemon ? 'Edit Pokémon' : 'Add Pokémon'}
        </h2>

        <InputField
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />

        <InputField
          name="breed"
          placeholder="Breed"
          value={formData.breed}
          onChange={handleChange}
        />

        <TextareaField
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <FileInputField onChange={handleImageChange} />

        {imagePreview && <ImagePreview src={imagePreview} />}

        <SubmitButton isEditing={!!pokemon} />
      </form>
    </div>
  );
};

const InputField = ({ name, placeholder, value, onChange }) => (
  <input
    type="text"
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
    required
  />
);

const TextareaField = ({ name, placeholder, value, onChange }) => (
  <textarea
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full p-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
    rows="4"
    required
  />
);

const FileInputField = ({ onChange }) => (
  <input
    type="file"
    accept="image/*"
    onChange={onChange}
    className="w-full border border-gray-300 rounded-xl py-2 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
  />
);

const ImagePreview = ({ src }) => (
  <img
    src={src}
    alt="Preview"
    className="w-full h-60 object-cover rounded-xl mb-4 border border-gray-300 shadow-md"
  />
);

const SubmitButton = ({ isEditing }) => (
  <button
    type="submit"
    className={`w-full py-2 rounded-xl text-white transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-${isEditing ? 'green' : 'blue'}-500 ${
      isEditing
        ? 'bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:from-green-500 hover:via-green-600 hover:to-green-700'
        : 'bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:via-blue-600 hover:to-blue-700'
    }`}
  >
    {isEditing ? 'Save Changes' : 'Add Pokémon'}
  </button>
);

export default PokemonForm;

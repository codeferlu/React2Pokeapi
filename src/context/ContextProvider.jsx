import { createContext, useEffect, useState } from 'react';

export const PokemonContext = createContext();

export const ContextProvider = ({ children }) => {
	const [characters, setCharacters] = useState([]);

	const fetchPokemonDetails = async (url) => {
		try {
		  const response = await fetch(url);
		  const data = await response.json();
		  return data;
		} catch (error) {
		  console.error('Error fetching pokemon details:', error);
		}
	  };
	

	  useEffect(() => {
		const fetchData = async () => {
		  try {

			const response = await fetch('https://pokeapi.co/api/v2/pokemon/');

			const data = await response.json();
	
			const { results } = data;
			
			const mappedData = await Promise.all(results.map(async (pokemon, index) => {
			  const pokemonDetails = await fetchPokemonDetails(pokemon.url);
			  return {
				id: pokemonDetails.id,
				name: pokemonDetails.name,
				height: pokemonDetails.height,
				weight: pokemonDetails.weight,
				sprites: pokemonDetails.sprites.front_default,

			  };
			}));

			setCharacters(mappedData);
		  } catch (error) {
			console.error('Error fetching data:', error);
		  }
		};
	

		fetchData();
	  }, []);

	  return (
		<PokemonContext.Provider value={{ characters }}>
		  {children}
		</PokemonContext.Provider>
	  );
	};
	
import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { PokemonContext } from '../context/ContextProvider';

export const CharacterDetail = () => {
	const { characters } = useContext(PokemonContext);
	const { id } = useParams();

	const characterDetail = characters.find((character) => character.id == id);

	console.log();

	console.log(characterDetail);

	return (
		<div>
			{characterDetail ? (
				<>
					
					<div className="flex flex-col gap-3 p-3">
						<h1>{characterDetail.name}</h1>
						<h1>ID: {id}</h1>
						<figure>
							<img
								loading="lazy"
								src={characterDetail.sprites}
								alt={characterDetail.sprites}
							/>
						
						</figure>


						<div>
							<p>
								Altura:{' '}
								{characterDetail.height
									? characterDetail.height
									: "Doesn't have type"}
							</p>
						</div>
						<div>
							<p>
								Peso:{' '}
								{characterDetail.weight
									? characterDetail.weight
									: "Doesn't have type"}
							</p>
						</div>
					</div>
				</>
			) : (
				<h1>Loading Character</h1>
			)}
		</div>
	);
};

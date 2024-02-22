import './styles.css';

function Description({epNumber, epName, epDate, characters}) {
    return (
        <div className='container-description'>
            <div className='title-description'>
                <p>{epNumber} - <span>{epName}</span> - {epDate}</p>

                <p>Episode characters:</p>
            </div>
            <div className='character-description'>
                {characters.map((character) => (
                    <div key={character.id} className='card-character'>
                        <img src={character.image} />
                        <p>Name: {character.name}</p>
                        <p>Species: {character.species}</p>
                        <p>Status: {character.status}</p>
                    </div>

                ))}
            </div>

        </div>
    );
}

export default Description;
import Button from "../Button";
import './styles.css';

import { FaPlus } from "react-icons/fa6";
import { GoCheck } from "react-icons/go"
import { MdFavoriteBorder } from "react-icons/md";

function Card(
    { data,
        setEpNumber,
        setEpName,
        setEpDate,
        setCharacters,
        setShow,
        favoritedId, setFavoritedId,
        watchedId, setWatchedId,
        text
    }) {


    //altera opção visto do card
    function toggleWatched(id) {
        setWatchedId(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(watchedId => watchedId !== id)
            } else {
                return [...prevIds, id]
            }
        })
    }

    function isFavorited(id) {

        return favoritedId.some(item => item.id === id)
    }

    function watched(id) {
        return watchedId.includes(id)
    }

    // função toggleFavorite tem como parametro o id do card selecionado
    function toggleFavorite(id, episode, name) {

        //aqui temos um array favoritedId, e o prevIds são os objetos dentro do arrray
        setFavoritedId(prevIds => {

            // verifica se algum objeto no array possui o mesmo id
            const isFavorite = prevIds.some(favId => favId.id === id);


            if (isFavorite) {

                //nesse caso (true) cria-se um novo array com função filter onde o objeto.id seja !==(diferente) do id passado como parametro    
                //removendo o objeto com o id correspondente
                return prevIds.filter(favId => favId.id !== id)

            } else {

                // se não houver um objeto que contém o id passado na props
                // utiliza o spreed operator(...prevIds) para adicionar outro objeto com id passado na props   
                return [...prevIds, { id: id, episode: episode, name: name }];
            }

        })

    }


    function showDetails(card) {
        setEpNumber(card.episode);
        setEpName(card.name);
        setEpDate(card.air_date);
        setCharacters(card.characters);

        setShow('show');
    }

    function filterEpisode(card) {
        const searchText = text ? text.toLowerCase() : '';
        const episodeName = card.name ? card.name.toLowerCase() : '';

        //verifica se seachtext está  vazio, se estiver a função retorna true
        //então significa que nenhum filtro foi aplicado no input
        if (!searchText) {
            return true;
        }
        return episodeName.includes(searchText);
    }

    return (

        <>
            {
                data.episodes.results.filter(filterEpisode)
                    .map((card) => (
                        <div className='card' key={card.id}>
                            <div className='card-description'>

                                <p>{card.episode} - <span>{card.name}</span></p>
                                <p>released: {card.air_date}</p>
                                <p>Number of characters <br /> in the episode: {card.characters.length}</p>

                                <div>

                                    <Button
                                        className='btn show-details'
                                        onClick={() => showDetails(card)} >
                                        Show Details
                                    </Button>

                                    <Button
                                        className={`btn ${isFavorited(card.id) ? 'selected' : 'favorite'}`}
                                        onClick={() => toggleFavorite(card.id, card.episode, card.name)} >

                                        <MdFavoriteBorder size={18} />
                                    </Button>

                                    <Button
                                        className={`btn ${watched(card.id) ? 'selected' : 'watched'}`}
                                        onClick={() => toggleWatched(card.id)} >

                                        {watched(card.id) ? <GoCheck size={18} /> : <FaPlus size={18} />}
                                    </Button>

                                </div>
                            </div>
                        </div>
                    ))
            }

        </>
    );
}

export default Card;
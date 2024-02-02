import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './styles.css';

import { FaPlus } from "react-icons/fa6";
import { GoCheck, GoChevronLeft, GoChevronRight } from "react-icons/go"
import { MdFavoriteBorder } from "react-icons/md";

import { client } from '../../config/client.grapgql';

import Footer from '../../Components/Footer';
import Banner from '../../Components/Banner';


const GET_EPISODES = gql`
  query GetEpisodes {
    episodes {
      results {
        id
        episode
        name
        air_date
        characters {
          id
          image
          name
          species
          status
        }
      }
    }
  }
`;

    

function Home() {

    const { loading, data } = useQuery(GET_EPISODES);

    const [show, setShow] = useState('hidden');
    const [open, setOpen] = useState('close');

    const [epNumber, setEpNumber] = useState();
    const [epName, setName] = useState();
    const [epDate, setEpDate] = useState();
    const [characters, setCharacters] = useState([]);

    const [favoritedId, setFavoritedId] = useState([]);
    const [watchedId, setWatchedId] = useState([]);

    const [text, setText] = useState('');


    function showDetails(card) {
        setEpNumber(card.episode);
        setName(card.name);
        setEpDate(card.air_date);
        setCharacters(card.characters);

        setShow('show');
    }

    function close() {
        setShow('hidden');
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

    function toggleWatched(id) {
        setWatchedId(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(watchedId => watchedId !== id)
            } else {
                return [...prevIds, id]
            }
        })
    }

    function openClose() {
        if (open === 'close') {
            setOpen('open');
        } else {
            setOpen('close')
        }
    }

    function dataEnter(event) {
        setText(event.target.value);
    }    
    function filterEpisode(card) {
        const searchText = text ? text.toLowerCase() : '';
        const episodeName = card.name ? card.name.toLowerCase() : '';
        if (!searchText) {
            return true;
        }
        return episodeName.includes(searchText);
    }
    

    if (loading) return <div className='container-home'><p>Loading...</p></div>;

    return (
        <main className='container-home'>

            <Banner />

            <div className='container-search'>
                <div>
                    <input
                        type="text"
                        placeholder='Enter the episode name'
                        onChange={dataEnter}
                    />
                </div>

                <div className='box-btn'>

                    <button className='btn-open' onClick={openClose}>
                        <GoChevronLeft size={30} />
                        <p>favorite episodes</p>
                    </button>

                </div>

            </div>

            <div className='container-cards'>

                {data.episodes.results.filter(filterEpisode)
                .map((card) => (
                            <div className='card' key={card.id}>
                                <div className='card-description'>
                                    <p>{card.episode} - <span>{card.name}</span></p>
                                    <p>released: {card.air_date}</p>
                                    <p>Number of characters <br /> in the episode: {card.characters.length}</p>

                                    <div className='buttons'>
                                        <button
                                            className='btn show-details' onClick={() =>
                                                showDetails(card)}>
                                            Show Details
                                        </button>

                                        <button onClick={() =>
                                            toggleFavorite(card.id, card.episode, card.name)}
                                            className={`btn ${isFavorited(card.id) ? 'selected' : 'favorite'}`}>
                                            <MdFavoriteBorder size={18} />
                                        </button>

                                        <button onClick={() =>
                                            toggleWatched(card.id)}
                                            className={`btn ${watched(card.id) ? 'selected' : 'watched'}`}>
                                            {watched(card.id) ? <GoCheck size={18} /> : <FaPlus size={18} />}
                                        </button>
                                    </div>
                                </div>
                            </div>
                ))}

                <div className={show}>

                    <button onClick={close}>
                        X
                    </button>

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

                </div>

            </div>

            <div className={`container-favorited ${open}`}>

                <button className='btn-close' onClick={openClose}>
                    <GoChevronRight size={30} />
                </button>

                {favoritedId.map((favorited) => (

                    <div className='box-favorited' key={favorited.id}>
                        
                        <p>{favorited.name} <br />
                        {favorited.episode}</p>

                    </div>
                ))}
            </div>
            
            <Footer />
        </main>

        
    );
}

export default Home;

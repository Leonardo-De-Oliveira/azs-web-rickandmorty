import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import './styles.css';

import { GoChevronRight } from "react-icons/go"

import Footer from '../../Components/Footer';
import Banner from '../../Components/Banner';
import Button from '../../Components/Button';
import Search from '../../Components/Search';
import BackAndNext from '../../Components/BackAndNext';
import Card from '../../Components/Card';
import Description from '../../Components/Description';


const GET_EPISODES = gql`
  query GetEpisodes($page: Int!) {
    episodes(page: $page) {
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

    const [currentPage, setCurrentPage] = useState(1);

    const { loading, error, data } = useQuery(GET_EPISODES, {
        variables: { page: currentPage }
    });

    const [show, setShow] = useState('hidden');
    const [open, setOpen] = useState('close');

    const [epNumber, setEpNumber] = useState();
    const [epName, setEpName] = useState();
    const [epDate, setEpDate] = useState();
    const [characters, setCharacters] = useState([]);

    const [favoritedId, setFavoritedId] = useState([]);
    const [watchedId, setWatchedId] = useState([]);

    const [text, setText] = useState('');


    function close() {
        setShow('hidden');
    }


    //abre e fecha a aba de favoritos
    function openClose() {
        if (open === 'close') {
            setOpen('open');
        } else {
            setOpen('close')
        }
    }




    if (loading) return <div className='container-loading'><h1>Loading...</h1></div>;

    if (error) return <div className='container-loading'> <h1>Error : {error.message}</h1></div>;

    return (
        <main className='container-home'>

            <Banner />

            <Search open={open} setOpen={setOpen} setText={setText} />

            <BackAndNext currentPage={currentPage} setCurrentPage={setCurrentPage} />

            <section className='container-cards'>

                <Card 
                    data={data}
                    text={text}
                    setEpNumber={setEpNumber}
                    setEpName={setEpName}
                    setEpDate={setEpDate}
                    characters={characters} setCharacters={setCharacters}
                    show={show} setShow={setShow}
                    favoritedId={favoritedId} setFavoritedId={setFavoritedId}
                    watchedId={watchedId} setWatchedId={setWatchedId} />

                <div className={show}>

                    <Button onClick={close}>
                        X
                    </Button>

                    <Description 
                        epNumber={epNumber} 
                        epName={epName} 
                        epDate={epDate} 
                        characters={characters} />

                </div>

            </section>

            <section className={`container-favorited ${open}`}>

                <Button
                    className={'btn-close'}
                    onClick={openClose} >

                    <GoChevronRight size={30} />
                </Button>

                {favoritedId.map((favorited) => (

                    <div className='box-favorited' key={favorited.id}>

                        <p>{favorited.name} <br />
                            {favorited.episode}</p>

                    </div>
                ))}
                
            </section>

            <Footer />

        </main>


    );
}

export default Home;

import { useState, useEffect } from "react";
import React from 'react'
import styles from './Home.module.css'
import { Link } from 'react-router-dom'
import Episode from '../detalhes/Episode'

function Home() {

    const endPoint = 'https://rickandmortyapi.com/api/episode/'
    const [projects, setProjects] = useState([])
    const [filteredData, setFilteredData] = useState(projects)
    const [favorites, setFavorites] = useState([])
    //const [defaultResults, setDefaultResults] = useState([])

    useEffect(() => {
        fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((resp) => resp.json())
            .then((data) => {
                //console.log({ data })
                setProjects(data.results)
                setFilteredData(data.results)
                //setFavorites(data.results)//setDefaultResults(data.info)
                //setRemoveLoading(true)   
            })
            .catch((err) => console.log(err))
    }, [])

    const handleSearch = (event) => {
        let value = event.target.value;
        let result = [];
        //console.log(value);
        result = projects.filter((names) => {
            return names.name.search(value) != -1;
        });
        setFilteredData(result);
    }


    function handleFavorite(id) {
        const filtered = projects.filter(p => p.id === id)[0]
        console.log({ filtered })
        setFavorites(oldFavorites => {
            let favoritesList = oldFavorites
            let isNotFavorite = oldFavorites.filter(fav => fav.id !== filtered.id)
            console.log({ isNotFavorite })
            if (isNotFavorite.length > 0 || oldFavorites.length < 1) {
                favoritesList = [...oldFavorites, filtered]

            }
            return favoritesList
        })
        //favoritesList.push(filtered)
        //console.log({ favoritesList })
    }
    return (

        <div>
            <div className={styles.title}>
                <h1>Rick and Morty Episodes</h1>
                <div className={styles.search}>
                    <input placeholder="Search episodes by names" type="text" onChange={(event) => handleSearch(event)} />
                </div>
                <div>
                    {filteredData.length > 0 && filteredData.map(({ id, name, air_date, characters }) =>
                        <div key={id}>

                            <div>
                                <ul key={id} className={styles.grid}>
                                    <li className={styles.card} key={id}>
                                        <div key={id}>
                                            <button onClick={() => { handleFavorite(id); }}>
                                                Add favorite
                                            </button>
                                            <Link style={{ textDecoration: 'none' }} to={`/episode/${id}`}>
                                                <h2>{name}</h2>
                                            </Link>
                                            <p>{`Episode: ${id}`}</p>
                                            <p>{`Air date: ${air_date}`}</p>
                                            <p>{`Characters in the episode: ${characters.length}`}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                    }
                    {favorites.length > 0 && <h1>Favorite List</h1>}
                    {favorites.length > 0 && favorites.map(({ id, name, air_date, characters }) =>
                        <div key={id}>
                            <div>
                                <ul key={id} className={styles.grid}>
                                    <li className={styles.card} key={id}>
                                        <div key={id}>
                                            <Link style={{ textDecoration: 'none' }} to={`/episode/${id}`}>
                                                <h2>{name}</h2>
                                            </Link>
                                            <p>{`Episode: ${id}`}</p>
                                            <p>{`Air date: ${air_date}`}</p>
                                            <p>{`Characters in the episode: ${characters.length}`}</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )
                    }
                </div>
            </div>
        </div >
    )
}

export default Home
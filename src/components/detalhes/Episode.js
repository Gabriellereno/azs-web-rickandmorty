import styles from './Episode.module.css'
import { useState, useEffect } from "react";
import React from 'react'
import { useParams, Link } from 'react-router-dom'


function Episode() {
    const { id } = useParams()
    //console.log(id)
    const endPoint = `https://rickandmortyapi.com/api/episode/${id}`
    const [projects, setProjects] = useState([])
    const newEndPoint = (projects.characters)
    const [single, setSingle] = useState([])

    useEffect(() => {
        fetch(endPoint, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            },
        }).then((resp) => resp.json())
            .then((data) => {
                //console.log({ data })
                setProjects(data)         
            })
            .catch((err) => console.log(err))
    }, [])

    function Character() {

        useEffect(() => {
        Promise.all(projects.characters.map(url =>
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json',
                },
            }).then(resp => resp.json())
        )).then((data) => {
            setSingle(data)
                          
        })
    }, [])

        return (
            <div><p>Charaters at episode:</p>
            {single.length > 0 && single.map(({ id, name, species, status, image }) =>
            <ul className={styles.grid}>
                <li className={styles.card} key={id}>
                        <img src={image} alt={name}/>
                        <h2>{name}</h2>
                        <p>Species: {species}</p>
                        <p>Status: {status}</p>                    
                </li>
            </ul>
        )}
        </div>
        )
    }


    return (
        <div className={styles.title}>
            <h1><p><Link style={{ textDecoration: 'none', color:"#0d97af" }} to="/">BACK</Link></p> Rick and Morty Episodes</h1>
                        {projects.name ? (
                <ul className={styles.grid}>
                    <li className={styles.card} key={id}>
                        <p>{`Episode: ${projects.id}`}</p>
                        <h2>{projects.name}</h2>
                        <p>{`Air date: ${projects.air_date}`}</p>
                        <Character/>
                    </li>
                </ul>) : (<h4>Loading...</h4> /*Algum componente de Loading*/)
            } 
        </div>
    )
}
export default Episode
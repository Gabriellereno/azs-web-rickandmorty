import { useState, useEffect } from "react";
import React from "react";
import style from "./Home.module.css";
import Navbar from "./componentes/Navbar";
import Episodes from "./componentes/Episodes";
import FavoriteList from "./componentes/FavoriteList";

function Home() {
  const endPoint = "https://rickandmortyapi.com/api/episode/";
  const [projects, setProjects] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showCharacthers, setShowCharacthers] = useState(false);
  const [personagens, setPersonagens] = React.useState([]);
  const [reposiLocal, setReposiLocal] = React.useState([]);

  useEffect(() => {
    fetch(endPoint, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((resp) => resp.json())
      .then((data) => {
        setProjects(data.results);
        setFilteredData(data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase();
    let result = [];

    result = projects.filter((names) => {
      return names.name.toLowerCase().search(value) != -1;
    });
    setFilteredData(result);
  };

  function handleFavorite(id, name, air_date, characters) {
    const verifJaFavorito = favorites.find((item) => item.id === id);

    if (verifJaFavorito) {
      const verifEpisodioExist = filteredData.some(
        (episodio) => episodio.id === id
      );

      if (verifEpisodioExist) {
        const episodiosEditados = filteredData.map((episodio) => {
          let valorDeFavorito = { ...episodio };
          if (episodio.id === id) {
            if (episodio.favorito) {
              valorDeFavorito = {
                ...episodio,
                favorito: false,
              };
            } else {
              valorDeFavorito = {
                ...episodio,
                favorito: true,
              };
            }
          }
          return valorDeFavorito;
        });

        setFilteredData(episodiosEditados);
      }
    } else {
      const novoFavorito = {
        id: id,
        name: name,
        air_date: air_date,
        characters: characters,
      };
      setFavorites([...favorites, novoFavorito]);
      saveLocalStorage(id, JSON.stringify(novoFavorito));
    }
  }

  function saveLocalStorage(name, value) {
    localStorage[name] = value;
  }

  function setLocalStorage() {
    const valoresSalvos = Object.keys(localStorage);
    if (valoresSalvos) {
      let acumuladorEpisodios = [];
      valoresSalvos.forEach((id) => {
        let episodiosLocal = localStorage.getItem(id);

        acumuladorEpisodios.push(JSON.parse(episodiosLocal));
        // setFavorites([JSON.parse(episodiosLocal)]);
        console.log(acumuladorEpisodios);
      });
      setFavorites(acumuladorEpisodios);
    }
  }

  React.useEffect(() => {
    setLocalStorage();
  }, []);

  function mostrarPersonagens(id, characters) {
    const verifEpisodioExist = filteredData.some(
      (episodio) => episodio.id === id
    );

    if (verifEpisodioExist) {
      const episodioEditado = filteredData.map((episodio) => {
        let propsDoObj = { ...episodio };
        if (episodio.id === id) {
          propsDoObj = {
            ...episodio,
            show: true,
          };
        } else {
          propsDoObj = {
            ...episodio,
            show: false,
          };
        }
        return propsDoObj;
      });

      setFilteredData(episodioEditado);
      const obterPersonagens = characters.map(async (char) => {
        return await fetch(char).then((resp) => resp.json());
      });
      Promise.all(obterPersonagens).then((data) => setPersonagens(data));

      setShowCharacthers(true);
    }
  }

  function naoMostrarPersonagens() {
    setShowCharacthers(false);
  }

  return (
    <div className={style.homeBg}>
      <Navbar handleSearch={handleSearch} />

      <Episodes
        filteredData={filteredData}
        handleFavorite={handleFavorite}
        mostrarPersonagens={mostrarPersonagens}
        naoMostrarPersonagens={naoMostrarPersonagens}
        showCharacthers={showCharacthers}
        personagens={personagens}
      />

      <FavoriteList favorites={favorites} />
    </div>
  );
}

export default Home;

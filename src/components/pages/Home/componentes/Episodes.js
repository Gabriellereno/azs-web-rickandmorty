import Aviso from "../../../utilitário/Aviso";
import style from "./Episodes.module.css";
import Personagens from "./Personagens";

function Episodes({
  filteredData,
  handleFavorite,
  mostrarPersonagens,
  naoMostrarPersonagens,
  showCharacthers,
  personagens,
}) {
  return (
    <div className={style.episodesContainer}>
      {filteredData &&
        filteredData.map(
          ({ id, name, air_date, characters, favorito, show }) => (
            <div className={style.comporta} key={id}>
              <Personagens
                key={id}
                show={show}
                showCharacthers={showCharacthers}
                personagens={personagens}
              />
              <div className={style.episode}>
                {favorito && (
                  <Aviso className={style.jaFavorito} message="Já é favorito" />
                )}

                <div className={style.episodeBtn}>
                  <button
                    onClick={() => {
                      handleFavorite(id, name, air_date, characters);
                    }}
                  >
                    add favorite
                  </button>
                </div>
                <div
                  className={style.episodeConteudo}
                  onMouseOver={() => {
                    mostrarPersonagens(id, characters);
                  }}
                  onMouseOut={() => {
                    naoMostrarPersonagens();
                  }}
                >
                  <h2>{name}</h2>
                  <div>
                    <p>
                      <b>Episode: </b>
                      {id}
                    </p>
                    <p>
                      <b>Air: </b> {air_date}
                    </p>

                    <p>
                      <b>Characters: </b>
                      {characters.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </div>
  );
}

export default Episodes;

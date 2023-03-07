import style from "./FavoriteList.module.css";

function FavoriteList({ favorites }) {
  return (
    <>
      {favorites.length > 0 && (
        <div className={style.favoritosBg}>
          <span>
            <h1>Favorite </h1> List
          </span>
          <div className={style.episodesContainer}>
            {favorites &&
              favorites.map(({ id, name, air_date, characters }) => (
                <div key={id} className={style.episode}>
                  <div className={style.episodeConteudo}>
                    <h2>{name}</h2>
                    <div>
                      <p>
                        <b>Episode:</b> {id}
                      </p>
                      <p>
                        <b>Air:</b> {air_date}
                      </p>
                      <p>
                        <b>Characters:</b> {characters.length}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default FavoriteList;

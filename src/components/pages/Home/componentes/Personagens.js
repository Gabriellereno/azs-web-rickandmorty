import style from "./Personagens.module.css";

function Personagens({ show, showCharacthers, personagens }) {
  return (
    <>
      {show && showCharacthers && (
        <div
          className={`${style.personagens} ${
            personagens.length <= 19 ? style.poucosPersonagens : false
          } ${
            personagens.length <= 36 && personagens.length >= 20
              ? style.mediosPersonagens
              : false
          }`}
        >
          {personagens &&
            personagens.map((personagem) => (
              <div key={personagem.id} className={style.personagensConteudo}>
                <img src={personagem.image} alt={personagem.name} />

                <div>
                  <h2>{personagem.name}</h2>
                  <p>Species: {personagem.species}</p>
                  <p>Status: {personagem.status}</p>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
export default Personagens;

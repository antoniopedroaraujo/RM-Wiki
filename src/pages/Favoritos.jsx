import PersonagemCard from "../components/PersonagemCard";
import { useFavorites } from "../context/FavoritosContext";


function Favoritos(){

  const {

    favorites
  } = useFavorites();

  return (

    <div className="container mt-4">
      <h1>
        Favoritos
      </h1>
      {

      favorites.length === 0 ? (
        <div className="alert alert-info mt-4">
          Você ainda não tem favoritos
        </div>
      ) : (
        <div className="row mt-4">
          { favorites.map(character => (

            <PersonagemCard

              key={character.id}
              character={character}
            />
          ))
          }
        </div>
      )
      }
    </div>
  );
}

export default Favoritos;
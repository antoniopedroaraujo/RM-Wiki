import PersonagemCard from "../components/PersonagemCard";
import { useFavorites } from "../context/useFavorites";

function Favoritos() {
  const { favorites } = useFavorites();

  return (
    <div className="container mt-4">
      <h1 className="page-title">Favoritos</h1>
      {favorites.length === 0 ? (
        <>
          <p>Seus personagens favoritos aparecerão aqui</p>
          <div className="alert alert-info mt-4">
            Você ainda não adicionou nenhum personagem aos favoritos
          </div>
        </>
      ) : (
        <>
          {favorites.length == 1 ? (
            <p>1 personagem favoritado</p>
          ) : (
            <p>{favorites.length} personagens favoritados</p>
          )}
          <div className="row mt-4">
            {favorites.map((character) => (
              <PersonagemCard key={character.id} character={character} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Favoritos;

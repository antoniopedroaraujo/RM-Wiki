import { useFavorites } from "../context/useFavorites";
import { Character } from "../types/character";

interface PersonagemCardProps {
  character: Character;
}

function PersonagemCard({ character }: PersonagemCardProps) {
  const { favorites, toggleFavorite } = useFavorites();

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Alive":
        return "bg-success";
      case "Dead":
        return "bg-danger";
      default:
        return "bg-secondary";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Alive":
        return "Vivo";

      case "Dead":
        return "Morto";

      case "unknown":
        return "Desconhecido";

      default:
        return status;
    }
  };

  return (
    <div className="col-md-6 col-lg-3 mb-4">
      <div className="card h-100 shadow-sm cartoon-card character-card">
        <img
          src={character.image}
          className="card-img-top"
          alt={character.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{character.name}</h5>
          <p className="card-text mb-2">
            <strong>Espécie:</strong> {character.species}
          </p>
          <p className="card-text">
            <strong>Status:</strong>{" "}
            <span className={`badge ${getStatusBadge(character.status)}`}>
              {getStatusText(character.status)}
            </span>
          </p>
          <button
            className={`btn mt-auto btn-cartoon ${
              isFavorite ? "btn-danger" : "btn-outline-danger"
            }`}
            onClick={(e) => {
              toggleFavorite(character);
              e.currentTarget.blur();
            }}
          >
            {isFavorite ? "❤️ Remover" : "🤍 Favoritar"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PersonagemCard;

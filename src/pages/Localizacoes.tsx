import { useEffect, useState } from "react";
import LocalizacaoCard from "../components/LocalizacaoCard";
import Loading from "../components/Loading";
import Paginacao from "../components/Paginacao";
import { Location } from "../types/location";
import { ApiResponse } from "../types/api";

type LocationType =
  | ""
  | "Planet"
  | "Cluster"
  | "Space station"
  | "Microverse"
  | "TV";

function Localizacoes() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [type, setType] = useState<LocationType>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getLocations() {
      setLoading(true);
      setError("");

      try {
        let url = `https://rickandmortyapi.com/api/location?page=${page}`;

        if (type !== "") {
          url += `&type=${encodeURIComponent(type)}`;
        }

        const response = await fetch(url);

        if (!response.ok) {
          setLocations([]);
          setTotalPages(1);
          setError("Não foi possível carregar as localizações.");

          return;
        }

        const data: ApiResponse<Location> = await response.json();

        setLocations(data.results);
        setTotalPages(data.info.pages);
      } catch (error) {
        console.log("Erro ao buscar localizações:", error);
        setError("Ocorreu um erro ao buscar as localizações. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    getLocations();
  }, [page, type]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <h1 className="page-title">Localizações</h1>
      <p>Explore todos os lugares do universo Rick and Morty</p>

      {/* FILTRO */}

      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {["", "Planet", "Cluster", "Space station", "Microverse", "TV"].map(
            (item) => (
              <button
                key={item}
                type="button"
                className={`btn ${
                  type === item ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => {
                  setType(item as LocationType);
                  setPage(1);
                }}
              >
                {item === ""
                  ? "Todos"
                  : item === "Planet"
                    ? "Planeta"
                    : item === "Cluster"
                      ? "Cluster"
                      : item === "Space station"
                        ? "Estação espacial"
                        : item === "Microverse"
                          ? "Microverso"
                          : "TV"}
              </button>
            ),
          )}
        </div>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      {/* CARDS */}

      {locations.length === 0 && !error ? (
        <div className="alert alert-info mt-4">
          Nenhuma localização foi encontrada.
        </div>
      ) : (
        <div className="row">
          {locations.map((location) => (
            <LocalizacaoCard key={location.id} location={location} />
          ))}
        </div>
      )}
      <Paginacao page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default Localizacoes;

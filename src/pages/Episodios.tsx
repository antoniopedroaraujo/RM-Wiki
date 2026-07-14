import { useEffect, useState } from "react";
import EpisodioCard from "../components/EpisodioCard";
import Loading from "../components/Loading";
import Paginacao from "../components/Paginacao";
import { Episode } from "../types/episode";
import { ApiResponse } from "../types/api";

type Season = "" | "1" | "2" | "3" | "4" | "5";

function Episodios() {
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [season, setSeason] = useState<Season>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    async function getEpisodes() {
      try {
        setLoading(true);
        setError("");

        let allEpisodes: Episode[] = [];
        let currentPage = 1;
        let hasNext = true;

        while (hasNext) {
          const response = await fetch(
            `https://rickandmortyapi.com/api/episode?page=${currentPage}`,
          );

          if (!response.ok) {
            setEpisodes([]);
            setTotalPages(1);
            setError("Não foi possível carregar os episódios.");
            return;
          }

          const data: ApiResponse<Episode> = await response.json();

          allEpisodes = [...allEpisodes, ...data.results];

          hasNext = data.info.next !== null;
          currentPage++;
        }

        let result: Episode[] = allEpisodes;

        // filtro por temporada
        if (season !== "") {
          result = result.filter((episode) =>
            episode.episode.startsWith(`S0${season}`),
          );
        }

        const itemsPerPage = 20;

        setTotalPages(Math.ceil(result.length / itemsPerPage));

        const start = (page - 1) * itemsPerPage;
        const end = start + itemsPerPage;

        setEpisodes(result.slice(start, end));
      } catch (error: unknown) {
        console.log(error);
        setError("Ocorreu um erro ao buscar os episódios. Tente novamente.");
      } finally {
        setLoading(false);
      }
    }

    getEpisodes();
  }, [page, season]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <h1 className="page-title">Episódios</h1>
      <p>Todos os episódios do universo Rick and Morty</p>
      {/* FILTRO */}

      <div className="mb-4">
        <div className="d-flex flex-wrap gap-2 justify-content-center">
          {["", "1", "2", "3", "4", "5"].map((item) => (
            <button
              key={item}
              type="button"
              className={`btn ${
                season === item ? "btn-primary" : "btn-outline-primary"
              }`}
              onClick={() => {
                setSeason(item as Season);
                setPage(1);
              }}
            >
              {item === "" ? "Todas" : `T${item}`}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="alert alert-danger mt-4">{error}</div>}

      {/* CARDS */}

      {episodes.length === 0 && !error ? (
        <div className="alert alert-info mt-4">
          Nenhum episódio foi encontrado.
        </div>
      ) : (
        <div className="row">
          {episodes.map((episode) => (
            <EpisodioCard key={episode.id} episode={episode} />
          ))}
        </div>
      )}
      <Paginacao page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}

export default Episodios;

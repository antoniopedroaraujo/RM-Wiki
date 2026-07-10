import { useEffect, useState } from "react";
import EpisodioCard from "../components/EpisodioCard";
import Loading from "../components/Loading";
import Paginacao from "../components/Paginacao";

function Episodios() {

  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [season, setSeason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(()=>{
    async function getEpisodes() {

    try {

      setLoading(true);
      setError("");

      let url =
      `https://rickandmortyapi.com/api/episode?page=${page}`;

      const response = await fetch(url);

      if (!response.ok) {
        setEpisodes([]);
        setTotalPages(1);
        setError("Não foi possível carregar os episódios.");

        return;
      }

      const data = await response.json();

      let result = data.results;

      // filtro por temporada
      if(season !== "") {

        result = result.filter((episode)=>

          episode.episode.startsWith(
            `S0${season}`
          )
        );
      }

      setEpisodes(result);
      setTotalPages(data.info.pages);

    } catch(error) {

      console.log(error);
       setError("Ocorreu um erro ao buscar os episódios. Tente novamente.");

    } finally {
      setLoading(false);
    }

  }

    getEpisodes();
  },[page, season]);

  if (loading) {
    return <Loading />;
  }

  return (

    <div className="container mt-4">
      <h1 className="page-title">
        Episódios
      </h1>
      <p>Todos os episódios do universo Rick and Morty</p>
      {/* FILTRO */}

      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">
            Temporada
          </label>
          <select
            className="form-select"
            value={season}
            onChange={(e)=>{

              setSeason(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              Todas
            </option>
            <option value="1">
              Temporada 1
            </option>
            <option value="2">
              Temporada 2
            </option>
            <option value="3">
              Temporada 3
            </option>
            <option value="4">
              Temporada 4
            </option>
            <option value="5">
              Temporada 5
            </option>
          </select>
        </div>
      </div>

    {error && (

      <div className="alert alert-danger mt-4">
        {error}
      </div>

    )}

      {/* CARDS */}

      {
      episodes.length === 0 && !error ? (

        <div className="alert alert-info mt-4">
          Nenhum episódio foi encontrado.
        </div>

        ) : (

      <div className="row">

        {episodes.map((episode)=>(

          <EpisodioCard

            key={episode.id}
            episode={episode}
          />
        ))}
      </div>
      )
    }
      <Paginacao
        page={page}
        totalPages={totalPages}
        setPage={setPage}
      />
    </div>
  );
}

export default Episodios;
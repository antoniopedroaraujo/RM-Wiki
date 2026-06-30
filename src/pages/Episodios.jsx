import { useEffect, useState } from "react";
import EpisodioCard from "../components/EpisodioCard";


function Episodios() {

  const [episodes, setEpisodes] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [season, setSeason] = useState("");

  async function getEpisodes() {

    try {

      let url =
      `https://rickandmortyapi.com/api/episode?page=${page}`;

      const response = await fetch(url);
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
    }


  }

  useEffect(()=>{

    getEpisodes();
  },[page, season]);

  return (

    <div className="container mt-4">
      <h1>
        Episódios
      </h1>
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
      {/* CARDS */}

      <div className="row">

        {episodes.map((episode)=>(

          <EpisodioCard

            key={episode.id}
            episode={episode}
          />
        ))}
      </div>
      {/* PAGINAÇÃO */}

      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <button

          className="btn btn-outline-primary"
          disabled={page === 1}
          onClick={()=>setPage(page-1)}
        >
          ← Anterior
        </button>
        <strong>
          Página {page} de {totalPages}
        </strong>
        <button

          className="btn btn-outline-primary"
          disabled={page === totalPages}
          onClick={()=>setPage(page+1)}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

export default Episodios;
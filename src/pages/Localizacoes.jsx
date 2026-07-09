import { useEffect, useState } from "react";
import LocalizacaoCard from "../components/LocalizacaoCard";

function Localizacoes() {

  const [locations, setLocations] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=>{
    async function getLocations() {
    
      setLoading(true);
      setError("");

    try {

      const response = await fetch(
        `https://rickandmortyapi.com/api/location?page=${page}`
      );

      if (!response.ok) {
        setLocations([]);
        setTotalPages(1);
        setError("Não foi possível carregar as localizações.");

        return;
      }

      const data = await response.json();

      let result = data.results;

      // filtro por tipo
      if(type !== "") {

        result = result.filter(

          (location) => location.type === type
        );
      }

      setLocations(result);
      setTotalPages(data.info.pages);

    } catch(error) {

      console.log("Erro ao buscar localizações:",error);
      setError("Ocorreu um erro ao buscar as localizações. Tente novamente.");

    } finally {
        setLoading(false);
    } 
  }
  
  getLocations();
    },[page,type]);
  
  if (loading) {
  return (
    <div className="text-center mt-5">
      <div className="spinner-border text-primary" />
      <p>Carregando...</p>
    </div>
    );
  }

  return (

    <div className="container mt-4">
      <h1 className="page-title">
        Localizações
      </h1>
      
      {/* FILTRO */}

      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">
            Tipo
          </label>
          <select

            className="form-select"
            value={type}
            onChange={(e)=>{

              setType(e.target.value);
              setPage(1);
            }}
          >
            <option value="">
              Todos
            </option>
            <option value="Planet">
              Planeta
            </option>
            <option value="Cluster">
              Cluster
            </option>
            <option value="Space station">
              Estação espacial
            </option>
            <option value="Microverse">
              Microverso
            </option>
            <option value="TV">
              TV
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
      locations.length === 0 && !error ? (

        <div className="alert alert-info mt-4">
          Nenhuma localização foi encontrada.
        </div>

      ) : (
      <div className="row">

        {locations.map((location)=>(

          <LocalizacaoCard

            key={location.id}
            location={location}
          />
        ))}
      </div>
      )
    }

      {/* PAGINAÇÃO */}

      <div className="d-flex justify-content-center align-items-center gap-3 my-4">
        <button

          className="btn btn-outline-primary btn-cartoon"
          disabled={page === 1}
          onClick={()=>setPage(page - 1)}
        >
          ← Anterior
        </button>
        <strong>
          Página {page} de {totalPages}
        </strong>
        <button

          className="btn btn-outline-primary btn-cartoon"
          disabled={page === totalPages}
          onClick={()=>setPage(page + 1)}
        >
          Próxima →
        </button>
      </div>
    </div>
  );
}

export default Localizacoes;
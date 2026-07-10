import { useEffect, useState, useRef } from "react";
import PersonagemCard from "../components/PersonagemCard";
import Loading from "../components/Loading";
import Paginacao from "../components/Paginacao";

function Personagens() {

  const [characters, setCharacters] = useState([]);
  const [status, setStatus] = useState("");

  const [search, setSearch] = useState("");
  const [searchName, setSearchName] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); 
  const searchInputRef = useRef(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {

    async function getCharacters() {

    setLoading(true);
    setError("");

    try {

    let url = `https://rickandmortyapi.com/api/character?page=${page}`;

    if(status !== "") {
      url += `&status=${status}`;
    }

    if (searchName !== "") {
      url += `&name=${searchName}`;
    }

      const response = await fetch(url);

      if (!response.ok) {

      setCharacters([]);
      setTotalPages(1);
      setError("Não foi possível carregar os personagens.");

      return;
    }

      const data = await response.json();

      setCharacters(data.results);
      setTotalPages(data.info.pages);

    } catch (error) {

      console.log("Erro ao buscar personagens:", error);
      setError("Ocorreu um erro ao buscar os personagens. Tente novamente.");

    } finally {

      setLoading(false);

    }

  }

    getCharacters();

  }, [page, status, searchName]);


  useEffect(() => {
    if(searchInputRef.current){

    searchInputRef.current.focus();

  }
    }, []);

  if (loading) {
    return <Loading />;
}

  return (
    <div className="container mt-4">

    <h1 className="page-title">
        Personagens
    </h1>
    <p>Explore todos os personagens do universo Rick and Morty</p>

    {/*BUSCA*/}

    <div className="row mb-4">

  <div className="col-md-6">

    <label className="form-label">
      Buscar personagem
    </label>

    <div className="input-group">


      <input
        ref={searchInputRef}
        type="text"
        className="form-control"
        placeholder="Buscar por nome..."
        value={search}

        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <button
        className="btn btn-primary"

        onClick={() => {

          setPage(1);
          setSearchName(search);

        }}
      >

        Pesquisar
      </button>

    </div>

  </div>

</div>

    {/*FILTROS*/}

    <div className="row mb-4">

  <div className="col-md-4">

    <label className="form-label">
      Status
    </label>


    <select
      className="form-select"
      value={status}
      onChange={(e) => {

        setStatus(e.target.value);
        setPage(1);

      }}
    >

      <option value="">
        Todos
      </option>

      <option value="alive">
        Vivo
      </option>

      <option value="dead">
        Morto
      </option>

      <option value="unknown">
        Desconhecido
      </option>

    </select>

  </div>

</div>

{error && (

  <div className="alert alert-danger mt-4">
    {error}
  </div>

  )}

{/*CARDS*/}

  {
  characters.length === 0 && !error ? (

    <div className="alert alert-info mt-4">
      Nenhum personagem foi encontrado.
    </div>

  ) : (

      <div className="row">

        {characters.map((character) => (

          <PersonagemCard
            key={character.id}
            character={character}
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

export default Personagens;
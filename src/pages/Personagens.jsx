import { useEffect, useState, useRef } from "react";
import PersonagemCard from "../components/PersonagemCard";

function Personagens() {

  const [characters, setCharacters] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [status, setStatus] = useState("");

  const [search, setSearch] = useState("");
  const [searchName, setSearchName] = useState("");

  const [loading, setLoading] = useState(true);
  const searchInputRef = useRef(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  async function getCharacters() {

    try {

    setLoading(true);

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

      return;

    }


      const data = await response.json();


      setCharacters(data.results);
      setTotalPages(data.info.pages);

    } catch (error) {

      console.log("Erro ao buscar personagens:", error);

    } finally {

      setLoading(false);

    }

  }


  useEffect(() => {

    getCharacters();

  }, [page, status, searchName]);


  useEffect(() => {
    if(searchInputRef.current){

    searchInputRef.current.focus();

  }
    }, []);



  /*useEffect(() => {

    axios
      .get("https://rickandmortyapi.com/api/character")
      .then((response) => {
        setCharacters(response.data.results);
      });

  }, []);*/


  function toggleFavorite(character) {
    const exists = favorites.some(
      (fav) => fav.id === character.id
    );


    if (exists) {

      setFavorites(
        favorites.filter(
          (fav) => fav.id !== character.id
        )
      );

    } else {

      setFavorites([
        ...favorites,
        character
      ]);

    }

  }

  function nextPage(){

    if(page < totalPages){

      setPage(page + 1);

    }

  }




  function previousPage(){

    if(page > 1){

      setPage(page - 1);

    }

  }


    /*const alreadyFavorite = favorites.some(
      (fav) => fav.id === character.id
    );


    if (alreadyFavorite) {

      setFavorites(
        favorites.filter(
          (fav) => fav.id !== character.id
        )
      );

    } else {

      setFavorites([
        ...favorites,
        character
      ]);

    }
  }*/

    /*return (

    <div className="container mt-4">

      <h1 className="mb-4">
        Personagens
      </h1>


      {loading && (
        <div className="text-center">
          <div className="spinner-border text-primary"></div>
        </div>
      )}



      <div className="row">

        {characters.map((character) => (

          <PersonagemCard

            key={character.id}

            character={character}

            favorites={[]}

            toggleFavorite={() => {}}

          />

        ))}

      </div>


    </div> 

  );*/
  return (
    <div className="container mt-4">

    <h1>
        Personagens
    </h1>

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
        placeholder="Digite o nome..."
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

      {/*CARDS*/}

      <div className="row">

        {characters.map((character) => (

          <PersonagemCard
            key={character.id}
            character={character}
            toggleFavorite={toggleFavorite}
          />

        ))}

      </div>

      {/* PAGINAÇÃO */}

<nav className="mt-4">

  <div className="d-flex justify-content-center align-items-center gap-3">

    <button
      className="btn btn-outline-primary"
      onClick={previousPage}
      disabled={page === 1}
    >
      ← Página anterior
    </button>


    <span className="fw-bold">
      Página {page} de {totalPages}
    </span>


    <button
      className="btn btn-outline-primary"
      onClick={nextPage}
      disabled={page === totalPages}
    >
      Próxima página →
    </button>

  </div>

</nav>
    </div>
  );
}

export default Personagens;
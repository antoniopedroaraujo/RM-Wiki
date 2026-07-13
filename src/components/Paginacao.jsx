function Paginacao({ page, totalPages, setPage }) {
  return (
    <nav className="mt-4">
      <div className="d-flex justify-content-center align-items-center gap-3">
        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 1}
        >
          ← Página anterior
        </button>

        <span>
          Página {page} de {totalPages}
        </span>

        <button
          className="btn btn-outline-primary"
          onClick={() => setPage((p) => p + 1)}
          disabled={page === totalPages}
        >
          Próxima página →
        </button>
      </div>
    </nav>
  );
}

export default Paginacao;

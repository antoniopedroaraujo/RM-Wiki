function LocalizacaoCard({ location }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow cartoon-card">
        <div className="card-body">
          <h5 className="card-title">{location.name}</h5>
          <p className="card-text">
            <strong>Tipo:</strong>
            <br />
            <span className="badge bg-primary">{location.type}</span>
          </p>
          <p className="card-text">
            <strong>Dimensão:</strong>
            <br />

            {location.dimension}
          </p>
        </div>
      </div>
    </div>
  );
}

export default LocalizacaoCard;

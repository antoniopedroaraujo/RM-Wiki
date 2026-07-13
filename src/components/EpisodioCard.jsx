function EpisodioCard({ episode }) {
  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card h-100 shadow cartoon-card">
        <div className="card-body">
          <h5 className="card-title">{episode.name}</h5>
          <p className="card-text">
            <strong>Código:</strong>
            <span className="badge bg-primary ms-2">{episode.episode}</span>
          </p>
          <p className="card-text">
            <strong>Data:</strong>
            <br />

            {episode.air_date}
          </p>
          <p className="card-text">
            <strong>Personagens:</strong>
            <br />

            {episode.characters.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EpisodioCard;

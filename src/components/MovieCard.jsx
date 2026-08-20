const statusColors = {
  İzlenecek: 'secondary',
  İzleniyor: 'warning',
  İzlendi: 'success',
}

function MovieCard({ movie, onEdit, onDelete }) {
  function handleDelete() {
    const confirmed = window.confirm(`"${movie.title}" silinsin mi?`)
    if (confirmed) {
      onDelete(movie.id)
    }
  }

  // Poster linki bozuksa (hotlink engeli, silinmiş görsel vb.)
  // kırık resim ikonu yerine düzgün bir placeholder göster
  function handleImageError(e) {
    e.target.onerror = null // sonsuz döngüyü önle
    e.target.src = `https://placehold.co/300x450/1f1f1f/e5e5e5?text=${encodeURIComponent(movie.title)}`
  }

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={movie.posterUrl}
        className="card-img-top"
        alt={movie.title}
        onError={handleImageError}
        style={{ height: '280px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <h3 className="h6 mb-1">{movie.title}</h3>
        <p className="text-muted small mb-2">{movie.genre}</p>

        <span className={`badge bg-${statusColors[movie.status]} align-self-start mb-2`}>
          {movie.status}
        </span>

        <p className="mb-2">{'⭐'.repeat(Number(movie.rating)) || 'Puan yok'}</p>

        {movie.note && <p className="small fst-italic">"{movie.note}"</p>}

        <div className="mt-auto d-flex gap-2 pt-2">
          <button
            className="btn btn-sm btn-outline-light flex-fill"
            onClick={() => onEdit(movie)}
          >
            Düzenle
          </button>
          <button
            className="btn btn-sm btn-outline-danger flex-fill"
            onClick={handleDelete}
          >
            Sil
          </button>
        </div>
      </div>
    </div>
  )
}

export default MovieCard

import MovieCard from './MovieCard'

function MovieList({ movies, onEdit, onDelete }) {
  if (movies.length === 0) {
    return (
      <p className="text-muted text-center py-5">
        Henüz film/dizi eklemedin. Yukarıdaki formdan ilk kaydını ekleyebilirsin. 🎬
      </p>
    )
  }

  return (
    <div className="row g-3">
      {movies.map((movie) => (
        <div className="col-md-4 col-lg-3" key={movie.id}>
          <MovieCard movie={movie} onEdit={onEdit} onDelete={onDelete} />
        </div>
      ))}
    </div>
  )
}

export default MovieList

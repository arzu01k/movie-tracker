import { useState, useEffect } from 'react'
import MovieForm from '../components/MovieForm'
import MovieList from '../components/MovieList'

const STORAGE_KEY = 'movie-tracker-movies'

function Home() {
  // movies: tüm film/dizi kayıtlarının tutulduğu dizi
  // "tembel" başlangıç değeri: bu fonksiyon SADECE ilk render'da bir kere çalışır,
  // böylece localStorage'daki veri useEffect'i beklemeden direkt state'e yüklenir
  const [movies, setMovies] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  })

  // editingMovie: düzenleme modundaysak hangi filmi düzenlediğimizi tutar
  // null ise "ekleme modu", bir film objesi ise "düzenleme modu"
  const [editingMovie, setEditingMovie] = useState(null)

  // showForm: form panelinin açık mı kapalı mı olduğunu tutar
  const [showForm, setShowForm] = useState(false)

  // movies her değiştiğinde localStorage'a yaz (kalıcı hale getir)
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(movies))
  }, [movies])

  // EKLE
  function handleAdd(movie) {
    const newMovie = { ...movie, id: Date.now() }
    setMovies((prev) => [...prev, newMovie])
    setShowForm(false)
  }

  // GÜNCELLE
  function handleUpdate(updatedMovie) {
    setMovies((prev) =>
      prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)),
    )
    setEditingMovie(null)
    setShowForm(false)
  }

  // SİL
  function handleDelete(id) {
    setMovies((prev) => prev.filter((m) => m.id !== id))
  }

  // Formu düzenleme moduyla aç
  function handleEditStart(movie) {
    setEditingMovie(movie)
    setShowForm(true)
  }

  // Form panelini kapat (hem ekleme hem düzenleme modunda "Vazgeç/Kapat" için)
  function handleCancel() {
    setEditingMovie(null)
    setShowForm(false)
  }

  // "+ Film Ekle" butonu: formu boş/ekleme modunda aç
  function handleOpenAddForm() {
    setEditingMovie(null)
    setShowForm(true)
  }

  return (
    <div className="container">
      {!showForm && (
        <button className="btn btn-danger mb-4" onClick={handleOpenAddForm}>
          + Film/Dizi Ekle
        </button>
      )}

      {showForm && (
        <MovieForm
          onAdd={handleAdd}
          onUpdate={handleUpdate}
          editingMovie={editingMovie}
          onCancel={handleCancel}
        />
      )}

      <MovieList
        movies={movies}
        onEdit={handleEditStart}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default Home

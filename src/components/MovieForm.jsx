import { useState, useEffect } from 'react'

const emptyForm = {
  title: '',
  genre: '',
  status: 'İzlenecek',
  rating: 0,
  posterUrl: '',
  note: '',
}

function MovieForm({ onAdd, onUpdate, editingMovie, onCancel }) {
  const [form, setForm] = useState(emptyForm)

  // editingMovie değiştiğinde (bir kart "Düzenle" ile tıklandığında)
  // formu o filmin verileriyle doldur
  useEffect(() => {
    if (editingMovie) {
      setForm(editingMovie)
    } else {
      setForm(emptyForm)
    }
  }, [editingMovie])

  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (editingMovie) {
      onUpdate(form)
    } else {
      onAdd(form)
      setForm(emptyForm)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-3 mb-4">
      <h2 className="h5 mb-3">
        {editingMovie ? 'Filmi Düzenle' : 'Yeni Film/Dizi Ekle'}
      </h2>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Başlık</label>
          <input
            type="text"
            name="title"
            className="form-control"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Tür</label>
          <input
            type="text"
            name="genre"
            className="form-control"
            value={form.genre}
            onChange={handleChange}
            placeholder="Bilim Kurgu, Aksiyon..."
            required
          />
        </div>

        <div className="col-md-4">
          <label className="form-label">Durum</label>
          <select
            name="status"
            className="form-select"
            value={form.status}
            onChange={handleChange}
          >
            <option value="İzlenecek">İzlenecek</option>
            <option value="İzleniyor">İzleniyor</option>
            <option value="İzlendi">İzlendi</option>
          </select>
        </div>

        <div className="col-md-2">
          <label className="form-label">Puan (0-5)</label>
          <input
            type="number"
            name="rating"
            className="form-control"
            min="0"
            max="5"
            value={form.rating}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Poster Görsel URL</label>
          <input
            type="url"
            name="posterUrl"
            className="form-control"
            value={form.posterUrl}
            onChange={handleChange}
            placeholder="https://.../poster.jpg"
            required
          />
          <div className="form-text">
            Sayfa linki değil, doğrudan görsel dosyası linki olmalı (.jpg/.png ile biter).
          </div>
        </div>

        <div className="col-12">
          <label className="form-label">Yorum / Not</label>
          <textarea
            name="note"
            className="form-control"
            value={form.note}
            onChange={handleChange}
            rows="2"
          />
        </div>
      </div>

      <div className="mt-3 d-flex gap-2">
        <button type="submit" className="btn btn-danger">
          {editingMovie ? 'Güncelle' : 'Ekle'}
        </button>
        <button type="button" className="btn btn-outline-light" onClick={onCancel}>
          {editingMovie ? 'Vazgeç' : 'Kapat'}
        </button>
      </div>
    </form>
  )
}

export default MovieForm

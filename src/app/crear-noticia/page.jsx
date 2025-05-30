"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CrearNoticia() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titular: '',
    descripcion: '',
    cuerpo: '',
    categoría: '',
    imagen: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/noticias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al crear noticia');
      }

      router.push('/noticias');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Crear Nueva Noticia</h1>
      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">Titular*</label>
          <input
            type="text"
            name="titular"
            value={formData.titular}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Descripción corta*</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-20 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Cuerpo completo*</label>
          <textarea
            name="cuerpo"
            value={formData.cuerpo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded h-40 focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Categoría*</label>
          <select
            name="categoría"
            value={formData.categoría}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Seleccione...</option>
            <option value="Regiones">Regiones</option>
            <option value="Deportes">Deportes</option>
            <option value="Economia">Economia</option>
            <option value="Sucesos">Sucesos</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">URL de Imagen (opcional)</label>
          <input
            type="url"
            name="imagen"
            value={formData.imagen}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
            placeholder="https:..... que ser un link web"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
        >
          Publicar Noticia
        </button>
      </form>
    </div>
  );
}

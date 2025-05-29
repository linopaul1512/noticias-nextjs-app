'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ComentarioFormModal from "@/app/components/ComentarioFormModal";
import axios from "axios";
import Noticia from "../models/noticia";
import NoticiaPrincipal from "../components/noticiaprincipal";

export default function NoticiaDetalle() {
  const { id } = useParams();
  const [noticia, setNoticia] = useState(null);
  const [autor, setAutor] = useState("");
  const [comentarios, setComentarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchNoticia = async () => {
      try {
        const res = await axios.get(`/api/noticias/${id}`);
        setNoticia(res.data);

        const usuarioRes = await axios.get(`/api/usuarios/${res.data.iduser}`);
        setAutor(usuarioRes.data.nombre);
      } catch (err) {
        console.error("Error al obtener la noticia:", err);
      }
    };

    const fetchComentarios = async () => {
      try {
        const res = await axios.get(`/api/comentarios?noticiaId=${id}`);
        setComentarios(res.data);
      } catch (err) {
        console.error("Error al obtener comentarios:", err);
      }
    };

    fetchNoticia();
    fetchComentarios();
  }, [id]);

  if (!noticia) return <div className="container py-4">Cargando noticia...</div>;

  return (
    <div className="container py-4">
      <h1>{noticia.titular}</h1>
      <p><strong>Autor:</strong> {autor}</p>
      <p><strong>Fecha:</strong> {new Date(noticia.fecha).toLocaleDateString()}</p>
      <img src={noticia.imagen} alt="Imagen de la noticia" className="img-fluid my-3" />
      <p><strong>{noticia.descripcion}</strong></p>
      <div>{noticia.cuerpo}</div>
      <p><strong>Categoría:</strong> {noticia.categoria}</p>

      <hr />
      <h2>Comentarios</h2>
      <button className="btn btn-primary mb-3" onClick={() => setMostrarModal(true)}>
        Agregar comentario
      </button>

      {comentarios.length > 0 ? (
        comentarios.map((comentario) => (
          <div key={comentario._id} className="mb-3 border p-2 rounded">
            <p><strong>{comentario.usuario}</strong>: {comentario.contenido}</p>
            <p className="text-muted">
              <em>{new Date(comentario.createdAt).toLocaleString()}</em>
            </p>
          </div>
        ))
      ) : (
        <p>No hay comentarios aún.</p>
      )}

      {mostrarModal && (
        <ComentarioFormModal
          noticiaId={id}
          onClose={() => setMostrarModal(false)}
          onComentarioCreado={(nuevo) => setComentarios(prev => [nuevo, ...prev])}
        />
      )}
    </div>
  );
}

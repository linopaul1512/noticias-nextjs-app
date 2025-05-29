"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Noticia from "../models/noticia";
import axios from "axios";

export default function NoticiaPrincipal() {
  const [noticia, setNoticia] = useState(null);

  useEffect(() => {
    const fetchNoticia = async () => {
      try {
        const res = await axios.get("/api/noticias"); 
        if (res.data && res.data.length > 0) {
          setNoticia(res.data[0]); 
        }
      } catch (error) {
        console.error("Error al cargar noticia principal:", error);
      }
    };

    fetchNoticia();
  }, []);

  if (!noticia) return <p>Cargando noticia principal...</p>;

  return (
    <div className="noticia-principal">
      <h2>{noticia.titular}</h2>
      <p><strong>{noticia.descipcion}</strong></p>
      <img src={noticia.imagen} alt="Imagen principal" style={{ maxWidth: "100%" }} />
      <p>{noticia.cuerpo.slice(0, 200)}...</p>
    </div>
  );
}

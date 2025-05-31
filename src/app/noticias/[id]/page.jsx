import DetalleNoticia from "@/app/components/DetalleNoticia";

async function getNoticia(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/noticias/${id}`);
    if (!res.ok) throw new Error('Noticia no encontrada');
    return await res.json();
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
}


export default async function Page({ params }) {
  const { id } = params;
  const noticia = await getNoticia(id);
  return <DetalleNoticia noticia={noticia} />;
}

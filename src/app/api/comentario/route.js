import { NextResponse } from 'next/server';
import  connectDB  from "@/app/libs/mongoDB";
import Comentario from '@/app/models/comentario';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    await connectDB();
    const comentarios = await Rol.find();
    return NextResponse.json(comentarios);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener los comentarios' }, { status: 500 });
  }
}

export async function POST(request) {
  await dbConnect();
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');
  if (!token) {
    return new Response('No autorizado', { status: 401 });
  }
  // Decodificar el token para obtener el ID de usuario
  const { userId } = jwt.verify(token.value, process.env.JWT_SECRET);

  const { idnoticia, texto } = await request.json();
  const nuevoComentario = await Comentario.create({
    iduser: userId,
    idnoticia,
    texto,
    fecha: new Date()
  });
  return new Response(JSON.stringify(nuevoComentario), { status: 201 });
}

import { NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoDB';
import Comentario from '@/app/models/comentario';
import jwt from 'jsonwebtoken';


export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const noticiaId = searchParams.get('noticiaId');

  try {
    const comentarios = await Comentario.find({ noticia: noticiaId })
      .populate('autor', 'nombre')
      .sort({ fecha: -1 });

    return NextResponse.json(comentarios);
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al obtener comentarios' },
      { status: 500 }
    );
  }
}


export async function POST(request) {
  await connectDB();
  
  try {
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { noticiaId, contenido } = await request.json();

    const nuevoComentario = new Comentario({
      contenido,
      noticia: noticiaId,
      autor: decoded.userId
    });

    await nuevoComentario.save();
    await nuevoComentario.populate('autor', 'nombre');

    return NextResponse.json(nuevoComentario, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || 'Error del servidor' },
      { status: 500 }
    );
  }
}
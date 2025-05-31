import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '@/app/libs/mongoDB';
import Noticia from '@/app/models/noticia';

export async function POST(request) {
  try {
    await connectDB();

    // Leer token desde cookies
    const token = request.cookies.get('sessionToken')?.value;

    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
    }

    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    
    if (decoded.role !== 'autor') {
      return NextResponse.json({ error: 'No autorizado para crear noticias' }, { status: 403 });
    }

    const body = await request.json();
    const nuevaNoticia = new Noticia({
      ...body,
      iduser: decoded.id,
      fecha: new Date()
    });

    const noticiaGuardada = await nuevaNoticia.save();

    return NextResponse.json({ message: 'Noticia creada', noticia: noticiaGuardada }, { status: 201 });
  } catch (error) {
    console.error('Error al crear noticia:', error);
    return NextResponse.json({ error: 'Error al crear la noticia' }, { status: 500 });
  }
}

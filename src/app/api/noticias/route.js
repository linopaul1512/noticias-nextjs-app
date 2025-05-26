import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Noticia from '@/models/noticia';
import { authOptions } from '../auth/login/route'; 
import { getServerSession } from 'next-auth';

export async function GET() {
  try {
    await connectDB();
    const noticias = await Noticia.find();
    return NextResponse.json(noticias);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener las noticias' }, { status: 500 });
  }
}


export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'No autenticado' }, { status: 401 });
  }

  if (session.user.Tipo !== 'autor') {
    return NextResponse.json({ error: 'No autorizado. Solo los autores pueden crear noticias.' }, { status: 403 });
  }

  try {
    await connectDB();
    const data = await request.json();

    const nuevaNoticia = new Noticia({
      ...data,
      autor: session.user.Correo, 
    });

    await nuevaNoticia.save();
    return NextResponse.json(nuevaNoticia, { status: 201 });
  } catch (error) {
    console.error('Error al crear la noticia:', error);
    return NextResponse.json({ error: 'Error al crear la noticia' }, { status: 500 });
  }
}
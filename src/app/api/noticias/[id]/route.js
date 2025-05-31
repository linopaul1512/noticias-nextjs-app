import { NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoDB';
import Noticia from '@/app/models/noticia';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = params; 

    const noticia = await Noticia.findById(id);
    if (!noticia) {
      return NextResponse.json(
        { error: 'Noticia no encontrada' },
        { status: 404 }
      );
    }


    return NextResponse.json(noticia, { status: 200 });
  } catch (error) {
    console.error('Error al obtener noticia:', error);
    return NextResponse.json(
      { error: 'Error interno' },
      { status: 500 }
    );
  }
}


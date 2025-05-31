import { NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoDB';
import Noticia from '@/app/models/noticia';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  await connectDB();
  
  try {
    
    
    // Verificación de token y rol
    const token = request.headers.get('authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ error: 'Token no proporcionado' }, { status: 401 });
    }
    
    //verificar si eres autor
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'autor') {
      return NextResponse.json({ error: 'Solo autores pueden crear noticias' }, { status: 403 });
    }

    //campos no pueden estar vacíos
    const { titular, descripcion, cuerpo, categoría, imagen } = await request.json();
    if (!titular || !descripcion || !cuerpo || !categoría) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    
    const nuevaNoticia = new Noticia({
      titular,
      descripcion,
      cuerpo,
      categoria,
      imagen: imagen || null,
      iduser
    });

    await nuevaNoticia.save();
    return NextResponse.json({ 
      message: 'Noticia creada exitosamente',
      noticia: {
        id: nuevaNoticia._id,
        titular: nuevaNoticia.titular
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Error:', error);
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 });
    }
    return NextResponse.json(
      { error: error.message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const noticias = await Noticia.find();
    return NextResponse.json(noticias, { status: 200 }); 

  } catch (error) {
    console.error("Error al obtener las noticias:", error);
    return NextResponse.json({ error: 'Error al obtener las noticias' }, { status: 500 });
  }
}



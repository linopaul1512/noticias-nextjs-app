import { NextResponse } from 'next/server';
import connectDB from '@/app/libs/mongoDB';
import Usuario from '@/app/models/usuario';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const { correo, contrasena } = await request.json();

    if (!correo || !contrasena) {
      return NextResponse.json({ error: 'Correo y contraseña no puedn estar vacíos' }, { status: 400 });
    }

    const usuario = await Usuario.findOne({ correo });

    if (!usuario) {
      return NextResponse.json({ error: 'Usuario no encontra, verifique los datos introducidos' }, { status: 401 });
    }

    const passwordValida = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordValida) {
      return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
    }

    const token = jwt.sign({ userId: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const response = NextResponse.json({ message: 'Inicio de sesión exitoso' }, { status: 200 });
    response.cookies.set('sessionToken', token, { httpOnly: true, path: '/' });

    return response;

  } catch (error) {
    console.error('Error en login:', error);
    return NextResponse.json({ error: 'Error al iniciar sesión' }, { status: 500 });
  }
}


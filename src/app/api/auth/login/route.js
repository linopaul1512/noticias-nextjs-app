export default function handler(req, res) {
  if (req.method === 'POST') {
    const { correo, contrasena } = req.body;

   
    if (correo === 'usuario@example.com' && contrasena === 'contraseña123') {
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
    } else {
      res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
  } else {
    res.status(405).json({ mensaje: 'Método no permitido' });
  }
}

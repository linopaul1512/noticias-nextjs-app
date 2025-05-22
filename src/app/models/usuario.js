import mongoose, { Schema } from "mongoose";

const usuarioSchema = new Schema(
  {
    Nombre: String,
    Apellido: String,
    NombreUsuario: String,
    Tipo: String,
    Contrasena: String,
    Correo: String,
    Telefono: String,
  },
  { timestamps: true }
);

const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

export default Usuario;

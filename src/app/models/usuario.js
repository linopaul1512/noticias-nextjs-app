import mongoose, { Schema } from "mongoose";

const usuarioSchema = new  mongoose.Schema(
  {
    Nombre: {
    type: String,
    required: true,
    },
    Apellido: {
    type: String,
    required: true,
    },
    NombreUsuario: {
    type: String,
    required: true,
    },
    Tipo: {
    type: String,
    required: true,
    },
    Contrasena: {
    type: String,
    required: true,
    },
    Correo: {
    type: String,
    required: true,
    },
    Telefono: {
    type: String,
    required: true,
    }
  },
  { timestamps: true }
);

const Usuario =
  mongoose.models.Usuario || mongoose.model("Usuario", usuarioSchema);

export default Usuario;

import mongoose, { Schema } from "mongoose";
//
const rolSchema = new mongoose.Schema(
  {
    Nombre: {
    type: String,
    required: true,
    },
    Descripcion: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

const Rol =
  mongoose.models.Rol || mongoose.model("Rol", rolSchema);

export default Rol;

import mongoose, { Schema } from "mongoose";

const rolSchema = new mongoose.Schema(
  {
    nombre: {
    type: String,
    required: true,
    },
    descripcion: {
    type: String,
    required: true,
    },
  },
  { timestamps: true }
);

const Rol =
  mongoose.models.Rol || mongoose.model("Rol", rolSchema);

export default Rol;

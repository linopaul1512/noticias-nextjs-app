import mongoose, { Schema } from "mongoose";

const rolSchema = new Schema(
  {
    Nombre: String,
    Descripcion: String,
  },
  { timestamps: true }
);

const Rol =
  mongoose.models.Rol || mongoose.model("Rol", rolSchema);

export default Rol;

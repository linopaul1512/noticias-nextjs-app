import mongoose, { Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    Nombre: String,
  },
  { timestamps: true }
);

const Categoria =
  mongoose.models.Categoria || mongoose.model("Categoria", categoriaSchema);

export default Categoria;
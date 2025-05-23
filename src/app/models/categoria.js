import mongoose, { Schema } from "mongoose";

const categoriaSchema = new Schema(
  {
    Nombre: String,
  },
  { timestamps: true }
);

const Categeria =
  mongoose.models.Categeria || mongoose.model("Categeria", categoriaSchema);

export default Categeria;
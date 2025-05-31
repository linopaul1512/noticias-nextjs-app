import mongoose, { Schema } from "mongoose";

const comentarioSchema = new mongoose.Schema(
  {
    
    iduser: {
    type: mongoose.Schema.Types.ObjectId,   
    required: true,
    ref: 'Usuario',
    },
    noticia: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Noticia',
    required: true,
    },
    contenido: {
    type: String,
    required: true,
    },
    fecha: { 
      type: Date, 
      default: Date.now 
    },
    nombreUsuario: { type: String, 
    required: true },

  },
  { timestamps: true }
);

const Comentario = mongoose.models.Comentario || mongoose.model('Comentario', comentarioSchema);

export default Comentario;
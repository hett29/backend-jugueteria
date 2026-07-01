import { Schema, model } from "mongoose";

const CategoriaSchema = new Schema(
  {
    nombre_categoria: {
      type: String,
      required: true,
      unique: true,
    },

    descripcion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Categoria", CategoriaSchema);
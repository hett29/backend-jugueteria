import { Schema, model } from "mongoose";

const ProductoSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    descripcion: {
      type: String,
      required: true,
    },

    precio: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    edad_recomendada: {
      type: Number,
      required: true,
    },

    marca: {
      type: String,
      required: true,
    },

    imagen: {
      type: String,
      required: true,
    },

    categoria: {
      type: Schema.Types.ObjectId,
      ref: "Categoria",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Producto", ProductoSchema);
import { Schema, model } from "mongoose";

const ClienteSchema = new Schema(
  {
    nombre: {
      type: String,
      required: true,
    },

    apellido: {
      type: String,
      required: true,
    },

    correo: {
      type: String,
      required: true,
      unique: true,
    },

    telefono: {
      type: String,
      required: true,
    },

    direccion: {
      type: String,
      required: true,
    },

    contrasena: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: true }
);

export default model("Cliente", ClienteSchema);
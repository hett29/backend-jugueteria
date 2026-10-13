import { Schema, model } from "mongoose";

const ClienteSchema = new Schema(
  {
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    carnet: { type: String, trim: true, sparse: true, unique: true },
    telefono: { type: String, required: true },
    direccion: { type: String, required: true },
    departamento: { type: String, trim: true, default: "" },
    ciudad: { type: String, trim: true, default: "" },
    rol: { type: String, enum: ["ADMIN", "USUARIO"], default: "USUARIO", index: true },
    contrasena: { type: String, required: true, select: false },
  },
  { timestamps: true }
);

export default model("Cliente", ClienteSchema);

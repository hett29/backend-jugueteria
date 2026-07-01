import { Schema, model } from "mongoose";

export const ESTADOS_ENVIO = [
  "PREPARANDO",
  "ENVIADO",
  "ENTREGADO",
] as const;

const EnvioSchema = new Schema(
  {
    direccion_envio: {
      type: String,
      required: true,
    },

    ciudad: {
      type: String,
      required: true,
    },

    fecha_envio: {
      type: Date,
    },

    estado_envio: {
      type: String,
      enum: ESTADOS_ENVIO,
      default: "PREPARANDO",
      required: true,
    },

    pedido: {
      type: Schema.Types.ObjectId,
      ref: "Pedido",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Envio", EnvioSchema);
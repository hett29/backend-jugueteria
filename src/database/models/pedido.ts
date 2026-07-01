import { Schema, model } from "mongoose";

export const ESTADOS_PEDIDO = [
  "PENDIENTE",
  "PAGADO",
  "ENVIADO",
  "ENTREGADO",
  "CANCELADO",
] as const;

const PedidoSchema = new Schema(
  {
    fecha: {
      type: Date,
      default: Date.now,
    },

    estado: {
      type: String,
      enum: ESTADOS_PEDIDO,
      default: "PENDIENTE",
      required: true,
    },

    total: {
      type: Number,
      required: true,
    },

    cliente: {
      type: Schema.Types.ObjectId,
      ref: "Cliente",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("Pedido", PedidoSchema);